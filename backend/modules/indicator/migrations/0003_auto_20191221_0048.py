# Generated by Django 2.2.2 on 2019-12-21 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('indicator', '0002_auto_20190929_1821'),
    ]

    operations = [
        migrations.AlterField(
            model_name='indicator',
            name='measurement',
            field=models.CharField(db_column='measurement', max_length=255),
        ),
    ]
