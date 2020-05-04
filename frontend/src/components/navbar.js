import React, { Component } from "react";
import PropTypes from "prop-types";
// import { Link } from 'react-router-dom';
// import { UserContext } from '../components/UserContext';
import "../styles/navbar.css";
import { withRouter } from "react-router-dom";

// Bootstrap Components
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

class Navigation extends Component {
  // static contextType = UserContext;
  constructor(props) {
    super();
    this.state = {
      isAuthenticated: false,
    };
  }

  onChangeUser = () => {
    this.state.isAuthenticated = false;
    console.log("log out");
    const loggedOutUser = {
      email: "n/a",
      first_name: "n/a",
      last_name: "n/a",
      loggedIn: false,
    };
    console.log(loggedOutUser);

    this.props.changeUser(loggedOutUser);
    this.props.history.push("/");
  };

  render() {
    console.log(this.props.user);
    const user = this.props.user;
    console.log(user.email);
    if (user !== null) {
      console.log(true);
      this.state.isAuthenticated = user.loggedIn;
      console.log(this.state.isAuthenticated);
    }

    var name = user.first_name + " " + user.last_name;

    let search;
    if (this.state.isAuthenticated) {
      search = (
        <Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
          </Form>
        </Nav>
      );
    }

    const userLinks = (
      <Nav>
        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
        <NavDropdown title="Events" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/create-event">Create</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">View</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Organizations" id="collasible-nav-dropdown">
          <NavDropdown.Item href="/create-org">Create</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">View</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title={name} id="collasible-nav-dropdown">
          <NavDropdown.Item href={"/u/" + user.username}>
            Profile
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Settings</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#" onClick={this.onChangeUser}>
            Logout
          </NavDropdown.Item>
        </NavDropdown>
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
          {search}
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

            {this.state.isAuthenticated ? userLinks : guestLinks}

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
  changeUser: PropTypes.func,
};

export default withRouter(Navigation);
