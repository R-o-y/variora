import urllib

from django.contrib.auth import get_user
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import prefetch_related_objects
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.utils.timezone import now
from django.views.generic import View

from home.models import User

from ..models import (Coterie, CoterieAnnotation, CoterieAnnotationReply,
                      CoterieDocument, CoterieInvitation)
from .encoders import (CoterieDocumentEncoder, CoterieEncoder,
                       CoterieInvitationEncoder)
from .view_application import (ApplicationsView, ApplicationView,
                               create_application)
from .view_invitation import InvitationsView, InvitationView, create_invitation
from .view_member import *


class CoterieListView(View):
    def get(self, request):
        user = request.user
        if not user.is_authenticated:
            administrated_coteries = []
            joined_coteries = []
        else:
            administrated_coteries = list(user.administrated_coterie_set.all())
            joined_coteries = list(user.joined_coterie_set.all())
            combined = administrated_coteries + joined_coteries
            prefetch_related_objects(combined, 'administrators')
            prefetch_related_objects(combined, 'members')
            prefetch_related_objects(combined, 'coteriedocument_set__unique_file')
        return JsonResponse({
                'administratedCoteries': administrated_coteries,
                'joinedCoteries': joined_coteries,
            },
            encoder=CoterieEncoder,
            safe=False
        )


def _delete_coterie(coterie, user):
    if user in coterie.administrators.all():
        coterie.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)  # user has no permission

def _exit_coterie(coterie, user):
    if user in coterie.administrators.all():
        return HttpResponse(status=403)
    if user in coterie.members.all():
        coterie.members.remove(user)
    return HttpResponse(status=200)

def _remove_member(request, coterie, user):
    if 'member_email_address' not in request.POST:
        return HttpResponse(status=403)
    try:
        member = User.objects.get(email_address=request.POST['member_email_address'])
    except ObjectDoesNotExist:
        return HttpResponse(status=403)
    if user in coterie.administrators.all() and member in coterie.members.all():
        coterie.members.remove(member)
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)

class CoterieView(View):
    def get(self, request, pk, **kwargs):
        try:
            coterie = Coterie.objects \
                .prefetch_related('administrators').prefetch_related('members') \
                .prefetch_related('coteriedocument_set__unique_file').get(pk=pk)
            return JsonResponse(coterie, encoder=CoterieEncoder, safe=False)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)

    def post(self, request, pk, operation):
        try:
            coterie = Coterie.objects.get(pk=pk)
            user = request.user
            if operation == 'delete':
                return _delete_coterie(coterie, user)
            elif operation == 'exit':
                return _exit_coterie(coterie, user)
            elif operation == 'removemember':
                return _remove_member(request, coterie, user)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)


def _delete_coteriedocument(document, user):
    if user in document.owner.administrators.all():
        document.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)  # user has no permission

def _download_coteriedocument(document):
    if document.file_on_server:
        file_model = document.unique_file
        file_position = file_model.file_field.storage.path(file_model.file_field)
        content = open(file_position, 'rb')
    else:
        content = urllib.urlopen(document.external_url)
    response = HttpResponse(content, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=%s.pdf' % document.title
    return response

def _rename_coteriedocument(document, user, new_title):
    if user in document.owner.administrators.all():
        document.title = new_title
        document.save()
        return JsonResponse(document, encoder=CoterieDocumentEncoder, safe=False)
    else:
        return HttpResponse(status=403)  # user has no permission

class CoterieDocumentView(View):
    def get(self, request, pk, **kwargs):
        try:
            coteriedocument = CoterieDocument.objects.get(pk=pk)
            if 'operation' in kwargs:
                operation = kwargs['operation']
                if operation == 'download':
                    return _download_coteriedocument(coteriedocument)
                else:
                    return HttpResponse(status=500)
            else:
                return JsonResponse(coteriedocument, encoder=CoterieDocumentEncoder, safe=False)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)

    def post(self, request, pk, operation):
        try:
            coteriedocument = CoterieDocument.objects.get(pk=pk)
            user = get_user(request)
            if operation == 'delete':
                return _delete_coteriedocument(coteriedocument, user)
            if operation == 'rename':
                if 'new_title' not in request.POST:
                    return HttpResponse(status=403)
                return _rename_coteriedocument(coteriedocument, user, request.POST['new_title'])
        except ObjectDoesNotExist:
            return HttpResponse(status=404)


@login_required(login_url='/')
def create_coterie(request):
    user = get_user(request)
    coterie = Coterie()
    coterie.name = request.POST['coterie_name']
    coterie.creator = user
    if 'coterie_description' in request.POST:
        coterie.description = request.POST["coterie_description"]
    coterie.save()
    coterie.administrators.add(user)
    return JsonResponse(coterie, encoder=CoterieEncoder, safe=False)


def get_annotation_content(request, id):
    return HttpResponse(CoterieAnnotation.objects.get(id=int(id)).content)


def edit_annotation_content(request, id):
    user = get_user(request)
    annotation = CoterieAnnotation.objects.filter(id=int(id))
    if user.pk != annotation[0].annotator.pk:
        return HttpResponse(status=403)
    annotation.update(content=request.POST['new_content'], edit_time=now())
    return HttpResponse(status=200)


def get_annotation_reply_content(request, id):
    return HttpResponse(CoterieAnnotationReply.objects.get(id=int(id)).content)


def edit_annotation_reply_content(request, id):
    user = get_user(request)
    reply = CoterieAnnotationReply.objects.filter(id=int(id))
    if user.pk != reply[0].replier.pk:
        return HttpResponse(status=403)
    reply.update(content=request.POST['new_content'], edit_time=now())
    return HttpResponse(status=200)
