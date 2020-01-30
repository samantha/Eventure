import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

/// COMPONENTS ///
import Home from "./components/home";


function App() {
  return (
    <Router>
      <Route path="/" exact component = {Home} />
    </Router>
  );
}

export default App;
