# Generated by Django 2.2 on 2019-06-08 19:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rule', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='threshold',
            name='bottom',
        ),
        migrations.RemoveField(
            model_name='threshold',
            name='top',
        ),
        migrations.AddField(
            model_name='threshold',
            name='begin',
            field=models.IntegerField(db_column='begin', default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='threshold',
            name='end',
            field=models.IntegerField(db_column='end', default=0),
            preserve_default=False,
        ),
    ]