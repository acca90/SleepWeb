# Generated by Django 2.2.2 on 2019-07-20 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_column='name', max_length=255)),
                ('country', models.CharField(db_column='country', max_length=255)),
            ],
            options={
                'verbose_name': 'Institutions',
                'verbose_name_plural': 'Institutions',
                'db_table': 'Institution',
                'ordering': ['id'],
                'managed': True,
            },
        ),
    ]
