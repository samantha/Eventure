import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

//library.add(faHome),

/// COMPONENTS ///
import Home from "./components/home";
import TopNav from "./components/topnav";
import Dashboard from "./components/dashboard";
import EventPage from "./components/eventpage";
import Settings from "./components/settings";
import OrganizationPage from "./components/organizationpage";

function App() {
  return (
    <Router>
      <Route path="/" exact component = {Dashboard} />
      <Route path="/event" component={EventPage} />
      <Route path="/settings" component={Settings} />
      <Route path="/organization" component={OrganizationPage} />
    </Router>
  );
}

export default App;
