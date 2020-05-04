// class UserPage extends Component {
//   render() {
//     return <div>{this.props.match.params.username}</div>;
//   }
// }

// export default UserPage;

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

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      orgItems: null,
      eventItems: null,
      isVisible: false,
    };
    this.getUser = this.getUser.bind(this);
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
  }
  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  getUser() {
    console.log("get user");
    fetch("http://localhost:3000/specificuser", {
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
          // const orgItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            user: item[0],
          });
          console.log(this.state.user);
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
    // if item exists, populate the state with proper data
    this.getUser();
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
              <a href={"/u/" + this.state.user.username}>
                {this.state.user.first + " " + this.state.user.last}
              </a>
            </div>
          }
          handle={"@" + this.state.user.username}
        >
          <div className="sidebar-container">
            <h4>
              {" "}
              {this.state.user.first}'s Organizations{" "}
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
              {this.state.user.first}'s Events{" "}
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
          <h1 className="dashboard-achievements">
            {" "}
            {this.state.user.first}'s Achievements{" "}
          </h1>
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
            pharetra lobortis vel interdum erat. Ut elit lorem, congue non urna
            id, ultricies consequat mauris. Aliquam posuere, metus ut luctus
            dictum, nisl neque vestibulum ipsum, ultrices ullamcorper magna orci
            sit amet mi. Nulla facilisi. Nullam eget congue dolor, a dictum
            mauris. Proin rutrum ligula eu est fermentum, et porta enim
            sollicitudin. Ut semper congue vehicula. Fusce fermentum ultrices
            ligula, varius gravida metus ultrices non. Nam eros eros, aliquet
            vitae diam eget, facilisis volutpat felis. Etiam id purus viverra,
            finibus nunc a, dictum orci. Sed facilisis, tortor eget porta
            tincidunt, ex libero facilisis quam, eget sollicitudin nisl augue
            quis turpis. Donec vehicula ex lectus, a laoreet tellus rutrum in.
            Praesent consequat lacus eu nisl viverra blandit. Aliquam felis
            metus, eleifend quis sodales eget, vehicula vel augue. Suspendisse
            at pellentesque lorem. Phasellus bibendum sodales consequat. Donec
            quis turpis neque. Donec felis ex, porttitor vel suscipit nec,
            faucibus sit amet purus. Aenean dapibus feugiat odio nec rutrum.
            Proin sit amet dolor convallis, faucibus nulla et, sagittis eros.
            Duis sed luctus neque. Proin ac sem massa. Duis nibh nunc, blandit
            mattis sagittis in, rutrum a dui. Maecenas at mauris tincidunt,
            suscipit nisi eu, tincidunt turpis. Pellentesque vel laoreet sapien.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Etiam magna magna, congue in lobortis vel,
            finibus sit amet ex. Vestibulum molestie pellentesque tortor sed
            scelerisque. Maecenas consequat id libero id bibendum. Suspendisse
            nec nibh eget purus pulvinar imperdiet in et leo. Donec venenatis
            tellus a dolor semper ullamcorper. Donec finibus pharetra placerat.
            Suspendisse ex dui, condimentum eget congue eu, pharetra at elit.
            Nam commodo quam ac mauris viverra tempor. Ut ultrices nisl sed
            turpis iaculis placerat. Nulla a erat ut augue hendrerit vulputate.
            Nunc mattis nisi vel eleifend sollicitudin.
          </p>
        </div>
        <div className="main">
          <h1 className="dashboard-friends">
            {" "}
            {this.state.user.first}'s Friends{" "}
          </h1>
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
            pharetra lobortis vel interdum erat. Ut elit lorem, congue non urna
            id, ultricies consequat mauris. Aliquam posuere, metus ut luctus
            dictum, nisl neque vestibulum ipsum, ultrices ullamcorper magna orci
            sit amet mi. Nulla facilisi. Nullam eget congue dolor, a dictum
            mauris. Proin rutrum ligula eu est fermentum, et porta enim
            sollicitudin. Ut semper congue vehicula. Fusce fermentum ultrices
            ligula, varius gravida metus ultrices non. Nam eros eros, aliquet
            vitae diam eget, facilisis volutpat felis. Etiam id purus viverra,
            finibus nunc a, dictum orci. Sed facilisis, tortor eget porta
            tincidunt, ex libero facilisis quam, eget sollicitudin nisl augue
            quis turpis. Donec vehicula ex lectus, a laoreet tellus rutrum in.
            Praesent consequat lacus eu nisl viverra blandit. Aliquam felis
            metus, eleifend quis sodales eget, vehicula vel augue. Suspendisse
            at pellentesque lorem. Phasellus bibendum sodales consequat. Donec
            quis turpis neque. Donec felis ex, porttitor vel suscipit nec,
            faucibus sit amet purus. Aenean dapibus feugiat odio nec rutrum.
            Proin sit amet dolor convallis, faucibus nulla et, sagittis eros.
            Duis sed luctus neque. Proin ac sem massa. Duis nibh nunc, blandit
            mattis sagittis in, rutrum a dui. Maecenas at mauris tincidunt,
            suscipit nisi eu, tincidunt turpis. Pellentesque vel laoreet sapien.
            Orci varius natoque penatibus et magnis dis parturient montes,
            nascetur ridiculus mus. Etiam magna magna, congue in lobortis vel,
            finibus sit amet ex. Vestibulum molestie pellentesque tortor sed
            scelerisque. Maecenas consequat id libero id bibendum. Suspendisse
            nec nibh eget purus pulvinar imperdiet in et leo. Donec venenatis
            tellus a dolor semper ullamcorper. Donec finibus pharetra placerat.
            Suspendisse ex dui, condimentum eget congue eu, pharetra at elit.
            Nam commodo quam ac mauris viverra tempor. Ut ultrices nisl sed
            turpis iaculis placerat. Nulla a erat ut augue hendrerit vulputate.
            Nunc mattis nisi vel eleifend sollicitudin.
          </p>
        </div>
      </div>
    );
  }
}

export default withRouter(UserPage);
