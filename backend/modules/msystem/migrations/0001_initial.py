# Generated by Django 2.2.2 on 2019-07-16 01:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('institution', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='MSystem',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_column='name', max_length=255)),
                ('url', models.CharField(db_column='url', max_length=500)),
                ('description', models.CharField(db_column='description', max_length=1000)),
                ('institution', models.ForeignKey(blank=True, null=True, on_delete=None, to='institution.Institution')),
            ],
            options={
                'verbose_name': 'Monitoring Systems',
                'verbose_name_plural': 'Monitoring Systems',
                'db_table': 'MSystem',
                'ordering': ['id'],
                'managed': True,
            },
        ),
    ]
