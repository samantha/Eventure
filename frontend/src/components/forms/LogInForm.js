import React from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import "../../styles/login.css";

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoggedIn: false };
  }

  state = {
    email: "",
    password: "",
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  validateUser = (e) => {
    e.preventDefault();
    fetch("http://localhost:3000/auth", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          console.log("success");
          this.setState({ isLoggedIn: true });
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
    const isLoggedIn = this.state.isLoggedIn;
    let status;
    if (isLoggedIn) {
      status = <Alert color="success">You are now signed in.</Alert>;
    } else {
      status = (
        <Alert color="primary">
          Don't have an account?{" "}
          <a href="/register" className="alert-link">
            Register here
          </a>
          .
        </Alert>
      );
    }

    return (
      <div className="event-container">
        <h1>Continue your eventure here.</h1>
        <Form onSubmit={this.validateUser}>
          <FormGroup>
            <Label for="email">Email</Label>
            <Input
              type="email"
              required
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              id="password"
              onChange={this.onChange}
              value={this.state.password === null ? "" : this.state.password}
            />
          </FormGroup>
          <div className="form-group">
            <input type="submit" value="Log In" className="btn btn-primary" />
          </div>
          {status}
        </Form>
      </div>
    );
  }
}

export default LogIn;
