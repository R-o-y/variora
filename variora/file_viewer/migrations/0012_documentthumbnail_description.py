# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-07-10 02:52
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('file_viewer', '0011_auto_20180709_2026'),
    ]

    operations = [
        migrations.AddField(
            model_name='documentthumbnail',
            name='description',
            field=models.CharField(default='old', max_length=128),
            preserve_default=False,
        ),
    ]
