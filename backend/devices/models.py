from django.db import models
from scapy.all import ARP, Ether, srp


class Device(models.Model):
    deviceId = models.AutoField(primary_key=True)
    DeviceName = models.CharField(max_length=100, null=True)
    DeviceType = models.CharField(max_length=100, null=True)
    IpAddress = models.GenericIPAddressField()
    MacAddress = models.CharField(max_length=100)
    Building = models.CharField(max_length=100, null=True)
    Floor = models.CharField(max_length=100, null=True)
    Department = models.CharField(max_length=100, null=True)
    status = models.CharField(max_length=10, default='unknown')

    @staticmethod
    def scan_network(target_ip):
        arp = ARP(pdst=target_ip)
        ether = Ether(dst="ff:ff:ff:ff:ff:ff")
        packet = ether / arp

        result = srp(packet, timeout=3, verbose=0)[0]

        devices = []
        for sent, received in result:
            devices.append(Device(ip_address=received.psrc, mac_address=received.hwsrc))

        return devices
