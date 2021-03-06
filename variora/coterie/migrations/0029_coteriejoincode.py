# -*- coding: utf-8 -*-
# Generated by Django 1.11.7 on 2019-05-31 05:34
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('coterie', '0028_coteriereadlist_coterie'),
    ]

    operations = [
        migrations.CreateModel(
            name='CoterieJoinCode',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('uuid', models.UUIDField(default=uuid.uuid4, editable=False, unique=True)),
                ('code', models.CharField(max_length=64)),
                ('create_datetime', models.DateTimeField(auto_now_add=True)),
                ('coterie', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='join_code', to='coterie.Coterie')),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
