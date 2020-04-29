import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

// Bootstrap Components
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

export default class Navigation extends Component {
  render() {
    return (
    <div className="container-fluid">
        {/*<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">*/}
        <Navbar collapseOnSelect expand="lg" variant="dark">
            <Navbar.Brand href="/">Eventure</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">


                    {/*<NavDropdown title="Multimedia" id="collasible-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>*/}
                </Nav>
                <Nav>
                      {/*<Nav.Link href="timeline">Timeline</Nav.Link>*/}
                      {/*<Nav.Link href="staff">-70th Team-</Nav.Link>*/}
                     <Nav.Link href="register">Sign Up</Nav.Link>
                     <Nav.Link href="login">Log In</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    </div>
    );
  }
}