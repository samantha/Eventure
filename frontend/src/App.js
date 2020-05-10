import React, { useState } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import ModalForm from "./components/modals/ModalForm.js";

/// COMPONENTS ///
import Navigation from "./components/navbar";
import Home from "./components/home";
// import CreateEvent from "./components/create-event_archive";
import Test from "./components/test";
import Register from "./components/forms/SignUpForm";
import EditUserForm from "./components/forms/EditUserForm";
import LogIn from "./components/forms/LogInForm";
import EditEvent from "./components/editevent_archive";
import Dashboard from "./components/dashboard";
import ChatLobby from "./components/chatlobby";
import CreateOrganization from "./components/forms/CreateOrganizationForm";
import CreateEvent from "./components/forms/CreateEventForm";
import UserPage from "./components/pages/UserPage";
import EventPage from "./components/pages/EventPage";
import OrganizationPage from "./components/pages/OrganizationPage";

/*var auth = require('./auth'); // looks at index.js
 */
class App extends React.Component {
  constructor(props) {
    super();
    this.state = {
      allUsers: [],
      allEvents: [],
      allOrgs: [],
      user: {
        email: "n/a",
        username: "n/a",
        first_name: "n/a",
        last_name: "n/a",
        loggedIn: false,
      },
    };
    this.getOrgs = this.getOrgs.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.getEvents = this.getEvents.bind(this);
  }

  getOrgs() {
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

  getUsers() {
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
          // console.log(this.state.allUsers);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  getEvents() {
    console.log("get events");
    fetch("http://localhost:3000/events", {
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
            allEvents: item,
          });
          // console.log(this.state.allEvents);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  onChangeUser(newUser) {
    this.setState({
      user: newUser,
    });

    localStorage.setItem("info", JSON.stringify(this.state.user));
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getOrgs();
    this.getUsers();
    this.getUsers();
  }

  render() {
    // var user = { email: 'n/a', first_name: 'n/a', last_name: 'n/a', loggedIn: false };
    var storedUser = JSON.parse(localStorage.getItem("info"));
    var currentUser = storedUser ? storedUser : this.state.user;

    return (
      <Router>
        {this.state.allOrgs.map((org) => (
          <Link to={"/o/" + org.handle} />
        ))}

        {this.state.allUsers.map((user) => (
          <Link to={"/u/" + user.username} />
        ))}

        {this.state.allEvents.map((event) => (
          <Link to={"/e/" + event.handle} />
        ))}

        <Navigation
          user={currentUser}
          changeUser={this.onChangeUser.bind(this)}
        />
        <Route path="/" exact component={Home} />
        <Route
          path="/o/:handle"
          render={(props) => (
            <OrganizationPage {...props} currentUser={currentUser} />
          )}
        />
        <Route
          path="/u/:username"
          render={(props) => <UserPage {...props} currentUser={currentUser} />}
        />
        <Route
          path="/e/:handle"
          render={(props) => <EventPage {...props} currentUser={currentUser} />}
        />

        <Route path="/test" component={Test} />
        <Route path="/register" component={Register} />
        <Route
          path="/dashboard"
          render={(props) => <Dashboard {...props} user={currentUser} />}
        />

        <Route
          path="/lobby"
          render={(props) => <ChatLobby {...props} user={currentUser} />}
        />

        <Route
          path="/create-org"
          render={(props) => (
            <CreateOrganization {...props} user={currentUser} />
          )}
        />

        <Route
          path="/create-event"
          render={(props) => <CreateEvent {...props} user={currentUser} />}
        />

        <Route
          path="/edit-profile"
          render={(props) => <EditUserForm {...props} user={currentUser} />}
        />

        <Route
          path="/login"
          render={(props) => (
            <LogIn {...props} changeUser={this.onChangeUser.bind(this)} />
          )}
        />

        <Route path="/edit-event" component={EditEvent} />
      </Router>
    );
  }
}

export default App;
