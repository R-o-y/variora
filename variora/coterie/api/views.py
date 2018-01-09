import urllib

from django.contrib.auth import get_user
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect, render
from django.utils.decorators import method_decorator
from django.views.generic import View

from ..models import Coterie, CoterieDocument
from home.models import User
from django.contrib.auth.models import AnonymousUser 


class CoterieEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Coterie):
            return {
                'name': obj.name,
                'description': obj.description,
                'pk': obj.pk,
                'coteriedocument_set': list(obj.coteriedocument_set.all()),
                'administrators': list(obj.administrators.all()),
                'members': list(obj.members.all()),
            }
        elif isinstance(obj, CoterieDocument):
            return CoterieDocumentEncoder().default(obj)
        elif isinstance(obj, User):
            return {
                'nickname': obj.nickname,
                'email_address': obj.email_address,
                'portrait_url': obj.portrait_url,
                'date_joined': obj.date_joined,
                'is_authenticated': obj.is_authenticated,
            }
        else:
            return super(CoterieEncoder, self).default(obj)


class CoterieDocumentEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, CoterieDocument):
            return {
                'pk': obj.pk,
                'title': obj.title,
                'num_visit': str(obj.num_visit),
                'url': obj.url,
                'download_method': 'get',
                'download_url': '/coterie/api/coteriedocuments/' + str(obj.pk) + '/download',
                'delete_method': 'post',
                'delete_url': '/coterie/api/coteriedocuments/' + str(obj.pk) + '/delete',
                'file_on_server': obj.file_on_server
            }
        return super(CoterieDocumentEncoder, self).default(obj)


class CoterieListView(View):
    def get(self, request):
        user = get_user(request)
        administrated_coteries = [] if isinstance(user, AnonymousUser) else list(user.administrated_coterie_set.all())
        joined_coteries = [] if isinstance(user, AnonymousUser) else list(user.joined_coterie_set.all())
        return JsonResponse(
            {
                'administratedCoteries': administrated_coteries, 
                'joinedCoteries': joined_coteries,
            }, 
            encoder=CoterieEncoder, 
            safe=False
        )


class CoterieView(View):
    def get(self, request, pk, **kwargs):
        try:
            coterie = Coterie.objects.get(id=pk)
            return JsonResponse(coterie, encoder=CoterieEncoder, safe=False)
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
    

class CoterieDocumentView(View):
    def get(self, request, pk, **kwargs):
        try:
            coteriedocument = CoterieDocument.objects.get(id=pk)
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
            coteriedocument = CoterieDocument.objects.get(id=pk)
            user = get_user(request)
            if operation == 'delete':
                return _delete_coteriedocument(coteriedocument, user)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)


@login_required(login_url='/')
def create_coterie(request):
    coterie = Coterie()
    coterie.name = request.POST['coterie_name']
    if 'coterie_description' in request.POST:
        coterie.description = request.POST["coterie_description"]
    coterie.save()
    coterie.administrators.add(get_user(request))
    return JsonResponse(coterie, encoder=CoterieEncoder, safe=False)






