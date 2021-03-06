# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-07-03 14:28
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coterie', '0013_auto_20180703_1339'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coterie',
            name='name',
            field=models.CharField(db_index=True, max_length=256),
        ),
        migrations.AlterField(
            model_name='coterieannotationreply',
            name='post_time',
            field=models.DateTimeField(auto_now_add=True, db_index=True),
        ),
        migrations.AlterField(
            model_name='coteriedocument',
            name='title',
            field=models.CharField(db_index=True, max_length=1028),
        ),
    ]
