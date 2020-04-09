import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';

/// COMPONENTS ///
import Navigation from "./components/navbar";
import Home from "./components/home";
import CreateEvent from "./components/create-event";
import SignUp from "./components/signup";



function App() {
  return (
    <Router>
      <Navigation />
      <Route path="/" exact component = {Home} />
      <Route path="/create" component = {CreateEvent} />
      <Route path="/signup" component = {SignUp} />

    </Router>
  );
}

export default App;
