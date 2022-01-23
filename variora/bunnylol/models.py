from __future__ import unicode_literals

import uuid

from django.db import models
from variora.utils import ModelWithCleanUUID


class BunnylolCommand(ModelWithCleanUUID):
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    shortcut = models.CharField(max_length=64, null=False, blank=False)
    action = models.TextField(null=False, blank=False, help_text="sth like http://example.com?a=%s&b=%s")
    description = models.TextField(null=False, blank=True)

