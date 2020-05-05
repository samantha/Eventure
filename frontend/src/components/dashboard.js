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
import { Row, Col } from "reactstrap";
library.add(faUserCircle, faHouseUser);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      orgItems: null,
      eventItems: null,
      upcomingEvents: [],
      isVisible: false,
    };
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.getUpcomingEvents = this.getUpcomingEvents.bind(this);
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  getUpcomingEvents() {
    console.log("get orgs");
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
        username: this.state.user.username,
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
    // if item exists, populate the state with proper data
    this.getUpcomingEvents();
    this.getUserOrgs();
    this.getUserEvents();
  }

  render() {
    let upComingEvents = this.state.upcomingEvents.map((event) => {
      return (
        <Col>
          <EventCard event={event} />
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
              <button
                type="button"
                className="btn btn-info"
                onClick={this.onCreateOrg.bind(this)}
              >
                +
              </button>{" "}
            </h4>
            <Nav>
              {this.state.orgItems}
              {/*<Nav.Link href="register">Manage Organizations</Nav.Link>}*/}
              <button type="button" className="btn btn-outline-info manage">
                Manage Organizations
              </button>
            </Nav>
          </div>
          <div className="sidebar-container">
            <h4>
              {" "}
              Your Events{" "}
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
              <button type="button" className="btn btn-outline-info manage">
                Manage Events
              </button>
            </Nav>
          </div>
        </Sidebar>
        <div className="main">
          <h1 className="dashboard-events"> Upcoming Events </h1>
          <Row>{upComingEvents}</Row>
        </div>
        <div className="main">
          <h1 className="dashboard-orgs"> Explore Organizations </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            elementum est eget mauris varius vulputate. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Nullam sagittis, sapien vulputate vehicula pharetra, nisi nibh
            mollis dolor, sit amet porta tortor ex ac dui. Maecenas accumsan, mi
            a imperdiet tincidunt, nisl ante ultricies tortor, sit amet accumsan
            nisi leo et urna. Etiam est lorem, consequat id arcu sit amet,
            egestas egestas eros. Proin finibus, est eget malesuada ultrices,
            sapien nisi pretium ante, quis rutrum sapien est id ligula. metus,
            eleifend quis sodales eget, vehicula vel augue. Suspendisse at
            pellentesque lorem. Phasellus bibendum sodales consequat. Donec
          </p>
        </div>
        <div className="main">
          <h1 className="dashboard-friends"> Discover Friends </h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            elementum est eget mauris varius vulputate. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Nullam sagittis, sapien vulputate vehicula pharetra, nisi nibh
            mollis dolor, sit amet porta tortor ex ac dui. Maecenas accumsan, mi
            a imperdiet tincidunt, nisl ante ultricies tortor, sit amet accumsan
            nisi leo et urna. Etiam est lorem, consequat id arcu sit amet,
            egestas egestas eros. Proin finibus, est eget malesuada ultrices,
            sapien nisi pretium ante, quis rutrum sapien est id ligula. metus,
            eleifend quis sodales eget, vehicula vel augue. Suspendisse at
            pellentesque lorem. Phasellus bibendum sodales consequat. Donec
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(Dashboard);
