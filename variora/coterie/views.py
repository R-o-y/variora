from hashlib import md5

import html2text
from django.conf import settings
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from notifications.signals import notify

from .api.encoders import (CoterieAnnotationEncoder,
                          CoterieAnnotationReplyEncoder)
from variora import utils
from variora.utils import should_return_pwa
from .views_coterie import *

from .models import Coterie, CoterieDocument

h = html2text.HTML2Text()
h.ignore_images = True
h.ignore_emphasis = True
h.ignore_links = True

# import logging, logging.config
# import sys
#
# LOGGING = {
#     'version': 1,
#     'handlers': {
#         'console': {
#             'class': 'logging.StreamHandler',
#             'stream': sys.stdout,
#         }
#     },
#     'root': {
#         'handlers': ['console'],
#         'level': 'INFO'
#     }
# }
#
# logging.config.dictConfig(LOGGING)


def _handle_post_annotation_request(user, document, request):
    # logging.info('Called')

    annotation = models.CoterieAnnotation()
    annotation.content = request.POST["annotation_content"]
    annotation.annotator = user
    annotation.document_this_annotation_belongs = document
    annotation.page_index = request.POST["page_id"].split("_")[2]
    annotation.height_percent = request.POST["height_percent"]
    annotation.width_percent = request.POST["width_percent"]
    annotation.top_percent = request.POST["top_percent"]
    annotation.left_percent = request.POST["left_percent"]
    annotation.frame_color = request.POST["frame_color"]
    annotation.is_public = True if request.POST["is_public"] == 'true' else False
    annotation.save()

    # logging.info(annotation.content)
    # logging.info(request)

    # send notification
    # for user in document.owner.administrators.all():
    #     if annotation.annotator.pk != user.pk:
    #         notify.send(
    #             sender=annotation.annotator, recipient=user,
    #             action_object=annotation, verb='post annotation',
    #             redirect_url=annotation.url,
    #             image_url=annotation.annotator.portrait_url,
    #             description=h.handle(annotation.content),
    #             is_public=annotation.is_public,
    #         )
    #
    # for user in document.owner.members.all():
    #     if annotation.annotator.pk != user.pk:
    #         notify.send(
    #             sender=annotation.annotator, recipient=user,
    #             action_object=annotation, verb='post annotation',
    #             redirect_url=annotation.url,
    #             image_url=annotation.annotator.portrait_url,
    #             description=h.handle(annotation.content),
    #             is_public=annotation.is_public,
    #         )
    if annotation.annotator.pk != document.uploader.pk:
        notify.send(
            sender=annotation.annotator, recipient=document.uploader,
            action_object=annotation, verb='post annotation',
            redirect_url=annotation.url,
            image_url=annotation.annotator.portrait_url,
            description=h.handle(annotation.content),
            is_public=annotation.is_public,
        )
    # logging.info('done send notif')

    context = {
        "document": document,
        "annotation": annotation,
        'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
        "new_annotation_id": annotation.id,
    }

    # logging.info('done context')
    return JsonResponse({
        'new_annotationdiv_html': render(request, "file_viewer/one_annotation_div.html", context).content,
        'new_annotation_id': annotation.id,
        'new_annotation_uuid': str(annotation.clean_uuid),
        'new_annotation_json': annotation,
    }, encoder=CoterieAnnotationEncoder)


def _handle_post_annotation_reply_request(user, coterie, request):
    if request.POST["annotation_reply_content"] == "":
        return HttpResponse(status=200)

    annotation_reply = models.CoterieAnnotationReply()
    annotation = models.CoterieAnnotation.objects.get(id=int(request.POST["reply_to_annotation_id"]))
    annotation_reply.content = request.POST["annotation_reply_content"]
    annotation_reply.replier = user
    annotation_reply.reply_to_annotation = annotation
    annotation_reply.is_public = True if request.POST["is_public"] == 'true' else False

    annotation_poster = annotation_reply.reply_to_annotation.annotator

    if "reply_to_annotation_reply_id" in request.POST:
        annotation_reply.reply_to_annotation_reply = models.CoterieAnnotationReply.objects.get(
            id=int(request.POST["reply_to_annotation_reply_id"])
        )

        replier_who_i_reply_to = annotation_reply.reply_to_annotation_reply.replier
        if replier_who_i_reply_to.pk != annotation_poster.pk and user.pk != replier_who_i_reply_to.pk:
            notify.send(
                sender=annotation_reply.replier,
                recipient=annotation_reply.reply_to_annotation_reply.replier,
                action_object=annotation_reply,
                verb='reply to annotation reply',
                redirect_url=annotation.url,
                image_url=annotation_reply.replier.portrait_url,
                description=h.handle(annotation_reply.content),
                coterie_uuid=coterie.uuid,
                is_public=annotation_reply.is_public,
            )
    annotation_reply.save()

    if user.pk != annotation_poster.pk:
        notify.send(
            sender=annotation_reply.replier,
            recipient=annotation_reply.reply_to_annotation.annotator,
            action_object=annotation_reply,
            verb='reply to annotation',
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
    }, encoder=CoterieAnnotationReplyEncoder)


