# Generated by Django 2.0.1 on 2024-05-12 11:09

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0022_auto_20240512_1349'),
    ]

    operations = [
        migrations.AddField(
            model_name='admin',
            name='birth_date',
            field=models.DateField(default='2000-01-01'),
        ),
        migrations.AddField(
            model_name='admin',
            name='phone_number',
            field=models.CharField(default='+375-25-111-11-11', max_length=18),
        ),
        migrations.AddField(
            model_name='customer',
            name='birth_date',
            field=models.DateField(default='2000-01-01'),
        ),
        migrations.AddField(
            model_name='customer',
            name='phone_number',
            field=models.CharField(default='+375-25-111-11-11', max_length=18),
        ),
        migrations.AddField(
            model_name='employee',
            name='photo',
            field=models.ImageField(default='default_photo.png', upload_to='employees_photo/'),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date_sold',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 12, 14, 9, 54, 786099)),
        ),
    ]