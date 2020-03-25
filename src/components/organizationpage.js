import React, { Component } from "react";
import ReactDOM from "react-dom";
import TopNav from "./topnav.js";
import UpcomingEvents from "./upcomingevents.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle, faEnvelope, faFlag } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import Button from 'react-bootstrap/Button';
import '../organizationpage.css';
import { Link } from "react-router-dom";
import logo from '../icon.png';
// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';

export default class OrganizationPage extends Component {
    render() {
        return (
            <div>
                <TopNav/>
                <main id="organization-page">
                    <section id="top-half">
                        <div id="org-info">
                            <div id="top-section">
                                <img src={logo}></img>
                                <div id="top-section-text">
                                    <h1>Eventure</h1>
                                    <div>
                                        <button type="button" className="btn btn-primary eventure-blue interact-buttons">Join <FontAwesomeIcon icon={faPlusCircle}/></button>
                                        <button type="button" className="btn btn-primary eventure-blue interact-buttons">Contact <FontAwesomeIcon icon={faEnvelope} /></button>
                                        <button type="button" className="btn btn-primary eventure-blue interact-buttons">Report <FontAwesomeIcon icon={faFlag}/></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="org-description">
                            <p>Eventure is a web app that allows companies to easily create and track events, and lets individuals RSVP. The webapp is expected to be intuitive to use and appealing to attendees as they gather points and badges. The software will help the general public as well as enterprises create, advertise, and track attendance for their events. Our program will have attendance-based incentives for event-goers to increase engagement within different communities.</p>
                        </div>
                        <div id="social-links">
                            <button className="social-link">
                                <FontAwesomeIcon size="lg" color="white" icon={faFacebookF} />
                            </button>
                            <button className="social-link">
                                <FontAwesomeIcon size="lg" color="white" icon={faInstagram} />
                            </button>
                            <button className="social-link">
                                <FontAwesomeIcon size="lg" color="white"icon={faTwitter} />
                            </button>
                        </div>
                    </section>
                    <section id="events">
                        <UpcomingEvents id="organization-events"/>
                    </section>
                </main> 
            </div>
        );
    }
}