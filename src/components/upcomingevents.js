import React, { Component } from "react";
import TopNav from "./topnav.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendar, faClock, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../upcomingevents.css';
import { Link } from "react-router-dom";

export default class UpcomingEvents extends Component {
    render() {
      return (
        <div>
            <main>
              <h1>UPCOMING EVENTS</h1>
              <section className="event-tiles">
                <Link to="/event">
                  <section className="tile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                    <section className="event-details">
                      <h2>Event Name</h2>
                      <p>Organization</p>
                      <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                      <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                    </section>
                  </section>
                  </Link>
                  <Link to="/event">
                  <section className="tile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                    <section className="event-details">
                      <h2>Event Name</h2>
                      <p>Organization</p>
                      <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                      <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                    </section>
                  </section>
                  </Link>
                  <Link to="/event">
                  <section className="tile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                    <section className="event-details">
                      <h2>Event Name</h2>
                      <p>Organization</p>
                      <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                      <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                    </section>
                  </section>
                  </Link>
                  <Link to="/event">
                  <section className="tile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                    <section className="event-details">
                      <h2>Event Name</h2>
                      <p>Organization</p>
                      <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                      <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                    </section>
                  </section>
                  </Link>
                  <Link to="/event">
                  <section className="tile">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Golden_Gate_Bridge_at_sunset_1.jpg/1600px-Golden_Gate_Bridge_at_sunset_1.jpg"></img>
                    <section className="event-details">
                      <h2>Event Name</h2>
                      <p>Organization</p>
                      <p><FontAwesomeIcon icon={faCalendar}/><time datetime=""> Date</time></p>
                      <p><FontAwesomeIcon icon={faClock}/><time datetime=""> Time</time></p>
                      <p><FontAwesomeIcon icon={faMapMarkerAlt}/> Location</p>
                    </section>
                  </section>
                  </Link>
              </section>
            </main>
        </div>
      );
    }
}