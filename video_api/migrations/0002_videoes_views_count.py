# Generated by Django 4.1.1 on 2022-09-12 17:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('video_api', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='videoes',
            name='views_count',
            field=models.BigIntegerField(default=0),
        ),
    ]
