# Generated by Django 2.2.2 on 2019-10-13 21:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('rule', '0003_auto_20191013_2121'),
    ]

    operations = [
        migrations.AlterField(
            model_name='threshold',
            name='quality',
            field=models.IntegerField(db_column='quality'),
        ),
    ]