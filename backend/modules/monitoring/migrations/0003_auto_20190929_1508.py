# Generated by Django 2.2.2 on 2019-09-29 15:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('monitoring', '0002_auto_20190929_1348'),
    ]

    operations = [
        migrations.AlterField(
            model_name='monitoringindicator',
            name='monitoring',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='indicators', to='monitoring.Monitoring'),
        ),
    ]
