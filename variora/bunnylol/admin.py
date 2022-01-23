from django.contrib import admin

from .models import BunnylolCommand


class BunnylolCommandModelAdmin(admin.ModelAdmin):
    list_display = ["clean_uuid", "shortcut", "action"]
    list_filter = []
    search_fields = ["uuid", "shortcut", "action"]

admin.site.register(BunnylolCommand, BunnylolCommandModelAdmin)
