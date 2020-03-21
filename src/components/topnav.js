import React, {Component} from 'react';
import '../nav.css';
import Logo from '../logo.svg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faBell, faUserCircle, faBars, faSearch } from '@fortawesome/free-solid-svg-icons';
import {Navbar, NavDropdown, Form, FormControl, Button, Nav} from 'react-bootstrap';
import { BrowserRouter as Router, Link } from "react-router-dom";

export default class TopNav extends Component {
    render() {
        return (
            <div>
                <div className="nav nav-container" id="nav-desktop">
                    <div className="nav">
                        <div><Link to="/"><img src="" alt="Eventure Logo"/></Link></div>
                        <div><input className="form-control" type="text" placeholder="Search"></input></div>
                    </div>
                    <div className="nav">
                        <div><FontAwesomeIcon icon={faEnvelope}/> Messages</div>
                        <div><FontAwesomeIcon icon={faBell}/> Notifications</div>
                        <div><FontAwesomeIcon icon={faUserCircle}/> Profile</div>
                    </div>
                </div>

                <div className="nav-mobile">
                    <Navbar bg="light" expand="lg">
                        <Navbar.Brand href="#home"><img src="#" alt="Eventure Logo"/></Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav classNameName="mr-auto">
                                <Nav.Link href="#home">Messages</Nav.Link>
                                <Nav.Link href="#link">Notifications</Nav.Link>
                                <Nav.Link href="#link">Profile</Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" classNameName="mr-sm-2" />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Navbar.Collapse> 
                    </Navbar>
                </div>
            </div>              
        );
    }
}