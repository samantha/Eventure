import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
// import "../styles/sidebar.css";

export default class ReportForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hide: false,
    };
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.setState({
      hide: true,
    });
    console.log(this.state.hide);
  }
  render() {
    return (
      <Modal show={this.props.show} onHide={this.state.hide} centered>
        <Modal.Header closeButton>
          <div className="header-block">
            <Modal.Title>heloo!!</Modal.Title>
          </div>
        </Modal.Header>
        <Modal.Body>{this.props.children}</Modal.Body>
        <Modal.Footer>
          <Button onClick={this.hideModal}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
