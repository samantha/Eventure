import React from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Message } from "semantic-ui-react";
import "../../styles/signup.css";

class EditUserForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: this.props.user,
      deletedAccount: false,
    };
  }

  state = {
    formError: false,
    updated: false,
    username: this.props.user.username,
    first: this.props.user.first_name,
    last: this.props.user.last_name,
    email: this.props.user.email,
    password: this.props.user.password,
    icon: this.props.user.icon,
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    console.log(this.state.username);
    fetch("http://localhost:3000/users", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.username,
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password,
        icon: this.state.icon,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          console.log(item[0]);
          this.setState({
            user: item,
            updated: true,
          });
        } else {
          console.log("failure");
          this.setState({
            formError: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  onChangeUser = () => {
    this.state.isAuthenticated = false;
    // console.log("log out");
    const loggedOutUser = {
      email: "n/a",
      first_name: "n/a",
      last_name: "n/a",
      icon: "n/a",
      loggedIn: false,
    };
    // console.log(loggedOutUser);

    this.props.changeUser(loggedOutUser);
    this.setState({
      deletedAccount: true,
    });
  };

  deleteAccount = (item) => {
    let confirmDelete = window.confirm("Delete user forever?");
    if (confirmDelete) {
      fetch("http://localhost:3000/users", {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: item.username,
        }),
      })
        .then((response) => response.json())
        .then((item) => {
          if (!Array.isArray(item)) {
            this.onChangeUser();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.user) {
      const { username, first, last, email, password } = this.props.user;
      this.setState({ username, first, last, email, password });
    }
  }

  render() {
    // console.log(this.state.user);
    // console.log("hello")
    const updated = this.state.updated;
    let status;
    if (updated) {
      status = (
        <Alert color="success">
          Your profile was updated successfully!{" "}
          <a href={"/u/" + this.state.username} className="alert-link">
            Click here to view your profile page
          </a>
          .
        </Alert>
      );
    } else if (this.state.formError) {
      status = <Alert color="warning">Could not update user.</Alert>;
    } else if (this.state.deletedAccount) {
      status = (
        <Alert color="success">
          Your profile was deleted successfully!{" "}
          <a href={"/"} className="alert-link">
            Click here to return to homepage
          </a>
          .
        </Alert>
      );
    }
    return (
      <div className="signup-bg">
        <div className="event-container">
          <h1>Edit your profile.</h1>
          <Form onSubmit={this.submitFormEdit}>
            <FormGroup>
              <Label for="username">Username</Label>
              <Input
                type="text"
                required
                name="username"
                id="username"
                onChange={this.onChange}
                value={
                  this.state.username === null ? "" : this.state.user.username
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="first">First Name</Label>
              <Input
                type="text"
                required
                name="first"
                id="first"
                onChange={this.onChange}
                value={
                  this.state.first === null ? "" : this.state.user.first_name
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="last">Last Name</Label>
              <Input
                type="text"
                required
                name="last"
                id="last"
                onChange={this.onChange}
                value={
                  this.state.last === null ? "" : this.state.user.last_name
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                required
                name="email"
                id="email"
                onChange={this.onChange}
                value={this.state.email === null ? "" : this.state.user.email}
              />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                onChange={this.onChange}
                placeholder="Update password"
                value={this.state.password === null ? "" : this.state.password}
              />
            </FormGroup>

            <FormGroup>
              <Label for="icon">Profile Picture</Label>
              <Input
                type="text"
                name="icon"
                placeholder="Update profile picture"
                id="icon"
                onChange={this.onChange}
                value={this.state.icon === null ? "N/A" : this.state.user.icon}
              />
            </FormGroup>

            <div className="form-group">
              <input
                type="submit"
                value="Update Profile"
                className="initial btn btn-primary"
              />
              <Button
                className="initial btn btn-danger"
                onClick={() => this.deleteAccount(this.state.user)}
              >
                Delete Account
              </Button>
            </div>
            {status}
          </Form>
        </div>
      </div>
    );
  }
}

export default EditUserForm;
