from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponse
from django.shortcuts import redirect
from .models import BunnylolCommand


@login_required(login_url='/')
def handle_bunnylol_command(request):
    user = request.user
    if not user.is_superuser:
        return HttpResponse(status=500) 

    query = request.GET['q']
    shortcut = query.split(' ')[0]
    params = tuple(query.split(' ', 1)[1].split(',')) if len(query.split(' ')) > 1 else ()

    try:
        bunnylol_command = BunnylolCommand.objects.get(shortcut=shortcut)
        return redirect(bunnylol_command.action % params)
    except ObjectDoesNotExist:
        return redirect('https://www.google.com/search?q={q}'.format(q=query))
