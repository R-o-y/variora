# -*- coding: utf-8 -*-
# Generated by Django 1.9.6 on 2016-06-28 10:16
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coterie', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='coterie',
            name='description',
            field=models.TextField(blank=True),
        ),
        migrations.AlterField(
            model_name='coterie',
            name='applicants',
            field=models.ManyToManyField(blank=True, related_name='appied_coterie_set', to=settings.AUTH_USER_MODEL),
        ),
    ]
