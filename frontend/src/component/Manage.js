import React,{ useEffect, useState }from 'react';
import {Table} from 'react-bootstrap';
import axios from 'axios';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin5Line } from 'react-icons/ri';
import AddDeviceModal from "./AddDeviceModal";
import UpdateDeviceModal from "./UpdateDeviceModal";
import { getDevices, deleteDevice } from '../services/DeviceService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

const Manage = () => {
    const [devices, setDevices] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editDevice, setEditDevice] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);

    useEffect(() => {

     const fetchDevices = async () => {
      try {
        const response = await axios.get('http://localhost:8000/devices/');
        setDevices(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDevices();


       let mounted = true;
       if(devices.length && !isUpdated) {
        return;
        }
       getDevices()
         .then(data => {
           if(mounted) {
             setDevices(data);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, devices])

    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditDevice(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);
    };

    const handleDelete = (e, deviceId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteDevice(deviceId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Device");
            })
        }
    };
    const getIcon = (status) => {
  if (status === 'Active') {
    return <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />;
  } else {
    return <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />;
  }
  };

    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);
    return(
        <div className="container-fluid side-container">
        <div className="row side-row" >
        <p id="manage"></p>
            <Table striped bordered hover className="react-bootstrap-table" id="dataTable">
                <thead>
                <tr>
                  <th >ID</th>
                  <th>Device Name</th>
                    <th>Device Type</th>
                    <th>IP Address</th>
                    <th>MAC Address</th>
                    <th>Building</th>
                    <th>Floor</th>
                    <th>Department</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
             </thead>
                <tbody>
                {devices.map((dev) =>
                 <tr key={dev.id}>
                    <td>{dev.deviceId}</td>
                    <td>{dev.DeviceName}</td>
                    <td>{dev.DeviceType}</td>
                    <td>{dev.IpAddress}</td>
                    <td>{dev.MacAddress}</td>
                    <td>{dev.Building}</td>
                    <td>{dev.Floor}</td>
                    <td>{dev.Department}</td>
                    <td>{getIcon(dev.status)}</td>
                    <td>

                  <Button className="mr-2" variant="danger"
                    onClick={event => handleDelete(event,dev.deviceId)}>
                        <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2"
                    onClick={event => handleUpdate(event,dev)}>
                        <FaEdit />
                  </Button>
                  <UpdateDeviceModal show={editModalShow} student={editDevice} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateDeviceModal>
                </td>
                </tr>)}
              </tbody>
            </Table>
            <ButtonToolbar>
                <Button variant="primary" onClick={handleAdd}>
                Add Device
                </Button>
                <AddDeviceModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddDeviceModal>
            </ButtonToolbar>
        </div>
        </div>
    );
};

export default Manage;