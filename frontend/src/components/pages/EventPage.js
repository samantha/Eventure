// class EventPage extends Component {
//   render() {
//     return <div>{this.props.match.params.username}</div>;
//   }
// }

// export default EventPage;

import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Sidebar from "../../components/sidebar";
import SocialMedia from "../../components/SocialMedia";
import UserCard from "../../components/cards/UserCard";
import { Button, Container, Row, Col } from "reactstrap";

import "../../styles/dashboard.css";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faUserCircle, faHouseUser);

class EventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      currentUser: this.props.currentUser,
      attendees: [],
    };
    this.getEvent = this.getEvent.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
  }

  getAttendees() {
    console.log("get all events");
    fetch("http://localhost:3000/eventattendees", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        event_handle: this.props.match.params.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.setState({
            attendees: item,
          });
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getEvent() {
    console.log("get event");
    fetch("http://localhost:3000/specificevent", {
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
          // const orgItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            event: item[0],
          });
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exis populate the state with proper data
    this.getEvent();
    this.getAttendees();
  }

  render() {
    let eventAttendees = this.state.attendees.map((attendee) => {
      return (
        <Col>
          <UserCard member={attendee} user={this.state.currentUser} />
        </Col>
      );
    });

    return (
      <div className="sidenav">
        <Sidebar
          side="left"
          isVisible={true}
          header={
            <div>
              <FontAwesomeIcon icon={faHouseUser} />{" "}
              <a href={"/e/" + this.state.event.handle}>
                {this.state.event.name}
              </a>
            </div>
          }
          handle={"@" + this.state.event.handle}
        >
          <div>
            <div className="sidebar-container">
              <div className="center">
                <img src={this.state.event.icon} />
              </div>

              <div className="center">{this.state.event.from_date}</div>
              <div className="center">{this.state.event.street}</div>
              <div className="center">
                {this.state.event.city}
                {", "}
                {this.state.event.state} {this.state.event.zipcode}
              </div>
            </div>
            <div className="sidebar-container">
              <div className="center">
                <h1>Share Event</h1>
                <SocialMedia />
              </div>
            </div>
          </div>
        </Sidebar>
        <div className="main-container">
          <div className="main">
            <h1 className="dashboard-events">Description</h1>
            <p>{this.state.event.description}</p>
          </div>
          <div className="main">
            <h1 className="dashboard-orgs">Cancellation Policy</h1>
            <p>{this.state.event.cancellation_policy}</p>
          </div>
          <div className="main">
            <h1 className="dashboard-friends">Attendees</h1>
            <Container fluid>
              <Row>{eventAttendees}</Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EventPage);
