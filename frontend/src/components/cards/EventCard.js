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

class EventCard extends Component {
  constructor(props) {
    super();
  }

  render() {
    var oldDate = new Date(Date.parse(this.props.event.from_date));
    var newDate = oldDate.toDateString();
    console.log(newDate);

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
    console.log(newTime);

    let event_image;
    if (this.props.event.icon !== "" && this.props.event.icon != null) {
      event_image = this.props.event.icon;
    } else {
      event_image =
        "https://images.unsplash.com/photo-1458852535794-f5552aa49872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    return (
      <div className="card-container">
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
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default EventCard;
