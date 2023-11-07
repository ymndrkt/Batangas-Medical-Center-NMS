from django.http.response import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from django.http.response import JsonResponse
from .models import Device
from .serializers import DeviceSerializer
from scapy.all import ARP, Ether, srp
class DeviceView(APIView):

    def post(self, request):
        data = request.data
        serializer = DeviceSerializer(data=data)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Device Added Successfully",          safe=False)
        return JsonResponse("Failed to Add Device", safe=False)

    @staticmethod
    def scan_network(target_ip):
        arp = ARP(pdst=target_ip)
        ether = Ether(dst="ff:ff:ff:ff:ff:ff")
        packet = ether / arp

        result = srp(packet, timeout=3, verbose=0)[0]

        devices = []
        for sent, received in result:
            devices.append({
                "IpAddress": received.psrc,
                "MacAddress": received.hwsrc,
                "status": "Active"  # Set the initial status for scanned devices
                # Add other fields as needed
            })

        return devices

    def post(self, request):
        target_ip = "172.16.0.0/20"  # Specify the desired IP range
        devices = self.scan_network(target_ip=target_ip)

        for device_data in devices:
            device = Device.objects.create(
                IpAddress=device_data["IpAddress"],
                MacAddress=device_data["MacAddress"],
                status=device_data["status"]  # Save the status of the device
            )
            device.save()

        return JsonResponse("Devices Added Successfully", safe=False)
    def get_device(self, pk):
        try:
            device = Device.objects.get(deviceId=pk)
            return device
        except Device.DoesNotExist:
            raise Http404

    def get(self, request, pk=None):
        if pk:
            data = self.get_device(pk)
            serializer = DeviceSerializer(data)
        else:
            data = Device.objects.all()
            serializer = DeviceSerializer(data, many=True)
        return Response(serializer.data)

    def put(self, request, pk=None):
        device_to_update = Device.objects.get(deviceId=pk)
        serializer = DeviceSerializer(instance=device_to_update, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Device updated Successfully", safe=False)
        return JsonResponse("Failed To Update Device")

    def delete(self, request, pk):
        device_to_delete = Device.objects.get(deviceId=pk)
        device_to_delete.delete()
        return JsonResponse("Device Deleted Successfully", safe=False)

    def update_status(self, pk, new_status):
        try:
            device = Device.objects.get(pk=pk)
            device.status = new_status
            device.save()
            return device
        except Device.DoesNotExist:
            raise Http404

    def put(self, request, pk=None):
        new_status = request.data.get("status")
        device = self.update_status(pk, new_status)
        serializer = DeviceSerializer(device)
        return Response(serializer.data)