def display_coteriefile_viewer_page(request, **kwargs):
    if request.method == "POST":
        user = request.user
        try:
            if 'document_slug' in kwargs:
                coterie = Coterie.objects.get(id=kwargs['coterie_id'])
                document = models.CoterieDocument.objects.get(uuid=utils.slug2uuid(kwargs['document_slug']))
            else:
                coterie = Coterie.objects.get(id=request.POST["coterie_id"])
                document = models.CoterieDocument.objects.get(id=int(request.GET["document_id"]))
        except ObjectDoesNotExist:
            return HttpResponse(status=404)

        # only admins and members can interact with the documents in a group
        if not user.is_superuser and user not in coterie.administrators.all() and user not in coterie.members.all():
            return redirect("/")

        if request.POST["operation"] == "delete_annotation":
            annotation = models.CoterieAnnotation.objects.get(id=int(request.POST["annotation_id"]))
            annotation.delete()
            return HttpResponse()

        elif request.POST["operation"] == "delete_annotation_reply":
            reply_annotation = models.CoterieAnnotationReply.objects.get(id=int(request.POST["reply_id"]))
            reply_annotation.delete()
            return HttpResponse()

        elif request.POST["operation"] == "delete_comment":
            comment = models.CoterieComment.objects.get(id=int(request.POST["comment_id"]))
            comment.delete()
            return HttpResponse()

        elif request.POST["operation"] == "like_comment":
            comment = models.CoterieComment.objects.get(id=int(request.POST["comment_id"]))
            comment.num_like += 1
            comment.save()
            return HttpResponse()

        elif request.POST["operation"] == "like_annotation":
            annotation = models.CoterieAnnotation.objects.get(id=int(request.POST["annotation_id"]))
            annotation.num_like += 1
            annotation.save()
            return HttpResponse()

        elif request.POST["operation"] == "like_annotation_reply":
            annotation_reply = models.CoterieAnnotationReply.objects.get(id=int(request.POST["annotation_reply_id"]))
            annotation_reply.num_like += 1
            annotation_reply.save()
            return HttpResponse()

        elif request.POST["operation"] == "refresh":
            context = {
                "document": document,
                "comments": document.coteriecomment_set.order_by("-post_time"),
            }
            return render(request, "coterie_file_viewer/comment_viewer_subpage.html", context)

        elif request.POST["operation"] == "comment":
            if request.POST["comment_content"] != "":
                comment = models.CoterieComment()
                comment.content = request.POST["comment_content"]
                comment.commenter = user
                comment.document_this_comment_belongs = document
                comment.is_public = comment.is_public = True if request.POST["is_public"] == 'true' else False
                if "reply_to_comment_id" in request.POST:
                    comment.reply_to_comment = models.CoterieComment.objects.get(id=int(request.POST["reply_to_comment_id"]))
                comment.save()
            context = {
                "document": document,
                "comments": document.coteriecomment_set.order_by("-post_time"),
                'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
            }
            return render(request, "file_viewer/comment_viewer_subpage.html", context)

        elif request.POST["operation"] == "annotate":
            return _handle_post_annotation_request(user, document, request)

        elif request.POST["operation"] == "reply_annotation":
            return _handle_post_annotation_reply_request(user, coterie, request)

    else:
        if should_return_pwa(request) and settings.ENABLE_PWA:
            return render(request, 'home/pwa.html')

        user = request.user

        try:
            if 'document_slug' in kwargs:
                coterie = Coterie.objects.get(id=kwargs['coterie_id'])
                document = models.CoterieDocument.objects.get(uuid=utils.slug2uuid(kwargs['document_slug']))
                if 'title' not in kwargs or document.title.replace(' ', '-') != kwargs['title']:
                    return redirect('/coteries/' + str(coterie.id) + '/documents/' + utils.uuid2slug(document.uuid) + '/' + document.title.replace(' ', '-'))
            else:
                coterie = Coterie.objects.get(id=request.GET["coterie_id"])
                document = models.CoterieDocument.objects.get(id=int(request.GET["document_id"]))
        except ObjectDoesNotExist:
            return HttpResponse(status=404)

        # only admins and members can view the documents in a group
        if user not in coterie.administrators.all() and user not in coterie.members.all():
            return redirect("/")

        document.num_visit += 1
        document.save()

        context = {
            "DEBUG": settings.DEBUG,
            "document": document,
            "file_url": document.url,
            "coterie_id": coterie.id,
            "coterie_uuid": coterie.clean_uuid,
            "comments": document.coteriecomment_set.order_by("-post_time"),
            "annotations": document.coterieannotation_set
                .select_related('annotator')
                .prefetch_related('annotationreply_set__replier')
                .prefetch_related('annotationreply_set__reply_to_annotation_reply')
                .prefetch_related('annotationreply_set__reply_to_annotation_reply__replier')
                .order_by("page_index", "top_percent"),
            'ANONYMOUS_USER_PORTRAIT_URL': settings.ANONYMOUS_USER_PORTRAIT_URL,
            "prev_page_url": request.META['HTTP_REFERER'] if 'HTTP_REFERER' in request.META else '/'
        }
        return render(request, "coterie_file_viewer/pdf_file_viewer_page.html", context)
