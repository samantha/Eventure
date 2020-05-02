import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
// import { UserContext } from '../components/UserContext';
import "../styles/navbar.css";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

class Navigation extends Component {
  // static contextType = UserContext;

  render() {
    console.log(this.props);
    const user = this.props.user;
    var isAuthenticated = false;
    console.log(user.email);
    if (user !== null) {
      console.log(true);
      isAuthenticated = user.loggedIn;
      console.log(isAuthenticated);
    }

    const userLinks = (
      <Nav>
        <Nav.Link href="#">Log Out</Nav.Link>
      </Nav>
    );

    const guestLinks = (
      <Nav>
        <Nav.Link href="register">Sign Up</Nav.Link>
        <Nav.Link href="login">Log In</Nav.Link>
      </Nav>
    );

    return (
      <div className="container-fluid">
        {/*<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">*/}
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Navbar.Brand href="/">eventure</Navbar.Brand>
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

            {isAuthenticated ? userLinks : guestLinks}

            {/*{<Nav>
                <Nav.Link href="register">Sign Up</Nav.Link>
                <Nav.Link href="login">Log In</Nav.Link>
          </Nav>*/}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

// validation: check types, so we only use types we want to
Navigation.propTypes = {
  user: PropTypes.object,
};

export default Navigation;
