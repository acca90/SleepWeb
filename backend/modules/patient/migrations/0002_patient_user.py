# Generated by Django 2.2.2 on 2019-07-20 16:45

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('patient', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='patient',
            name='user',
            field=models.ForeignKey(null=True, on_delete=None, to=settings.AUTH_USER_MODEL),
        ),
    ]
