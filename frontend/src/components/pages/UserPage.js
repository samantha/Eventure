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
import ReportForm from "../../components/forms/ReportForm";

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
  faPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faEdit, faFlag, faUserCircle, faHouseUser, faPlus, faCheck);

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
      reportVisible: false,
      numAttendedEvents: 0,
      numJoinedOrgs: 0,
      numFriends: 0,
      allAchievements: [],
      isFriend: false,
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
    this.reportUser = this.reportUser.bind(this);
    this.verifyFriendship = this.verifyFriendship.bind(this);
    this.makeFriendship = this.makeFriendship.bind(this);
    this.cancelFriendship = this.cancelFriendship.bind(this);
    this.manageOrgs = this.manageOrgs.bind(this);
    this.manageEvents = this.manageEvents.bind(this);
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
    // console.log("get friends");
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
          // item.forEach((element) => console.log(element));
          // const orgItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            user: item[0],
          });
          // console.log(this.state.user);
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
    // console.log("get achievements");
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
          // console.log(this.state.allAchievements);
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
    // console.log("num friends");
    // console.log(this.props.match.params.username);
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
          // console.log(this.state.numFriends);
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
    // console.log(filtered);
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
    // console.log(filtered);
    return filtered;
  }

  filterFriendNum(achievement) {
    var filtered = achievement.num_to_achieve <= this.state.numFriends;
    // console.log(filtered);
    // console.log(this.state.numFriends);
    return filtered;
  }

  editProfile() {
    this.props.history.push("/settings/profile");
  }

  reportUser() {
    this.setState({
      reportVisible: true,
    });
    console.log(this.state.reportVisible);
  }

  openModal() {
    this.setState((prevState) => ({ reportVisible: !prevState.show }));
  }
  closeModal(e) {
    if (e.target.id === "modal") {
      this.setState({ reportVisible: false });
    }
  }

  verifyFriendship() {
    fetch("http://localhost:3000/verifyfriendship", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.currentUser.username,
        friendname: this.props.match.params.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item) && item.length) {
          this.setState({
            isFriend: true,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  makeFriendship = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/friendships", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.currentUser.username,
        friendname: this.props.match.params.username,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    this.setState({
      isFriend: true,
    });
    // window.location.reload(false);
  };

  cancelFriendship = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/friendships", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.currentUser.username,
        friendname: this.props.match.params.username,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    this.setState({ isFriend: false });
    // window.location.reload(false);
  };
  manageOrgs() {
    this.props.history.push("/manage-orgs");
  }

  manageEvents() {
    this.props.history.push("/manage-events");
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
    this.verifyFriendship();
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
          <UserCard member={friend} user={this.state.currentUser} />
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
        <div>
          <Button
            className="edit"
            color="secondary"
            onClick={() => this.openModal()}
          >
            Report User <FontAwesomeIcon icon={faFlag} />
          </Button>
          {this.state.reportVisible && (
            <div id="modal" onClick={(e) => this.closeModal(e)}>
              <div className="modal-box">
                <h1>Report User.</h1>
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

    let friendshipStatus;
    if (this.state.isFriend) {
      friendshipStatus = (
        <Button
          outline
          className="friendship"
          color="primary"
          onClick={this.cancelFriendship}
        >
          Friends <FontAwesomeIcon icon={faCheck} />
        </Button>
      );
    } else if (
      !this.state.isFriend &&
      this.state.currentUser.username !== this.props.match.params.username
    ) {
      friendshipStatus = (
        <div className="sidebar-container">
          <Button
            className="friendship"
            color="primary"
            onClick={this.makeFriendship}
          >
            Add Friend <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      );
    }

    let displayedOrgs;
    if (this.state.orgItems) {
      displayedOrgs = this.state.orgItems;
    }
    // else{
    //   displayedOrgs = (<p>No organizations yet!</p>)
    // }

    let displayedEvents;
    console.log(this.state.eventItems);
    if (this.state.eventItems) {
      displayedEvents = this.state.eventItems;
    }
    // else{
    //   displayedEvents = (<p>No events yet!</p>)
    // }

    let manageOrg, createOrg, manageEvent, createEvent;
    if (this.state.currentUser.username === this.props.match.params.username) {
      manageOrg = (
        <button
          type="button"
          className="btn btn-info manage"
          onClick={this.manageOrgs}
        >
          Manage Organizations
        </button>
      );
      createEvent = (
        <button
          type="button"
          className="btn btn-info"
          onClick={this.onCreateEvent.bind(this)}
        >
          +
        </button>
      );
      createOrg = (
        <button
          type="button"
          className="btn btn-info"
          onClick={this.onCreateOrg.bind(this)}
        >
          +
        </button>
      );
      manageEvent = (
        <button
          type="button"
          className="btn btn-info manage"
          onClick={this.manageEvents}
        >
          Manage Events
        </button>
      );
    }

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
          <div className="center">{friendshipStatus}</div>
          <div className="sidebar-container">
            <h4>
              {" "}
              {this.state.user.first}'s Organizations {createOrg}
            </h4>
            <Nav>
              {displayedOrgs}
              {/*<Nav.Link href="register">Manage Organizations</Nav.Link>}*/}
              {manageOrg}
            </Nav>
          </div>
          <div className="sidebar-container">
            <h4>
              {" "}
              {this.state.user.first}'s Events {createEvent}
            </h4>
            <Nav>
              {displayedEvents}
              {/* <Nav.Link href="register">Manage Events</Nav.Link>*/}
              {manageEvent}
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
