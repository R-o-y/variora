# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-06-06 13:48
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coterie', '0006_coterieinvitation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coterieinvitation',
            name='response_datetime',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
