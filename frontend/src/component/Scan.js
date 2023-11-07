import React, { useState } from 'react';
import { Tab, Tabs, Form, Button } from 'react-bootstrap';
import axios from 'axios';

function Scan() {
  const [ipAddress, setIpAddress] = useState('');
  const [scanResults, setScanResults] = useState(null);

  const handleScan = async () => {
    // Make an API request to your Django backend to perform the IP scan.
    // You can use Axios or Fetch for this.
    // After scanning, handle the results as needed.
    try {
      // Make a POST request to your backend API to trigger the scanner
      await axios.post('/scan/', { ipAddress });

      // Fetch the scan results after the scan is triggered
      const response = await axios.get('/api/scan-results/');
      setScanResults(response.data);
    } catch (error) {
      console.error('Error triggering scan:', error);
    }
  };

  return (
    <Tabs defaultActiveKey="scan" id="scan-tab">
      <Tab eventKey="scan" title="Scan">
        <Form>
          <Form.Group>
            <Form.Label>Enter IP Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter IP Address"
              value={ipAddress}
              onChange={(e) => setIpAddress(e.target.value)}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleScan}>
            Scan
          </Button>
        </Form>
      </Tab>
    </Tabs>
  );
}

export default Scan;
