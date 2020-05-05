import React, { Component } from "react";
import "../../styles/OrganizationCard.css";

import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
} from "reactstrap";

class OrganizationCard extends Component {
  constructor(props) {
    super();
  }

  render() {
    let org_image;
    if (this.props.org.icon !== "" && this.props.org.icon != null) {
      org_image = this.props.org.icon;
    } else {
      org_image =
        "https://images.unsplash.com/photo-1458852535794-f5552aa49872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    return (
      <div className="card-container">
        <Card>
          <a href={"/o/" + this.props.org.handle}>
            <CardImg top width="100%" src={org_image} />
          </a>
          <CardBody>
            <CardText className="org-handle">@{this.props.org.handle}</CardText>
            <CardTitle>
              {" "}
              <a href={"/o/" + this.props.org.handle}>{this.props.org.name}</a>
            </CardTitle>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default OrganizationCard;
