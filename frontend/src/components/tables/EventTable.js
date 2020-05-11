import React, { Component } from "react";
import { Table, Button } from "reactstrap";
// import ModalForm from '../modals/ModalForm'
import "../../styles/table.css";

class EventTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      eventItems: null,
    };
    this.getUserManagedEvents = this.getUserManagedEvents.bind(this);
    this.editEvent = this.editEvent.bind(this);
  }

  getUserManagedEvents() {
    console.log(this.props.user.username);
    fetch("http://localhost:3000/usermanagedevents", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.props.user.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // const eventItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            eventItems: item,
          });
          console.log(this.state.eventItems);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  deleteEvent = (item) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:3000/events", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          handle: item.handle,
        }),
      })
        .then((response) => response.json())
        .then((item) => {
          if (Array.isArray(item)) {
            this.getUserManagedEvents();
            window.location.reload(false);
          } else {
            console.log("failure");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  editEvent = (item) => {
    this.props.history.push("/settings/event/" + item.handle);
  };

  componentDidMount() {
    this.getUserManagedEvents();
  }

  render() {
    let items;
    if (this.state.eventItems) {
      console.log(this.state.eventItems);
      items = this.state.eventItems.map((item) => {
        return (
          <tr key={item.handle}>
            <th scope="row">{item.handle}</th>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>

            <td>
              <div style={{ width: "110px" }}>
                <Button color="warning" onClick={() => this.editEvent(item)}>
                  Edit
                </Button>{" "}
                <Button color="danger" onClick={() => this.deleteEvent(item)}>
                  Del
                </Button>
              </div>
            </td>
          </tr>
        );
      });
    }

    return (
      <Table responsive hover dark striped size="sm">
        <caption>Manage Events</caption>
        <thead>
          <tr>
            <th>Handle</th>
            <th>Name</th>
            <th>Description</th>
            <th>City</th>
            <th>State</th>
          </tr>
        </thead>
        <tbody>{items}</tbody>
      </Table>
    );
  }
}

export default EventTable;
