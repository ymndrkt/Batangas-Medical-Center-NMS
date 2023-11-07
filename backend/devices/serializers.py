from rest_framework import serializers
from .models import Device


class DeviceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Device
        fields = ('deviceId',
                  'DeviceName',
                  'DeviceType',
                  'IpAddress',
                  'MacAddress',
                  'Building',
                  'Floor',
                  'Department',
                  'status',)
