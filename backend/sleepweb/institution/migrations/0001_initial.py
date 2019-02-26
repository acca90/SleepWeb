# Generated by Django 2.1.5 on 2019-02-25 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Institution',
            fields=[
                ('id', models.AutoField(db_column='id', primary_key=True, serialize=False)),
                ('name', models.CharField(db_column='name', max_length=255)),
                ('country', models.CharField(db_column='country', max_length=255)),
            ],
            options={
                'verbose_name': 'Institutions',
                'verbose_name_plural': 'Institutions',
                'db_table': 'Institution',
                'managed': True,
            },
        ),
    ]