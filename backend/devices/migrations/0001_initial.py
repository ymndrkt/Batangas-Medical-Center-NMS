# Generated by Django 4.2.7 on 2023-11-04 21:56

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Device',
            fields=[
                ('deviceId', models.AutoField(primary_key=True, serialize=False)),
                ('DeviceName', models.CharField(max_length=100)),
                ('DeviceType', models.CharField(max_length=100)),
                ('IpAddress', models.CharField(max_length=100)),
                ('MacAddress', models.CharField(max_length=100)),
                ('Building', models.CharField(max_length=100)),
                ('Floor', models.CharField(max_length=100)),
                ('Department', models.CharField(max_length=100)),
            ],
        ),
    ]
