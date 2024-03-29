# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2022-01-23 05:24
from __future__ import unicode_literals

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='BunnylolCommand',
            fields=[
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('shortcut', models.CharField(max_length=64)),
                ('action', models.TextField(help_text='sth like http://example.com?a=%s&b=%s')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
