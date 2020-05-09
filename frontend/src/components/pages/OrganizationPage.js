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
import { Row, Col, Container } from "reactstrap";
import "../../styles/dashboard.css";
import { SocialMediaIconsReact } from "social-media-icons-react";

import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import EventCard from "../../components/cards/EventCard";
import UserCard from "../../components/cards/UserCard";

library.add(faUserCircle, faHouseUser);

class OrganizationPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      org: {},
      events: [],
      members: [],
      user: this.props.currentUser,
    };
    this.getOrg = this.getOrg.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.getMembers = this.getMembers.bind(this);
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

  getEvents() {
    console.log("get all events");
    fetch("http://localhost:3000/events", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.setState({
            events: item,
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

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getOrg();
    this.getEvents();
    this.getMembers();
  }

  render() {
    let org_image;
    if (this.state.org.icon !== "" && this.state.org.icon != null) {
      org_image = this.state.org.icon;
    } else {
      org_image =
        "https://images.unsplash.com/photo-1543589923-78e35f728335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    var current_date = new Date();
    console.log(current_date);
    console.log(this.state.events[0]);

    let upcomingEvents = this.state.events
      .filter((event) => event.org_handle === this.state.org.handle)
      .filter((event) => new Date(event.from_date) >= current_date)
      .map((event) => {
        return (
          <Col>
            <EventCard event={event} user={this.state.user} />
          </Col>
        );
      });

    let pastEvents = this.state.events
      .filter((event) => event.org_handle === this.state.org.handle)
      .filter((event) => new Date(event.from_date) < current_date)
      .map((event) => {
        return (
          <Col>
            <EventCard event={event} user={this.state.user} />
          </Col>
        );
      });

    let orgMembers = this.state.members
      .filter((member) => member.org_handle === this.state.org.handle)
      .map((member) => {
        return (
          <Col>
            <UserCard member={member} user={this.state.user} />
          </Col>
        );
      });

    console.log(upcomingEvents.length);

    if (!upcomingEvents.length) {
      upcomingEvents = <div>No events to display!</div>;
    }

    if (!pastEvents.length) {
      pastEvents = <div>No events to display!</div>;
    }

    return (
      <div className="sidenav">
        <Sidebar
          side="left"
          isVisible={true}
          name={
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
                <img src={org_image} />
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
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="4"
                  borderStyle="solid"
                  icon="twitter"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(28,186,223,1)"
                  iconSize="5"
                  roundness="15%"
                  url="https://some-website.com/my-social-media-url"
                  size="50"
                />
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="4"
                  borderStyle="solid"
                  icon="instagram"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(188,42,141,1)"
                  iconSize="5"
                  roundness="15%"
                  url="https://some-website.com/my-social-media-url"
                  size="50"
                />
                <SocialMediaIconsReact
                  borderColor="rgba(0,0,0,0.25)"
                  borderWidth="4"
                  borderStyle="solid"
                  icon="facebook"
                  iconColor="rgba(255,255,255,1)"
                  backgroundColor="rgba(59,89,152,1)"
                  iconSize="5"
                  roundness="15%"
                  url="https://some-website.com/my-social-media-url"
                  size="50"
                />
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
            <h1 className="dashboard-events">Upcoming Events</h1>
            <Container fluid>
              <Row>{upcomingEvents}</Row>
            </Container>

            <h1 className="dashboard-events">Past Events</h1>
            <Container fluid>
              <Row>{pastEvents}</Row>
            </Container>

            <h1 className="dashboard-friends">Members</h1>
            <Container fluid>
              <Row>{orgMembers}</Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(OrganizationPage);
