import React, { Component } from "react";

class OrganizationPage extends Component {
  render() {
    return <div>{this.props.match.params.id}</div>;
  }
}

export default OrganizationPage;
