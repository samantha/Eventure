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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faPlus, faCheck);

class OrganizationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isMember: false,
    };
    this.verifyMembership = this.verifyMembership.bind(this);
  }

  verifyMembership() {
    fetch("http://localhost:3000/verifymembership", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        org_handle: this.props.org.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item) && item.length) {
          this.setState({
            isMember: true,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    this.verifyMembership();
  }

  render() {
    let org_image;
    if (this.props.org.icon !== "" && this.props.org.icon != null) {
      org_image = this.props.org.icon;
    } else {
      org_image =
        "https://images.unsplash.com/photo-1458852535794-f5552aa49872?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    let membershipStatus;
    if (this.state.isMember) {
      membershipStatus = (
        <Button outline color="primary">
          Joined <FontAwesomeIcon icon={faCheck} />
        </Button>
      );
    } else {
      membershipStatus = (
        <Button color="primary">
          Join <FontAwesomeIcon icon={faPlus} />
        </Button>
      );
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
            <div className="card-button">{membershipStatus}</div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default OrganizationCard;
