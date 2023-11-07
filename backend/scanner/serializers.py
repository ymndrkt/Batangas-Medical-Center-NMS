from rest_framework import serializers
from .models import ScannerHistory
from .models import Host
class ScannerTriggerSerializer(serializers.Serializer):
    target = serializers.CharField()

class HostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Host
        fields =[ 'id', 'IP', 'mac_address']
class ScannerHistorySerializer(serializers.ModelSerializer):
    hosts = HostSerializer(many=True)

    class Meta:
        model = ScannerHistory
        fields = [
            'id',
            'target',
            'hosts',
            'type',
            'created_on',
            'updated_on',

        ]
