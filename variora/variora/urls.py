"""variora URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.9/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf import settings
from django.conf.urls import include, url
from django.conf.urls.static import static
from django.contrib import admin
import proxy_views
import notifications.urls

urlpatterns = static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT) + [
    # app: admin
    url(r'^admin/', admin.site.urls),

    # app: file_viewer
    url(r'^file_viewer/', include('file_viewer.urls')),
    url(r'^documents/', include('file_viewer.urls')),

    # app: user_dashboard
    url(r'^user_dashboard/', include('user_dashboard.urls')),

    # app: coterie
    url(r'^coterie/', include('coterie.urls')),
    url(r'^coteries/', include('coterie.urls')),

    # serve remote servers' pdf file (to fix CORS issue)
    url(r'^proxy$', proxy_views.proxy_view),

    url('^notifications/', include(notifications.urls, namespace='notifications')),

    # MUST BE THE LAST ONE
    url(r'^', include('home.urls')),
]
