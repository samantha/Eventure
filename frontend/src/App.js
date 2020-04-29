import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import ModalForm from './components/modals/ModalForm.js'

/// COMPONENTS ///
import Navigation from "./components/navbar";
import Home from "./components/home";
import CreateEvent from "./components/create-event_archive";
import SignUp from "./components/signup_archive";
import Test from "./components/test";
import Register from "./components/register";
import LogIn from "./components/login";
/*var auth = require('./auth'); // looks at index.js
*/


function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component = {Home} />
      <Route path="/create" component = {CreateEvent} />
      <Route path="/signup" component = {SignUp} />
      <Route path="/test" component = {Test} />
      <Route path="/register" component = {Register} />
      <Route path="/login" component = {LogIn} />

    </Router>
  );
}

export default App;
