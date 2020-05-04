import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styles/sidebar.css";

export default class Sidebar extends Component {
  render() {
    return (
      <Modal className="menu-sidebar left" show={this.props.isVisible}>
        <Modal.Header>
          <Modal.Title>{this.props.header}</Modal.Title>
          <Modal.Title className="handle">{this.props.handle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
      </Modal>
    );
  }
}
