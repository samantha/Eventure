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
      orgItems: null,
      eventItems: null,
      isVisible: false,
    };
    this.getEvent = this.getEvent.bind(this);
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
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
          item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            event: item[0],
          });
          console.log(this.state.event);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getUserOrgs() {
    console.log("get user orgs");
    fetch("http://localhost:3000/userorgs", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.props.match.params.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          item.forEach((element) => console.log(element));
          const orgItems = item.map((org) => (
            <div className="my-orgs">
              <a href={"/o/" + org.handle}>{org.name}</a>
            </div>
          ));
          this.setState({
            orgItems: orgItems,
          });
          console.log(this.state.orgItems);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getUserEvents() {
    console.log("get user events");
    fetch("http://localhost:3000/userevents", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.props.match.params.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          item.forEach((element) => console.log(element));
          const eventItems = item.map((event) => (
            <div className="my-orgs">
              <a href={"/e/" + event.handle}>{event.name}</a>
            </div>
          ));
          this.setState({
            eventItems: eventItems,
          });
          console.log(this.state.eventItems);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  onCreateOrg() {
    this.props.history.push("/create-org");
  }

  onCreateEvent() {
    this.props.history.push("/create-event");
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exis populate the state with proper data
    this.getEvent();
    this.getUserOrgs();
    this.getUserEvents();
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
            <p>{this.state.event.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(EventPage);
