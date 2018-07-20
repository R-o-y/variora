import urllib

from django.contrib.auth import get_user
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse, JsonResponse
from django.utils.decorators import method_decorator
from django.utils.timezone import now
from django.views.generic import View

from home.models import User

from ..models import Document, DocumentThumbnail, Readlist
from .encoders import DocumentEncoder, DocumentThumbnailEncoder, ReadlistEncoder


def _delete_readlist(readlist, user):
    return HttpResponse(status=200)

def _collect_readlist(readlist, user):
    return HttpResponse(status=200)

def _uncollect_readlist(readlist, user):
    return HttpResponse(status=200)

class ReadlistView(View):
    def get(self, request, pk, **kwargs):
        return HttpResponse(status=404)

    @method_decorator(login_required(login_url='/'))
    def post(self, request, pk, operation):
        try:
            user = request.user
            readlist = None
            if operation == 'delete':
                return _delete_readlist(readlist, user)
            elif operation == 'collect':
                return _collect_readlist(readlist, user)
            elif operation == 'uncollect':
                return _uncollect_readlist(readlist, user)
        except ObjectDoesNotExist:
            return HttpResponse(status=404)


class ReadlistListView(View):
    def get(self, request):
        user = request.user
        return JsonResponse([], encoder=DocumentEncoder, safe=False)


def create_readlist(request, id):
    user = request.user
    return HttpResponse(status=200)
