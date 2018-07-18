from django.contrib.auth import authenticate, get_user
from django.contrib.auth.models import AnonymousUser
from django.core.exceptions import ObjectDoesNotExist
from django.core.serializers.json import DjangoJSONEncoder
from django.http import HttpResponse, JsonResponse
from django.shortcuts import get_object_or_404, redirect
from notifications.models import Notification
from notifications.utils import id2slug, slug2id

from ..models import User


class NotificationEncoder(DjangoJSONEncoder):
    def default(self, obj):
        if isinstance(obj, Notification):
            slug = str(id2slug(obj.id))
            return {
                'slug': slug,
                'actor': str(obj.actor),
                'verb': obj.verb,
                'description': obj.description,
                'action_object': str(obj.action_object),
                'target': str(obj.target),
                'timestamp': obj.timestamp,
                'data': obj.data,
                'unread': obj.unread,
                'mark_read_url': '/notifications/api/notifications/' + slug + '/mark-read',
            }
        return super(NotificationEncoder, self).default(obj)


def get_unread_notification_list(request):
    try:
        user_is_authenticated = request.user.is_authenticated()
    except TypeError:  # Django >= 1.11
        user_is_authenticated = request.user.is_authenticated

    if not user_is_authenticated:
        return JsonResponse([], safe=False)

    try:
        num_to_fetch = request.GET.get('max', 10)  # If they don't specify, make it 5.
        num_to_fetch = int(num_to_fetch)
        num_to_fetch = max(1, num_to_fetch)  # if num_to_fetch is negative, force at least one fetched notifications
        num_to_fetch = min(num_to_fetch, 100)  # put a sane ceiling on the number retrievable
    except ValueError:
        num_to_fetch = 10  # If casting to an int fails, just make it 5.

    return JsonResponse(list(request.user.notifications.unread()[0:num_to_fetch]), encoder=NotificationEncoder, safe=False)


def mark_notification_as_read(request, slug):
    notification_id = slug2id(slug)

    notification = Notification.objects.get(recipient=request.user, id=notification_id)
    notification.mark_as_read()

    return HttpResponse(status=200)
