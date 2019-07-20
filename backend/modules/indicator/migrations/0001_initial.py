# Generated by Django 2.2.2 on 2019-07-20 16:45

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Indicator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(db_column='description', max_length=255)),
                ('definition', models.CharField(db_column='definition', max_length=1000)),
            ],
            options={
                'verbose_name': 'Indicators',
                'verbose_name_plural': 'Indicators',
                'db_table': 'Indicator',
                'ordering': ['id'],
                'managed': True,
            },
        ),
    ]
