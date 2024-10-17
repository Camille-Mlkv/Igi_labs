# Generated by Django 2.0.1 on 2024-05-12 08:32

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('pharmacy', '0016_auto_20240511_2206'),
    ]

    operations = [
        migrations.CreateModel(
            name='Sale',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('quantity', models.PositiveIntegerField(default=1)),
                ('pickup_point', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pharmacy.PickupPoint')),
                ('product', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='pharmacy.Medication')),
            ],
        ),
        migrations.AlterField(
            model_name='purchase',
            name='date_sold',
            field=models.DateTimeField(default=datetime.datetime(2024, 5, 12, 11, 32, 47, 820763)),
        ),
    ]
