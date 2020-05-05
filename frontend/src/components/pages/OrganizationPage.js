// class OrganizationPage extends Component {
//   render() {
//     return <div>{this.props.match.params.username}</div>;
//   }
// }

// export default OrganizationPage;

import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Sidebar from "../../components/sidebar";
import "../../styles/dashboard.css";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import EventCard from "../../components/cards/EventCard";

library.add(faUserCircle, faHouseUser);

class OrganizationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      org: {},
      orgItems: null,
      orgEvents: null,
      isVisible: false,
    };
    this.getOrg = this.getOrg.bind(this);
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  getOrg() {
    console.log("get org");
    fetch("http://localhost:3000/specificorg", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handle: this.props.match.params.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            org: item[0],
          });
          console.log(this.state.org);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getOrg();
  }

  render() {
    return (
      <div className="sidenav">
        <Sidebar
          side="left"
          isVisible={true}
          header={
            <div>
              <FontAwesomeIcon icon={faHouseUser} />{" "}
              <a href={"/u/" + this.state.org.handle}>{this.state.org.name}</a>
            </div>
          }
          handle={"@" + this.state.org.handle}
        >
          <div>
            <div className="sidebar-container">
              <div className="center">
                <img src={this.state.org.icon} />
              </div>

              <div className="center">
                {this.state.org.city}
                {", "}
                {this.state.org.state}
              </div>
            </div>
            <div className="sidebar-container">
              <div className="center">
                <h1>Follow Us</h1>
              </div>

              {/*<div className="center">
          {this.state.org.city}{", "}
          {this.state.org.state}
          </div>*/}
            </div>
          </div>
          {/*<h4>
              {" "}
              {this.state.org.name}'s Events{" "}
              <button
                type="button"
                className="btn btn-info"
                onClick={this.onCreateEvent.bind(this)}
              >
                +
              </button>{" "}
            </h4>
            <Nav>
              {this.state.eventItems}
              {/* <Nav.Link href="register">Manage Events</Nav.Link>*/}
          {/*<button type="button" className="btn btn-outline-info manage">
                Manage Events
              </button>
            </Nav>*/}
        </Sidebar>
        <div className="main-container">
          <div className="main">
            <h1 className="dashboard-orgs">About</h1>
            <p>{this.state.org.description}</p>
          </div>
          <div className="main">
            <h1 className="dashboard-events">Events</h1>
            <p>{this.state.org.description}</p>
          </div>
          <div className="main">
            <h1 className="dashboard-friends">Members</h1>
            <p>{this.state.org.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OrganizationPage);
