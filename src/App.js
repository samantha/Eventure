import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

/// COMPONENTS ///
import Home from "./components/home";
import CreateEvent from "./components/create-event";


function App() {
  return (
    <Router>
      <Route path="/" exact component = {Home} />
      <Route path="/create" component = {CreateEvent} />

    </Router>
  );
}

export default App;
