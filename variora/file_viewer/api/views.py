import urllib

from django.contrib.auth import get_user
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic import View

from ..models import Annotation, AnnotationReply, Comment, Document
from home.models import User
from django.contrib.auth.models import AnonymousUser 


class DocumentEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Document):
            return {
                'pk': obj.pk,
                'title': obj.title,
                'num_visit': str(obj.num_visit),
                'url': obj.url,
                'download_method': 'get',
                'download_url': '/file_viewer/api/documents/' + str(obj.pk) + '/download',
                'delete_method': 'post',
                'delete_url': '/file_viewer/api/documents/' + str(obj.pk) + '/delete',
                'file_on_server': obj.file_on_server
            }
        return super(DocumentEncoder, self).default(obj)


def _delete_document(document, user):
    if document.owner == user:
        document.delete()
        return HttpResponse(status=200)
    else:
        return HttpResponse(status=403)  # user has no permission


def _download_document(document):
    if document.file_on_server:
        file_model = document.unique_file
        file_position = file_model.file_field.storage.path(file_model.file_field)
        content = open(file_position, 'rb')
    else:
        content = urllib.urlopen(document.external_url)
    response = HttpResponse(content, content_type='application/pdf')
    response['Content-Disposition'] = 'attachment; filename=%s.pdf' % document.title
    return response


class DocumentView(View):
    def get(self, request, pk, **kwargs):
        try:
            document = Document.objects.get(id=pk)
            if 'operation' in kwargs:
                operation = kwargs['operation']
                if operation == 'download':
                    return _download_document(document)
                else:
                    return HttpResponse(status=500)  # operation not supported
            else:
                return JsonResponse(document, encoder=DocumentEncoder, safe=False)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)

    @method_decorator(login_required(login_url='/'))
    def post(self, request, pk, operation):
        try:
            document = Document.objects.get(id=pk)
            user = get_user(request)
            if operation == 'delete':
                return _delete_document(document, user)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)

    @method_decorator(login_required(login_url='/'))  
    def delete(self, request, pk):
        try:
            document = Document.objects.get(id=pk)
            user = get_user(request)
            return _delete_document(document, user)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)


class DocumentListView(View):
    def get(self, request):
        user = get_user(request)
        uploaded_documents = [] if isinstance(user, AnonymousUser) else list(user.document_set.all())
        collected_documents = [] if isinstance(user, AnonymousUser) else list(user.collected_document_set.all())
        return JsonResponse(
            {
                'uploadedDocuments': uploaded_documents, 
                'collectedDocuments': collected_documents
            }, 
            encoder=DocumentEncoder, 
            safe=False
        )

