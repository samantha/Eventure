import React, { useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { UserContext } from "./components/UserContext";
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

/*var auth = require('./auth'); // looks at index.js
 */

function App() {
  /*  const [value, setValue] = useState('hello from context');
   */ return (
    <Router>
      <Navigation />
      <UserContext.Provider value="hello">
        <Route path="/" exact component={Home} />
        <Route path="/create" component={CreateEvent} />
        <Route path="/test" component={Test} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={LogIn} />
        <Route path="/edit-event" component={EditEvent} />
      </UserContext.Provider>
    </Router>
  );
}

export default App;
