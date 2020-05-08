import React, { Component } from "react";
import "../../styles/UserCard.css";

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

class UserCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      isFriend: false,
    };
    this.verifyFriendship = this.verifyFriendship.bind(this);
    this.makeFriendship = this.makeFriendship.bind(this);
    this.cancelFriendship = this.cancelFriendship.bind(this);
  }

  verifyFriendship() {
    fetch("http://localhost:3000/verifyfriendship", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        friendname: this.props.member.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item) && item.length) {
          this.setState({
            isFriend: true,
          });
          // console.log(this.state.allOrgs);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  makeFriendship = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/friendships", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        friendname: this.props.member.username,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    this.setState({
      isFriend: true,
    });
    // window.location.reload(false);
  };

  cancelFriendship = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/friendships", {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
        friendname: this.props.member.username,
      }),
    })
      .then((response) => response.json())
      .catch((err) => console.log(err));

    this.setState({ isFriend: false });
    // window.location.reload(false);
  };

  componentDidMount() {
    this.verifyFriendship();
  }

  render() {
    let member_image;
    if (this.props.member.icon !== "" && this.props.member.icon != null) {
      member_image = this.props.member.icon;
    } else {
      member_image =
        "https://images.unsplash.com/photo-1543589923-78e35f728335?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60";
    }

    let friendshipStatus;
    if (this.state.isFriend) {
      friendshipStatus = (
        <Button
          outline
          className="friendship"
          color="primary"
          onClick={this.cancelFriendship}
        >
          Friends <FontAwesomeIcon icon={faCheck} />
        </Button>
      );
    } else {
      friendshipStatus = (
        <Button
          className="friendship"
          color="primary"
          onClick={this.makeFriendship}
        >
          Add Friend <FontAwesomeIcon icon={faPlus} />
        </Button>
      );
    }

    return (
      <div className="member-card-container">
        <Card>
          <a href={"/u/" + this.props.member.username}>
            <CardImg top width="100%" src={member_image} />
          </a>
          <CardBody>
            <CardText className="member-handle">
              @{this.props.member.username}
            </CardText>
            <CardTitle>
              {" "}
              <a href={"/u/" + this.props.member.username}>
                {this.props.member.first} {this.props.member.last}
              </a>
            </CardTitle>
            <div className="card-button">
              <span>{friendshipStatus}</span>
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default UserCard;
