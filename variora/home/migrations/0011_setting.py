# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-10-23 02:41
from __future__ import unicode_literals

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('home', '0010_auto_20180719_1118'),
    ]

    operations = [
        migrations.CreateModel(
            name='Setting',
            fields=[
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, primary_key=True, related_name='setting', serialize=False, to=settings.AUTH_USER_MODEL)),
                ('email_subscribe', models.BooleanField(default=True)),
            ],
        ),
    ]