import React, { Component } from "react";
import { Navbar, Nav, NavItem, Button } from "react-bootstrap";
import Sidebar from "../components/sidebar";
/*import "../styles/dashboard.css";
 */ import "../styles/home.css";

const background_img = "img/homepage.jpg";

const bg_style = {
  backgroundImage: `url(${background_img})`,
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: false,
    };
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  render() {
    return (
      <div>
        <Sidebar side="left" isVisible={true} header={"Dashboard"}>
          <Nav>
            <NavItem href="#">Link 1</NavItem>
            <NavItem href="#">Link 2</NavItem>
            <NavItem href="#">Link 3</NavItem>
            <NavItem href="#">Link 4</NavItem>
          </Nav>
        </Sidebar>
      </div>
    );
  }
}
