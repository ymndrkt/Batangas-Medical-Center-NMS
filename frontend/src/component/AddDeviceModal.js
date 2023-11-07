import React from 'react';
import {Modal, Col, Row, Form, Button} from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addDevice } from '../services/DeviceService';


const AddDeviceModal = (props) => {

    const handleSubmit = (e) => {
        e.preventDefault();
        addDevice(e.target)
        .then((result)=>{
            alert(result);
            props.setUpdated(true);
        },
        (error)=>{
            alert("Failed to Add Device");
        })
    }

    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Device Information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="DeviceName">
                                    <Form.Label>Device Name</Form.Label>
                                    <Form.Control type="text" name="Device Name" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="DeviceType">
                                    <Form.Label>Device Type</Form.Label>
                                    <Form.Control type="text" name="Device Type" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="IpAddress">
                                    <Form.Label>IP Address</Form.Label>
                                    <Form.Control type="text" name="Ip Address" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="MacAddress">
                                    <Form.Label>MAC Address</Form.Label>
                                    <Form.Control type="text" name="MAC Address" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Building">
                                    <Form.Label>Building</Form.Label>
                                    <Form.Control type="text" name="Building" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Floor">
                                    <Form.Label>Floor</Form.Label>
                                    <Form.Control type="text" name="Floor" required placeholder="" />
                            </Form.Group>
                            <Form.Group controlId="Department">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" name="Department" required placeholder="" />
                            </Form.Group>
                            <Form.Group>
                                <p></p>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form.Group>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddDeviceModal;