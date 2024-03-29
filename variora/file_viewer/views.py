import html2text
from django.conf import settings
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from django.http import (HttpResponse, HttpResponseForbidden,
                         HttpResponseNotFound, JsonResponse)
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic import View
from notifications.signals import notify

from .api.encoders import AnnotationEncoder, AnnotationReplyEncoder
from .models import Annotation, AnnotationReply, Comment, Document
from .utils import sanitize
from variora import utils
from variora.utils import *

h = html2text.HTML2Text()
h.ignore_images = True
h.ignore_emphasis = True
h.ignore_links = True


def _handle_post_annotation_request(user, document, request):
    if not user.is_authenticated:
        return HttpResponseForbidden()

    annotation = Annotation()
    annotation.annotator = user
    annotation.content = sanitize(request.POST['annotation_content'])
    annotation.document_this_annotation_belongs = document
    annotation.page_index = request.POST["page_id"].split("_")[2]
    annotation.height_percent = request.POST["height_percent"]
    annotation.width_percent = request.POST["width_percent"]
    annotation.top_percent = request.POST["top_percent"]
    annotation.left_percent = request.POST["left_percent"]
    annotation.frame_color = request.POST["frame_color"]
    annotation.is_public = True if request.POST["is_public"] == 'true' else False
    annotation.save()

    # send notification to the document uploader
    if annotation.annotator.pk != document.owner.pk:
        notify.send(
            sender=annotation.annotator, recipient=document.owner,
            action_object=annotation, verb='post annotation',
            redirect_url=annotation.url,
            image_url=annotation.annotator.portrait_url,
            description=h.handle(annotation.content),
            is_public=annotation.is_public,
        )
    # send notification to the collectors, i.e., followers
    for user in document.collectors.all():
        if annotation.annotator.pk != user.pk and document.owner.pk != user.pk:
            notify.send(
                sender=annotation.annotator, recipient=user,
                action_object=annotation, verb='post annotation',
                redirect_url=annotation.url,
                image_url=annotation.annotator.portrait_url,
                description=h.handle(annotation.content),
                is_public=annotation.is_public,
            )

    context = {
        "document": document,
        'annotation': annotation,
        'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
        "new_annotation_id": annotation.id,
    }
    return JsonResponse({
        'new_annotationdiv_html': render(request, "file_viewer/one_annotation_div.html", context).content,
        'new_annotation_id': annotation.id,
        'new_annotation_uuid': str(annotation.clean_uuid),
        'new_annotation_json': annotation,
    }, encoder=AnnotationEncoder)


def _handle_post_annotation_reply_request(user, document, request):
    if request.POST["annotation_reply_content"] == "":
        return HttpResponse(status=200)
    if not user.is_authenticated:
        return HttpResponseForbidden()

    annotation_reply = AnnotationReply()
    annotation = Annotation.objects.get(id=int(request.POST["reply_to_annotation_id"]))
    annotation_reply.content = sanitize(request.POST["annotation_reply_content"])
    annotation_reply.replier = user
    annotation_reply.reply_to_annotation = annotation
    annotation_reply.is_public = True if request.POST["is_public"] == 'true' else False

    annotation_poster = annotation_reply.reply_to_annotation.annotator

    if "reply_to_annotation_reply_id" in request.POST:
        annotation_reply.reply_to_annotation_reply = AnnotationReply.objects.get(id=int(request.POST["reply_to_annotation_reply_id"]))
        # avoid 2 duplicate notifications in the case
        # where the annotation I reply to and the reply I reply to are both from the same guy
        replier_who_i_reply_to = annotation_reply.reply_to_annotation_reply.replier
        if replier_who_i_reply_to.pk != annotation_poster.pk and user.pk != replier_who_i_reply_to.pk:
            notify.send(
                sender=annotation_reply.replier, recipient=annotation_reply.reply_to_annotation_reply.replier,
                action_object=annotation_reply, verb='reply to annotation reply',
                redirect_url=annotation.url,
                image_url=annotation_reply.replier.portrait_url,
                description=h.handle(annotation_reply.content),
                is_public=annotation_reply.is_public,
            )

    annotation_reply.save()
    if user.pk != annotation_poster.pk:
        notify.send(
            sender=annotation_reply.replier, recipient=annotation_reply.reply_to_annotation.annotator,
            action_object=annotation_reply, verb='reply to annotation',
            redirect_url=annotation.url,
            image_url=annotation_reply.replier.portrait_url,
            description=h.handle(annotation_reply.content),
            is_public=annotation_reply.is_public,
        )
    context = {
        "annotation_reply": annotation_reply,
        'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
    }
    return JsonResponse({
        'new_annotationreply_html': render(request, "file_viewer/one_annotation_reply.html", context).content,
        'new_annotationreply_json': annotation_reply,
    }, encoder=AnnotationReplyEncoder)


