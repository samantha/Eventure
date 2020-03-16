import React, { Component } from "react";
import TopNav from "./topnav.js";
// import { Form, Row } from 'react-bootstrap/Form';
import '../settings.css';
// import AwesomeButton from 'react-awesome-button/src/components/AwesomeButton';

export default class Settings extends Component {
    render() {
      return (
        <div>            
            <TopNav/>
            <main id="settings">
              <section className="section">
                <h2>Account Information</h2>
                  <h3>Email</h3>
                  <p>JaneDoe@gmail.com</p>
                <form>
                  <h3>Change Password</h3>
                  <div className="form-group">
                    <div className="password-group">
                      <label for="old-password">Old Password </label>
                      <input type="password" name="old-password" />
                    </div>
                    <div className="password-group">
                      <label for="new-password">New Password </label>
                      <input type="password" name="new-password" />
                    </div>
                    <div className="password-group">
                      <label for="retyped-password">Confirm Password </label>
                      <input type="password" name="retyped-password" />
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary">Save</button>
                  {/* <AwesomeButton type="primary">Save</AwesomeButton> */}
                </form>
              </section>

              <section className="section">
                <h2>Email Preferences</h2>
                <form>
                  <div className="form-group custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="event-reminder"></input>
                    <label for="event-reminder" className="custom-control-label">Upcoming Event Reminders</label>
                    <small id="">Remind me when events I'm RSVP'd to are coming up</small>
                  </div>
                  <div className="form-group custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="message-notification"></input>
                    <label for="message-notification" className="custom-control-label">Messages</label>
                    <small id="">Notify me when there's a message in my inbox</small>
                  </div>
                  <div className="form-group custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="achievement-notification"></input>
                    <label for="achievement-notification" className="custom-control-label">Achievements</label>
                    <small id="">Email me when I level-up or earn a new badge</small>
                  </div>
                  <div className="form-group custom-control custom-switch">
                    <input type="checkbox" className="custom-control-input" id="general-updates"></input>
                    <label for="general-updates" className="custom-control-label">General Eventure updates</label>
                    <small id="">Announcements and recommendations from the Eventure team</small>
                  </div>
                </form>
              </section>
            </main>
        </div>
      );
    }
}