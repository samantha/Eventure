import React, { Component } from "react";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Sidebar from "../components/sidebar";
import "../styles/dashboard.css";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faHouseUser } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
import EventCard from "../components/cards/EventCard";
import OrganizationCard from "../components/cards/OrganizationCard";
import UserCard from "../components/cards/UserCard";

import { Container, Row, Col } from "reactstrap";
library.add(faUserCircle, faHouseUser);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      orgItems: null,
      eventItems: null,
      userFriends: null,
      upcomingEvents: [],
      allOrgs: [],
      allUsers: [],
      isVisible: false,
    };
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.getUserFriends = this.getUserFriends.bind(this);

    this.getUpcomingEvents = this.getUpcomingEvents.bind(this);
    this.getAllOrgs = this.getAllOrgs.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
    this.manageFriends = this.manageFriends.bind(this);
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  getAllUsers() {
    console.log("get users");
    fetch("http://localhost:3000/users", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (<Link to={'o/' + org.handle} />));
          this.setState({
            allUsers: item,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getAllOrgs() {
    console.log("get orgs");
    fetch("http://localhost:3000/orgs", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (<Link to={'o/' + org.handle} />));
          this.setState({
            allOrgs: item,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getUpcomingEvents() {
    fetch("http://localhost:3000/upcomingevents", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (<Link to={'o/' + org.handle} />));
          this.setState({
            upcomingEvents: item,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getUserFriends() {
    console.log("get friends");
    fetch("http://localhost:3000/userfriends", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (<Link to={'o/' + org.handle} />));
          const userFriends = item.map((friend) => (
            <div className="my-orgs">
              <a href={"/u/" + friend.username}>
                {friend.first} {friend.last}
              </a>
            </div>
          ));
          this.setState({
            userFriends: userFriends,
          });
          // console.log(this.state.allOrgs);
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
        username: this.state.user.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
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
        username: this.state.user.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
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

  manageFriends() {
    this.props.history.push("/u/" + this.state.user.username + "#friends");
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getUpcomingEvents();
    this.getAllOrgs();
    this.getUserOrgs();
    this.getUserFriends();
    this.getAllUsers();
    this.getUserEvents();
  }

  render() {
    let upComingEvents = this.state.upcomingEvents.map((event) => {
      return (
        <Col>
          <EventCard event={event} user={this.state.user} />
        </Col>
      );
    });

    let allOrgs = this.state.allOrgs.map((org) => {
      return (
        <Col>
          <OrganizationCard org={org} user={this.state.user} />
        </Col>
      );
    });

    let allOtherUsers = this.state.allUsers
      .filter((member) => member.username !== this.state.user.username)
      .map((member) => {
        return (
          <Col>
            <UserCard member={member} user={this.state.user} />
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
              <a href={"/u/" + this.props.user.username}>
                {this.props.user.first_name + " " + this.props.user.last_name}
              </a>
            </div>
          }
          handle={"@" + this.state.user.username}
        >
          <div className="sidebar-container">
            <h4>
              {" "}
              Your Organizations{" "}
              {/*  <button
                type="button"
                className="btn btn-info"
                onClick={this.onCreateOrg.bind(this)}
              >
                +
              </button>{" "} */}
            </h4>
            <Nav>
              {this.state.orgItems}
              {/*<Nav.Link href="register">Manage Organizations</Nav.Link>}*/}
              <button type="button" className="btn btn-info manage">
                Manage Organizations
              </button>
            </Nav>
          </div>
          <div className="sidebar-container">
            <h4>
              {" "}
              Your Events{" "}
              {/*   <button
                type="button"
                className="btn btn-info"
                onClick={this.onCreateEvent.bind(this)}
              >
                Create +
              </button>{" "} */}
            </h4>
            <Nav>
              {this.state.eventItems}
              {/* <Nav.Link href="register">Manage Events</Nav.Link>*/}
              <button type="button" className="btn btn-info manage">
                Manage Events
              </button>
            </Nav>
          </div>

          <div className="sidebar-container">
            <h4> Your Friends</h4>
            <Nav>
              {this.state.userFriends}
              <button
                type="button"
                className="btn btn-info manage"
                onClick={this.manageFriends}
              >
                Manage Friends
              </button>
            </Nav>
          </div>
        </Sidebar>
        <div className="main-container">
          <div className="main">
            <h1>
              <span id="upcoming-events" className="dashboard-events"></span>{" "}
              Upcoming Events{" "}
            </h1>
            <Container fluid>
              <Row>{upComingEvents}</Row>
            </Container>
          </div>
          <div className="main">
            <h1>
              <span id="explore-orgs" className="dashboard-orgs"></span> Explore
              Organizations{" "}
            </h1>
            <Container fluid>
              <Row>{allOrgs}</Row>
            </Container>
          </div>
          <div className="main">
            <h1>
              <span id="discover-friends" className="dashboard-friends"></span>{" "}
              Discover Friends{" "}
            </h1>
            <Container fluid>
              <Row>{allOtherUsers}</Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
