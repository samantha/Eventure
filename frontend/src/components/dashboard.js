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
library.add(faUserCircle, faHouseUser);

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: props.user,
      orgItems: null,
      eventItems: null,
      isVisible: false,
    };
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
            elementum est eget mauris varius vulputate. Orci varius natoque
            penatibus et magnis dis parturient montes, nascetur ridiculus mus.
            Nullam sagittis, sapien vulputate vehicula pharetra, nisi nibh
            mollis dolor, sit amet porta tortor ex ac dui. Maecenas accumsan, mi
            a imperdiet tincidunt, nisl ante ultricies tortor, sit amet accumsan
            nisi leo et urna. Etiam est lorem, consequat id arcu sit amet,
            egestas egestas eros. Proin finibus, est eget malesuada ultrices,
            sapien nisi pretium ante, quis rutrum sapien est id ligula.
            Curabitur interdum sagittis accumsan. Morbi ut malesuada justo, eget
            dapibus leo. Etiam metus tortor, dapibus eget elementum id, volutpat
            eu enim. Nulla rutrum odio elit, in finibus purus pretium nec.
            Aenean et cursus nulla, quis semper velit. Vestibulum sit amet quam
            purus. Donec ut tempor diam. Proin vitae egestas lectus. Nullam vel
            dui turpis. Duis lobortis, quam ac tristique congue, quam massa
            convallis lectus, id tempus velit nulla non nisl. Phasellus
            venenatis eros eu molestie pretium. Sed condimentum nisi ut quam
          </p>
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
