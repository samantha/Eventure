import React, { Component } from "react";
import ReactDOM from "react-dom";
import TopNav from "./topnav.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../dashboard.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default class Dashboard extends Component {
    render() {
      return (
        <Router>
          <div>            
              <TopNav/>
              <main>
                <h1>UPCOMING EVENTS</h1>
                <section class="event-tiles">
                    <section class="tile">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                      <section class="event-details">
                        <h2>Event Name</h2>
                        <p>Organization</p>
                        <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                        <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                      </section>
                    </section>
                    <section class="tile">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                      <section class="event-details">
                        <h2>Event Name</h2>
                        <p>Organization</p>
                        <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                        <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                      </section>
                    </section>
                    <section class="tile">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                      <section class="event-details">
                        <h2>Event Name</h2>
                        <p>Organization</p>
                        <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                        <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                      </section>
                    </section>
                    <section class="tile">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                      <section class="event-details">
                        <h2>Event Name</h2>
                        <p>Organization</p>
                        <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                        <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                      </section>
                    </section>
                    <section class="tile">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                      <section class="event-details">
                        <h2>Event Name</h2>
                        <p>Organization</p>
                        <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                        <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                        <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                      </section>
                    </section>
                </section>
              </main>            
          </div>
        </Router>
      );
    }
}