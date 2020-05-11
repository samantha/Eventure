import React, { Component } from "react";
import { Table, Button } from "reactstrap";
// import ModalForm from '../modals/ModalForm'
import "../../styles/table.css";

class OrganizationTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      orgItems: null,
    };
    this.getUserManagedOrgs = this.getUserManagedOrgs.bind(this);
    this.editOrg = this.editOrg.bind(this);
  }

  getUserManagedOrgs() {
    console.log(this.props.user.username);
    fetch("http://localhost:3000/usermanagedorgs", {
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
          // const orgItems = item.map((org) => (
          //   <div className="my-orgs">
          //     <a href={"/o/" + org.handle}>{org.name}</a>
          //   </div>
          // ));
          this.setState({
            orgItems: item,
          });
          console.log(this.state.orgItems);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  deleteOrg = (item) => {
    let confirmDelete = window.confirm("Delete item forever?");
    if (confirmDelete) {
      fetch("http://localhost:3000/orgs", {
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
            this.getUserManagedOrgs();
          } else {
            console.log("failure");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  editOrg = (item) => {
    this.props.history.push("/settings/org/" + item.handle);
  };

  componentDidMount() {
    this.getUserManagedOrgs();
  }

  render() {
    let items;
    if (this.state.orgItems) {
      console.log(this.state.orgItems);
      items = this.state.orgItems.map((item) => {
        return (
          <tr key={item.handle}>
            <th scope="row">{item.handle}</th>
            <td>{item.name}</td>
            <td>{item.description}</td>
            <td>{item.city}</td>
            <td>{item.state}</td>

            <td>
              <div style={{ width: "110px" }}>
                <Button color="warning" onClick={() => this.editOrg(item)}>
                  Edit
                </Button>{" "}
                <Button color="danger" onClick={() => this.deleteOrg(item)}>
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
        <caption>Manage Organizations</caption>
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

export default OrganizationTable;
