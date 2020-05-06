import React, { Component } from "react";
import "../../styles/AchievementCard.css";

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

class AchievementCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      achievement: this.props.achievement,
    };
  }

  render() {
    return (
      <div className="member-card-container">
        <Card>
          <CardImg top width="100%" src={this.state.achievement.image} />
          <CardBody>
            <CardTitle>{this.state.achievement.description}</CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default AchievementCard;
