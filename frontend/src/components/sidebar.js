import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import "../styles/sidebar.css";

export default class Sidebar extends Component {
  render() {
    return (
      <Modal className="menu-sidebar left" show={this.props.isVisible}>
        <Modal.Header>
          <div className="header-block">
            <Modal.Title>
              {this.props.image}
              {this.props.name}
              {this.props.handle}
              {this.props.edit}
            </Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
      </Modal>
    );
  }
}
