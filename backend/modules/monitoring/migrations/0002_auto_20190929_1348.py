# Generated by Django 2.2.2 on 2019-09-29 13:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monitoringindicator',
            name='indicator',
            field=models.ForeignKey(db_column='indicator', on_delete=django.db.models.deletion.CASCADE, to='indicator.Indicator'),
        ),
    ]
