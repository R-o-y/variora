# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2018-11-02 16:04
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('coterie', '0022_nonregisteredusertempcoterieinvitation'),
    ]

    operations = [
        migrations.AlterField(
            model_name='coterieannotation',
            name='frame_color',
            field=models.CharField(max_length=64),
        ),
    ]