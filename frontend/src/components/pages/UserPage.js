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
import ModalForm from "../../components/modals/ModalForm";
import UserCard from "../../components/cards/UserCard";
import AchievementCard from "../../components/cards/AchievementCard";

import { Button, Container, Row, Col } from "reactstrap";

import "../../styles/dashboard.css";
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

class UserPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      currentUser: this.props.currentUser,
      orgItems: null,
      eventItems: null,
      userFriends: [],
      isVisible: false,
      numAttendedEvents: 0,
      numJoinedOrgs: 0,
      numFriends: 0,
      allAchievements: [],
      // items: []
    };
    this.getUser = this.getUser.bind(this);
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.getUserEvents = this.getUserEvents.bind(this);
    this.getUserFriends = this.getUserFriends.bind(this);
    this.getNumAttendedEvents = this.getNumAttendedEvents.bind(this);
    this.getNumJoinedOrgs = this.getNumJoinedOrgs.bind(this);
    this.getNumFriends = this.getNumFriends.bind(this);
    this.getAllAchievements = this.getAllAchievements.bind(this);
    this.filterEvents = this.filterEvents.bind(this);
    this.filterOrgs = this.filterOrgs.bind(this);
    this.filterFriends = this.filterFriends.bind(this);
    this.filterFriendNum = this.filterFriendNum.bind(this);
    this.editProfile = this.editProfile.bind(this);
  }

  // addItemToState = (item) => {
  //   this.setState(prevState => ({
  //     items: [...prevState.items, item]
  //   }))
  // }

  updateModal(isVisible) {
    this.state.isVisible = isVisible;
    this.forceUpdate();
  }

  getUserFriends() {
    console.log("get friends");
    fetch("http://localhost:3000/userfriends", {
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
          // item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (<Link to={'o/' + org.handle} />));
          this.setState({
            userFriends: item,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getUser() {
    // console.log("get user");
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
    // console.log("get user orgs");
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
          // item.forEach((element) => console.log(element));
          const orgItems = item.map((org) => (
            <div className="my-orgs">
              <a href={"/o/" + org.handle}>{org.name}</a>
            </div>
          ));
          this.setState({
            orgItems: orgItems,
          });
          // console.log(this.state.orgItems);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getUserEvents() {
    // console.log("get user events");
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
          // item.forEach((element) => console.log(element));
          const eventItems = item.map((event) => (
            <div className="my-orgs">
              <a href={"/e/" + event.handle}>{event.name}</a>
            </div>
          ));
          this.setState({
            eventItems: eventItems,
          });
          // console.log(this.state.eventItems);
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

  getAllAchievements() {
    console.log("get achievements");
    fetch("http://localhost:3000/achievements", {
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
            allAchievements: item,
          });
          console.log(this.state.allAchievements);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getNumAttendedEvents() {
    fetch("http://localhost:3000/eventcount", {
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
        if (Array.isArray(item) && item.length) {
          this.setState({
            numAttendedEvents: item[0].numberofevents,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getNumJoinedOrgs() {
    fetch("http://localhost:3000/orgcount", {
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
        if (Array.isArray(item) && item.length) {
          this.setState({
            numJoinedOrgs: item[0].numberoforgs,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getNumFriends() {
    console.log("num friends");
    console.log(this.props.match.params.username);
    fetch("http://localhost:3000/friendcount", {
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
        if (Array.isArray(item) && item.length) {
          this.setState({
            numFriends: item[0].numberoffriends,
          });
          console.log(this.state.numFriends);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  filterEvents(achievement) {
    var filtered =
      achievement.type === "events" &&
      achievement.num_to_achieve <= this.state.numAttendedEvents;
    console.log(filtered);
  }

  filterOrgs(achievement) {
    return (
      achievement.type === "orgs" &&
      achievement.num_to_achieve <= this.state.numJoinedOrgs
    );
  }

  filterFriends(achievement) {
    var filtered =
      achievement.type === "friends" &&
      achievement.num_to_achieve <= this.state.numFriends;
    console.log(filtered);
    return filtered;
  }

  filterFriendNum(achievement) {
    var filtered = achievement.num_to_achieve <= this.state.numFriends;
    console.log(filtered);
    console.log(this.state.numFriends);
    return filtered;
  }

  editProfile() {
    this.props.history.push("/settings/profile");
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getUser();
    this.getUserOrgs();
    this.getUserEvents();
    this.getUserFriends();
    this.getNumAttendedEvents();
    this.getNumJoinedOrgs();
    this.getNumFriends();
    this.getAllAchievements();
  }

  render() {
    let user_image;
    let picAchievement;

    if (this.state.user.icon !== "" && this.state.user.icon != null) {
      user_image = this.state.user.icon;
      picAchievement = this.state.allAchievements
        .filter((achievement) => achievement.name === "profile_pic")
        .map((achievement) => {
          return (
            <Col>
              <AchievementCard achievement={achievement} />
            </Col>
          );
        });
    } else {
      user_image =
        "https://images.unsplash.com/photo-1543589923-78e35f728335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    let userFriends = this.state.userFriends.map((friend) => {
      return (
        <Col>
          <UserCard member={friend} user={this.state.user} />
        </Col>
      );
    });

    let editProfile;
    if (this.state.user.username === this.state.currentUser.username) {
      editProfile = (
        <Button className="edit" color="primary" onClick={this.editProfile}>
          Edit Profile <FontAwesomeIcon icon={faEdit} />
        </Button>
      );
    } else {
      editProfile = (
        <Button className="edit" color="secondary" onClick={this.reportUser}>
          Report User <FontAwesomeIcon icon={faFlag} />
        </Button>
      );
    }

    let friendAchievements = this.state.allAchievements
      .filter(this.filterFriends)
      .map((achievement) => {
        return (
          <Col>
            <AchievementCard achievement={achievement} />
          </Col>
        );
      });

    let orgAchievements = this.state.allAchievements
      .filter(this.filterOrgs)
      .map((achievement) => {
        return (
          <Col>
            <AchievementCard achievement={achievement} />
          </Col>
        );
      });

    let eventAchievements = this.state.allAchievements
      .filter(this.filterEvents)
      .map((achievement) => {
        return (
          <Col>
            <AchievementCard achievement={achievement} />
          </Col>
        );
      });

    return (
      <div className="sidenav">
        <Sidebar
          side="left"
          isVisible={true}
          image={<img width="100%" src={user_image} />}
          name={
            <div>
              <FontAwesomeIcon icon={faHouseUser} />{" "}
              <a href={"/u/" + this.state.user.username}>
                {this.state.user.first + " " + this.state.user.last}
              </a>
            </div>
          }
          handle={"@" + this.state.user.username}
          edit={editProfile}
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
        <div className="main-container">
          <div className="main">
            <h1>
              <span id="achievements"></span> {this.state.user.first}'s
              Achievements{" "}
            </h1>
            <Container fluid>
              <Row>
                {picAchievement}
                {friendAchievements}
                {orgAchievements}
                {eventAchievements}
              </Row>
            </Container>

            <h1>
              <span id="friends"></span> {this.state.user.first}'s Friends{" "}
            </h1>
            <Container fluid>
              <Row>{userFriends}</Row>
            </Container>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(UserPage);
