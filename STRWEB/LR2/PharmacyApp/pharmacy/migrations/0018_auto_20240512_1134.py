# Generated by Django 2.0.1 on 2024-05-12 08:34

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0017_auto_20240512_1132'),
    ]

    operations = [
        migrations.AlterField(
            model_name='purchase',
            name='date_sold',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 12, 11, 34, 0, 516351)),
        ),
    ]