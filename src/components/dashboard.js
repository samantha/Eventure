import React, { Component } from "react";
import TopNav from "./topnav.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../dashboard.css';
import { Link } from "react-router-dom";
import UpcomingEvents from "./upcomingevents.js";

export default class Dashboard extends Component {
    render() {
      return (
        <div>            
            <TopNav/>
            <main>
              <UpcomingEvents />
            </main>
        </div>
      );
    }
}