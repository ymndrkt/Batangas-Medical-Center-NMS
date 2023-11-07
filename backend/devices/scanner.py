from scapy.all import ARP, Ether, srp

def scan_network(self):
    # Define the target IP range to scan
    target_ip = "172.16.0.0/20"

    # Create an ARP request packet
    arp = ARP(pdst=target_ip)
    ether = Ether(dst="ff:ff:ff:ff:ff:ff")
    packet = ether / arp

    # Send the packet and capture the response
    result = srp(packet, timeout=3, verbose=0)[0]

    # Extract IP and MAC addresses from the response
    devices = []
    for sent, received in result:
        devices.append({"ip": received.psrc, "mac": received.hwsrc})

    return devices