class FileViewerView(View):
    @method_decorator(login_required(login_url='/'))
    def post(self, request, **kwargs):
        try:
            user = request.user
            if 'slug' in kwargs:
                document = Document.objects.get(uuid=utils.slug2uuid(kwargs['slug']))
            else:
                document = Document.objects.get(id=int(request.GET["document_id"]))


            ########################

            # Temporary access control
            # TODO: use group feature when it is implemented

            # if document.owner.email_address.endswith('@ijc.sg') and (isinstance(user, AnonymousUser) or not user.email_address.endswith('@ijc.sg')):
            #     return HttpResponseForbidden()

            #######################


            if request.POST["operation"] == "delete_annotation":
                annotation = Annotation.objects.get(id=int(request.POST["annotation_id"]))
                if user.pk != annotation.annotator.pk:
                    return HttpResponseForbidden()

                annotation.delete()
                return HttpResponse()

            elif request.POST["operation"] == "delete_annotation_reply":
                reply_annotation = AnnotationReply.objects.get(id=int(request.POST["reply_id"]))
                if user.pk != reply_annotation.replier.pk:
                    return HttpResponseForbidden()

                reply_annotation.delete()
                return HttpResponse()

            elif request.POST["operation"] == "delete_comment":
                comment = Comment.objects.get(id=int(request.POST["comment_id"]))
                comment.delete()
                return HttpResponse()

            elif request.POST["operation"] == "like_annotation":
                annotation = Annotation.objects.get(id=int(request.POST["annotation_id"]))
                annotation.num_like += 1
                annotation.save()
                return HttpResponse()

            elif request.POST["operation"] == "like_annotation_reply":
                annotation_reply = AnnotationReply.objects.get(id=int(request.POST["annotation_reply_id"]))
                annotation_reply.num_like += 1
                annotation_reply.save()
                return HttpResponse()

            elif request.POST["operation"] == "like_comment":
                if not user.is_authenticated:
                    return HttpResponseForbidden()
                comment = Comment.objects.get(id=int(request.POST["comment_id"]))
                comment.num_like += 1
                comment.save()
                return HttpResponse()

            elif request.POST["operation"] == "collect":
                if not user.is_authenticated:
                    return HttpResponseForbidden()
                document.collectors.add(user)
                document.save()
                return HttpResponse()

            elif request.POST["operation"] == "uncollect":
                if not user.is_authenticated:
                    return HttpResponseForbidden()
                document.collectors.remove(user)
                document.save()
                return HttpResponse()

            elif request.POST["operation"] == "refresh":
                context = {
                    "document": document,
                    "comments": document.comment_set.order_by("-post_time"),
                    'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
                }
                return render(request, "file_viewer/comment_viewer_subpage.html", context)

            elif request.POST["operation"] == "comment":
                if not user.is_authenticated:
                    return HttpResponseForbidden()

                if request.POST["comment_content"] != "":
                    comment = Comment()
                    comment.content = request.POST["comment_content"]
                    comment.commenter = user
                    comment.document_this_comment_belongs = document
                    comment.is_public = True if request.POST["is_public"] == 'true' else False
                    if "reply_to_comment_id" in request.POST:
                        comment.reply_to_comment = Comment.objects.get(id=int(request.POST["reply_to_comment_id"]))
                    comment.save()
                context = {
                    "document": document,
                    "comments": document.comment_set.order_by("-post_time"),
                    'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
                }
                return render(request, "file_viewer/comment_viewer_subpage.html", context)

            elif request.POST["operation"] == "annotate":
                return _handle_post_annotation_request(user, document, request)

            elif request.POST["operation"] == "reply_annotation":
                return _handle_post_annotation_reply_request(user, document, request)

        except ObjectDoesNotExist:
            return HttpResponseNotFound()

    def get(self, request, **kwargs):
        if should_return_pwa(request) and settings.ENABLE_PWA:
            return render(request, 'home/pwa.html')

        try:
            if 'slug' in kwargs:
                document = Document.objects.prefetch_related('collectors').get(uuid=utils.slug2uuid(kwargs['slug']))
                if 'title' not in kwargs or document.title.replace(' ', '-') != kwargs['title']:
                    redirect_url = '/documents/' + document.slug + '/' + document.title.replace(' ', '-')
                    redirect_url += '?' + request.META['QUERY_STRING']
                    return redirect(redirect_url)
            else:
                document = Document.objects.prefetch_related('collectors').get(id=int(request.GET["document_id"]))
        except ObjectDoesNotExist:
            return HttpResponseNotFound()

        user = request.user


        ########################

        # Temporary access control
        # TODO: use group feature when it is implemented

        # if not user.is_superuser:
        #     if document.owner.email_address.endswith('@ijc.sg') and (isinstance(user, AnonymousUser) or not user.email_address.endswith('@ijc.sg')):
        #         return render(request, "file_viewer/temp_no_access_page.html")

        #######################


        collected = False
        if user.is_authenticated() and user in document.collectors.all():
            collected = True

        document.num_visit += 1
        document.save()

        context = {
            "DEBUG": settings.DEBUG,
            "document": document,
            "file_url": document.url,
            "comments": document.comment_set.order_by("-post_time"),
            "annotations": document.annotation_set
                .select_related('annotator')
                .prefetch_related('annotationreply_set__replier')
                .prefetch_related('annotationreply_set__reply_to_annotation_reply')
                .prefetch_related('annotationreply_set__reply_to_annotation_reply__replier')
                .order_by("page_index", "top_percent"),
            'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
            "collected": collected,
            "prev_page_url": request.META['HTTP_REFERER'] if 'HTTP_REFERER' in request.META else '/'
        }
        return render(request, "file_viewer/pdf_file_viewer_page.html", context)
