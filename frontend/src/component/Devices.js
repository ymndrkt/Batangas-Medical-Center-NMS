import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { getDevices } from '../services/DeviceService';
import "../App.css";

const Devices = () => {
  const [Devices, setDevices] = useState([]);

  useEffect(() => {
   let mounted = true;
   getDevices()
     .then(data => {
       if(mounted) {
         setDevices(data)
       }
     })
   return () => mounted = false;
 }, [])

  return(

   <div className="container-fluid side-container">
   <div className="row side-row" >
    <p id="before-table"></p>
        <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
        <thead>
            <tr>
            <th>ID</th>
            <th>Device Name</th>
            <th>Device Type</th>
            <th>IP Address</th>
            <th>MAC Address</th>
            <th>Building</th>
            <th>Floor</th>
            <th>Department</th>
            <th>Status</th>
            </tr>
        </thead>
        <tbody>
            {Devices.map((dev) =>
               <tr key={dev.id}>
                <td>{dev.deviceId}</td>
                <td>{dev.DeviceName}</td>
                <td>{dev.DeviceType}</td>
                <td>{dev.IpAddress}</td>
                <td>{dev.MacAddress}</td>
                <td>{dev.Building}</td>
                <td>{dev.Floor}</td>
                <td>{dev.Department}</td>
                <td>{dev.status}</td>
                </tr>)}
        </tbody>
    </Table>
    </div>
  </div>
  );
};

export default Devices;