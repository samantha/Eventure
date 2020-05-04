import React, { Component } from "react";

class OrganizationPage extends Component {
  render() {
    return <div>{this.props.match.params.handle}</div>;
  }
}

export default OrganizationPage;
