import React, { Component } from "react";

class UserPage extends Component {
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}

export default UserPage;
