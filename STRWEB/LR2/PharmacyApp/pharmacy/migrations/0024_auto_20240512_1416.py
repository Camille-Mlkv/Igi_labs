# Generated by Django 2.0.1 on 2024-05-12 11:16

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0023_auto_20240512_1409'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='photo',
            field=models.ImageField(default='contact_photos/default_photo.png', upload_to='contact_photos/'),
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date_sold',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 12, 14, 16, 14, 165210)),
        ),
    ]
