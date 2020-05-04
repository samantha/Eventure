import React, { Component } from "react";

class EventPage extends Component {
  render() {
    return <div>{this.props.match.params.handle}</div>;
  }
}

export default EventPage;
