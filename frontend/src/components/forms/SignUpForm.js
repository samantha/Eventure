import React from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { Message } from "semantic-ui-react";
import "../../styles/login.css";

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSignupClick = this.handleSignupClick.bind(this);
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
    this.state = { isLoggedIn: false };
    this.state = { isSignedUp: false };
  }

  handleSignupClick() {
    this.setState({ isSignedUp: true });
  }

  handleLoginClick() {
    this.setState({ isLoggedIn: true });
  }

  handleLogoutClick() {
    this.setState({ isLoggedIn: false });
  }

  state = {
    formError: false,
    formSuccess: false,
    first: "",
    last: "",
    email: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitFormAdd = (e) => {
    this.setState({ isSignedUp: true });
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  submitFormEdit = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/users", {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { first, last, email, password } = this.props.item;
      this.setState({ first, last, email, password });
    }
  }

  render() {
    const isSignedUp = this.state.isSignedUp;
    let status;
    if (isSignedUp) {
      status = (
        <Alert color="success">
          User registration was successful! You may now log in.{" "}
          <a href="/login" className="alert-link">
            Click here to log in
          </a>
          .
        </Alert>
      );
    } else {
      status = (
        <Alert color="primary">
          Already have an account?{" "}
          <a href="/login" className="alert-link">
            Log in here
          </a>
          .
        </Alert>
      );
    }
    return (
      <div className="event-container">
        <h1>Start your eventure here.</h1>
        <Form
          onSubmit={this.props.item ? this.submitFormEdit : this.submitFormAdd}
        >
          <FormGroup>
            <Label for="first">First Name</Label>
            <Input
              type="text"
              required
              name="first"
              id="first"
              onChange={this.onChange}
              value={this.state.first === null ? "" : this.state.first}
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
              value={this.state.last === null ? "" : this.state.last}
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
              value={this.state.email === null ? "" : this.state.email}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input
              type="password"
              required
              name="password"
              id="password"
              onChange={this.onChange}
              value={this.state.password === null ? "" : this.state.password}
            />
          </FormGroup>
          <p>By creating an account you agree to our Terms & Conditions.</p>
          <div className="form-group">
            <input type="submit" value="Sign Up" className="btn btn-primary" />
          </div>
          {status}
        </Form>
      </div>
    );
  }
}

export default SignUpForm;
