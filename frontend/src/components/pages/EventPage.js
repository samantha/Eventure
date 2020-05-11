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
import "../../styles/ReportForm.css";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faFlag,
  faUserCircle,
  faHouseUser,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";

library.add(faEdit, faFlag, faUserCircle, faHouseUser);

class EventPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
      currentUser: this.props.currentUser,
      attendees: [],
      members: [],
      reportVisible: false,
    };
    this.getEvent = this.getEvent.bind(this);
    this.getAttendees = this.getAttendees.bind(this);
    this.getMembers = this.getMembers.bind(this);
    this.editEvent = this.editEvent.bind(this);
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

  getMembers() {
    console.log("get all members");
    fetch("http://localhost:3000/memberships", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.setState({
            members: item,
          });
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  formatTime(time) {
    var event_time = time.split(":");
    if (event_time[0] < 12) {
      event_time[2] = "AM";
    } else {
      event_time[2] = "PM";
      event_time[0] = parseInt(event_time[0]) - 12;
      if (event_time[0] === 0) {
        event_time[0] = 12;
      }
    }
    event_time = event_time[0] + ":" + event_time[1] + " " + event_time[2];
    return event_time;
  }

  editEvent() {
    this.props.history.push("/settings/event/" + this.state.event.handle);
  }

  openModal() {
    this.setState((prevState) => ({ reportVisible: !prevState.show }));
  }
  closeModal(e) {
    if (e.target.id === "modal") {
      this.setState({ reportVisible: false });
    }
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exis populate the state with proper data
    this.getEvent();
    this.getAttendees();
    this.getMembers();
  }

  render() {
    let event_image;
    if (this.state.event.icon && this.state.event.icon !== "") {
      event_image = this.state.event.icon;
    } else {
      event_image =
        "https://images.unsplash.com/photo-1458852535794-f5552aa49872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    let eventAttendees = this.state.attendees.map((attendee) => {
      return (
        <Col>
          <UserCard member={attendee} user={this.state.currentUser} />
        </Col>
      );
    });

    var oldDate = new Date(Date.parse(this.state.event.from_date));
    var event_date = oldDate.toDateString();
    console.log(this.state.event.start_time);
    var start_time = this.state.event.start_time;
    var end_time = this.state.event.end_time;
    if (start_time) {
      start_time = this.formatTime(start_time);
    }

    if (end_time) {
      end_time = this.formatTime(end_time);
    }

    let editEvent;
    // verify if user is an admin
    let admins = this.state.members.filter(
      (member) =>
        member.username === this.state.currentUser.username &&
        member.role === "admin" &&
        member.org_handle === this.state.event.org_handle
    );
    console.log(admins);
    if (admins.length) {
      editEvent = (
        <Button className="edit" color="primary" onClick={this.editEvent}>
          Edit Event <FontAwesomeIcon icon={faEdit} />
        </Button>
      );
    } else {
      editEvent = (
        <div>
          <Button
            className="edit"
            color="secondary"
            onClick={() => this.openModal()}
          >
            Report Event <FontAwesomeIcon icon={faFlag} />
          </Button>
          {this.state.reportVisible && (
            <div id="modal" onClick={(e) => this.closeModal(e)}>
              <div className="modal-box">
                <h1>Report Event.</h1>
                <div class="form-group">
                  <label for="exampleFormControlTextarea1">
                    Help us understand the problem. What is going on?
                  </label>
                  <textarea
                    class="form-control"
                    id="exampleFormControlTextarea1"
                    placeholder="Type problem here."
                    rows="3"
                  ></textarea>
                </div>
                <div className="modal-report-footer">
                  <Button>Submit</Button>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div className="sidenav">
        <Sidebar
          side="left"
          isVisible={true}
          name={
            <div>
              <FontAwesomeIcon icon={faHouseUser} />{" "}
              <a href={"/e/" + this.state.event.handle}>
                {this.state.event.name}
              </a>
            </div>
          }
          image={<img width="100%" src={event_image} />}
          handle={"@" + this.state.event.handle}
          edit={editEvent}
        >
          <div>
            <div className="sidebar-container">
              <div className="left-details">Event Name:</div>
              <div className="left">{this.state.event.name}</div>
              <div className="left-details">Start Date:</div>
              <div className="left">{event_date}</div>
              <div className="left-details">End Date:</div>
              <div className="left">{event_date}</div>
              <div className="left-details">Time: </div>
              <div className="left">
                {start_time} to {end_time}
              </div>

              <div className="left-details">Location: </div>
              <div className="left">{this.state.event.street}</div>
              <div className="left">
                {this.state.event.city}
                {", "}
                {this.state.event.state} {this.state.event.zipcode}
              </div>
              <div className="left-details">Hosted By: </div>
              <a href={"/o/" + this.state.event.org_handle}>
                <div className="left">@{this.state.event.org_handle}</div>
              </a>
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
