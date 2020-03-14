import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome } from '@fortawesome/fontawesome-free';
import EventPage from "./components/eventpage";

//library.add(faHome),

/// COMPONENTS ///
import Home from "./components/home";
import Dashboard from "./components/eventpage";

function App() {
  return (
    
    <Router>
      <Route path="/" exact component = {Dashboard} />
    </Router>
  );
}

export default App;
