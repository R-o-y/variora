from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import redirect
from .models import BunnylolCommand


def handle_bunnylol_command(request):
    query = request.GET['q']
    shortcut = query.split(' ')[0]
    params = tuple(query.split(' ')[1:])

    try:
        bunnylol_command = BunnylolCommand.objects.get(shortcut=shortcut)
        return redirect(bunnylol_command.action % params)
    except ObjectDoesNotExist:
        return redirect('https://www.google.com/search?q={q}'.format(q=query))
