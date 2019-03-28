# Generated by Django 2.1.7 on 2019-03-27 23:01

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('institution', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Group',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_column='name', max_length=255)),
                ('details', models.CharField(db_column='details', max_length=1000)),
                ('institutions', models.ManyToManyField(related_name='grouo_institution', to='institution.Institution')),
                ('owner', models.ForeignKey(db_column='owner', null=True, on_delete=None, to=settings.AUTH_USER_MODEL)),
                ('users', models.ManyToManyField(related_name='group_user', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Groups',
                'verbose_name_plural': 'Groups',
                'db_table': 'Group',
                'ordering': ['id'],
                'managed': True,
            },
        ),
    ]
