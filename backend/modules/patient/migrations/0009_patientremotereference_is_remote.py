# Generated by Django 2.2.2 on 2020-01-20 22:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('patient', '0008_auto_20200118_1348'),
    ]

    operations = [
        migrations.AddField(
            model_name='patientremotereference',
            name='is_remote',
            field=models.BooleanField(db_column='is_remote', default=True),
        ),
    ]