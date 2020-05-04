import React from "react";
import { Alert, Button, Form, FormGroup, Label, Input } from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// import { UserContext} from '../../components/UserContext';
// import UserSwitcher from './UserSwitcher';
import "../../styles/login.css";

class LogIn extends React.Component {
  // static contextType = UserContext;

  constructor(props) {
    super();
    this.state = {
      user: props.user,
    };
  }

  onChangeUser() {
    this.props.changeUser(this.state.loggedInUser);
    this.props.history.push("/dashboard");
    window.location.reload(false);
    console.log("set user");
    this.setState({
      user: this.state.loggedInUser,
    });
    console.log(this.state.user);
  }

  //   this.setUser = () => {
  //     this.setState(state => ({
  //       user: {
  //         email: this.state.email,
  //         first_name: this.state.first_name,
  //         last_name: this.state.last_name,
  //         loggedIn: this.state.isLoggedIn
  //       }
  //     }));
  //   };
  // };

  state = {
    loggedInUser: {},
    isLoggedIn: false,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    username: "",
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
          var obj = JSON.parse(JSON.stringify(item[0]));
          console.log(obj.first);
          console.log(obj.last);
          console.log(obj.email);
          console.log(obj.password);
          console.log("success");
          this.state.first_name = obj.first;
          this.state.last_name = obj.last;
          this.state.username = obj.username;
          this.setState({ isLoggedIn: true });
          this.onChangeUser();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { first, last, email, password } = this.props.item;
      this.setState({ first, last, email, password });
    }
  }

  render() {
    // const { user, setUser } = this.context;

    this.state.loggedInUser = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      username: this.state.username,
      loggedIn: this.state.isLoggedIn,
    };

    const isLoggedIn = this.state.isLoggedIn;
    let status;
    if (isLoggedIn) {
      status = (
        <Alert color="success">
          Welcome {this.state.loggedInUser.first_name}! You are now signed in.
        </Alert>
      );
      console.log(this.state.loggedInUser);
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
      <div className="bg">
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
      </div>
    );
  }
}

LogIn.propTypes = {
  user: PropTypes.object,
  changeUser: PropTypes.func,
};
export default withRouter(LogIn);
