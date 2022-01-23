from django.conf.urls import include, url

from . import views

urlpatterns = [

    url(r'^', views.handle_bunnylol_command, name="handle_bunnylol_command"),
]
