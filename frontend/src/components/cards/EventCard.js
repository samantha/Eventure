import React, { Component } from "react";
import "../../styles/EventCard.css";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPlus, faCheck);

class EventCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isRSVPed: false,
    };
    this.verifyRSVP = this.verifyRSVP.bind(this);
    this.makeRSVP = this.makeRSVP.bind(this);
    this.cancelRSVP = this.cancelRSVP.bind(this);
  }

  verifyRSVP() {
    fetch("http://localhost:3000/verifyrsvp", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        event_handle: this.props.event.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item) && item.length) {
          this.setState({
            isRSVPed: true,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  makeRSVP = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/rsvps", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        event_handle: this.props.event.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item) && item.length) {
          this.setState({
            isRSVPed: true,
          });
          window.location.reload(false);
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  cancelRSVP = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/rsvps", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        event_handle: this.props.event.handle,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    this.setState({ isRSVPed: false });
    window.location.reload(false);
  };

  componentDidMount() {
    this.verifyRSVP();
  }

  render() {
    var oldDate = new Date(Date.parse(this.props.event.from_date));
    var newDate = oldDate.toDateString();

    var oldTime = this.props.event.start_time.split(":");
    if (oldTime[0] < 12) {
      oldTime[2] = "AM";
    } else {
      oldTime[2] = "PM";
      oldTime[0] = parseInt(oldTime[0]) - 12;
      if (oldTime[0] === 0) {
        oldTime[0] = 12;
      }
    }
    var newTime = oldTime[0] + ":" + oldTime[1] + " " + oldTime[2];

    let event_image;
    if (this.props.event.icon !== "" && this.props.event.icon != null) {
      event_image = this.props.event.icon;
    } else {
      event_image =
        "https://images.unsplash.com/photo-1458852535794-f5552aa49872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    let rsvpStatus;
    if (this.state.isRSVPed) {
      rsvpStatus = (
        <Button
          outline
          className="rsvp"
          color="primary"
          onClick={this.cancelRSVP}
        >
          Going <FontAwesomeIcon icon={faCheck} />
        </Button>
      );
    } else {
      rsvpStatus = (
        <Button className="rsvp" color="primary" onClick={this.makeRSVP}>
          RSVP <FontAwesomeIcon icon={faPlus} />
        </Button>
      );
    }

    return (
      <div className="event-card-container">
        <Card>
          <a href={"/e/" + this.props.event.handle}>
            <CardImg top width="100%" src={event_image} />
          </a>
          <CardBody>
            <CardText>
              {newDate}, {newTime}
            </CardText>
            <CardTitle>
              {" "}
              <a href={"/e/" + this.props.event.handle}>
                {this.props.event.name}
              </a>
            </CardTitle>
            <div className="card-button">
              <span>{rsvpStatus}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventCard;
