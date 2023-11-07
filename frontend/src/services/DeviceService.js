import axios from 'axios';

export function getDevices() {
  return axios.get('http://localhost:8000/devices/')
    .then(response => response.data)
}

export function getScanHistory() {
  return axios.get('http://127.0.0.1:8000/api/scanner-history/')
    .then(response => response.data)
}

export function deleteDevice(deviceId) {
  return axios.delete('http://localhost:8000/devices/' + deviceId + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

export function addDevice(Device){
  return axios.post('http://localhost:8000/devices/', {
    studentId:null,
    DeviceName:Device.DeviceName.value,
    DeviceType:Device.DeviceType.value,
    IpAddress:Device.IpAddress.value,
    MacAddress:Device.MacAddress.value,
    Building:Device.Building.value,
    Floor:Device.Floor.value,
    Department:Device.Department.value
  })
    .then(response=>response.data)
}

export function updateDevice(devid, device) {
  return axios.put('http://localhost:8000/devices/' + devid + '/', {
    DeviceName:device.DeviceName.value,
    DeviceType:device.DeviceType.value,
    IpAddress:device.IpAddress.value,
    MacAddress:device.MacAddress.value,
    Building:device.Building.value,
    Floor:device.Floor.value,
    Department:device.Department.value
  })
   .then(response => response.data)
}