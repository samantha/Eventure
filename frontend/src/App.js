import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import ModalForm from "./components/modals/ModalForm.js";

/// COMPONENTS ///
import Navigation from "./components/navbar";
import Home from "./components/home";
import CreateEvent from "./components/create-event_archive";
import Test from "./components/test";
import Register from "./components/forms/SignUpForm";
import LogIn from "./components/forms/LogInForm";
import EditEvent from "./components/editevent_archive";
import Dashboard from "./components/dashboard";

/*var auth = require('./auth'); // looks at index.js
 */
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        email: "n/a",
        first_name: "n/a",
        last_name: "n/a",
        loggedIn: false,
      },
    };
  }

  onChangeUser(newUser) {
    this.setState({
      user: newUser,
    });

    localStorage.setItem("info", JSON.stringify(this.state.user));
  }

  render() {
    // var user = { email: 'n/a', first_name: 'n/a', last_name: 'n/a', loggedIn: false };
    var storedUser = JSON.parse(localStorage.getItem("info"));
    var currentUser = storedUser ? storedUser : this.state.user;

    return (
      <Router>
        <Navigation
          user={currentUser}
          changeUser={this.onChangeUser.bind(this)}
        />
        <Route path="/" exact component={Home} />
        <Route path="/create" component={CreateEvent} />
        <Route path="/test" component={Test} />
        <Route path="/register" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        {/*<Route path="/login" component={LogIn} user={this.state.user} changeUser={this.onChangeUser.bind(this)}/>*/}
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
