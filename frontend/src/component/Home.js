import {useEffect, useState} from "react";
import axios from "axios";
import {Navigate} from "react-router-dom";
import {NavLink} from 'react-router-dom';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import slide01 from '../static/slide01.jpg'
import slide02 from '../static/slide02.jpg'
import slide03 from '../static/slide03.jpg'

import Carousel from 'react-bootstrap/Carousel';

export const Home = () => {
    const [message, setMessage] = useState('');

    useEffect(() => {
        if(localStorage.getItem('access_token') === null){
            window.location.href = '/login'  
        }
        else{
            (async () => {
            try {
                const {data} = await axios.get('http://localhost:8000/home/', {
                headers: {
                  'Content-Type': 'application/json',
                }
              });

              setMessage(data.message);
            } catch (e) {
                console.log('not auth')
            }
        })()};
    }, []);



    return <div className="form-signin mt-5 text-center">
        <div className='sidebar'>
            <CDBSidebar textColor="#333" backgroundColor="#f0f0f0">
                 <CDBSidebarHeader prefix={<i className="fa fa-bars" />}>
                    Navigation
                 </CDBSidebarHeader>
            <CDBSidebarContent>
                <CDBSidebarMenu>
                    <NavLink exact to="/" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="home">Home</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/devices" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="list">Device Reports</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/manage" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="user">Manage Devices</CDBSidebarMenuItem>
                    </NavLink>
                    <NavLink exact to="/scan" activeClassName="activeClicked">
                        <CDBSidebarMenuItem icon="search">Scan Network</CDBSidebarMenuItem>
                    </NavLink>
                </CDBSidebarMenu>
            </CDBSidebarContent>
        </CDBSidebar>
    </div>
    <div className="row">
    <Carousel variant="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide01}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide03}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={slide02}
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
    </div>
        
    </div>
}
