import React from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormFeedback,
  FormText,
  CustomInput,
} from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// import { UserContext} from '../../components/UserContext';
// import UserSwitcher from './UserSwitcher';
import "../../styles/CreateOrgForm.css";

class CreateOrganization extends React.Component {
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
    name: "",
    description: "",
    city: "",
    state: "",
    link: "",
    icon: "",
  };

  onChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  createOrg = (e) => {
    e.preventDefault();
    console.log("creating org");
  };

  /*  validateUser = (e) => {
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
      };*/

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    if (this.props.item) {
      const { name, description, city, state, link, icon } = this.props.item;
      this.setState({ name, description, city, state, link, icon });
    }
  }

  render() {
    // let status;
    // if (isLoggedIn) {
    //   status = (
    //     <Alert color="success">
    //       Welcome {this.state.loggedInUser.first_name}! You are now signed in.
    //     </Alert>
    //   );
    //   console.log(this.state.loggedInUser);
    // } else {
    //   status = (
    //     <Alert color="primary">
    //       Don't have an account?{" "}
    //       <a href="/register" className="alert-link">
    //         Register here
    //       </a>
    //       .
    //     </Alert>
    //   );
    // }

    return (
      <div className="bg">
        <div className="event-container">
          <h1>Create your tribe.</h1>
          <Form onSubmit={this.createOrg}>
            <FormGroup>
              <Label for="name">Organization Name</Label>
              <Input
                type="text"
                required
                name="name"
                placeholder="Association of Picnic Enthusiasts"
                id="name"
                onChange={this.onChange}
                value={this.state.name === null ? "" : this.state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                required
                name="description"
                placeholder="We love to have picnics. Anywhere. Anytime."
                id="description"
                onChange={this.onChange}
                value={
                  this.state.description === null ? "" : this.state.description
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="city">City</Label>
              <Input
                type="text"
                required
                name="city"
                placeholder="Los Angeles"
                id="city"
                onChange={this.onChange}
                value={this.state.city === null ? "" : this.state.city}
              />
            </FormGroup>
            <FormGroup>
              <Label for="state">State</Label>
              <Input
                type="text"
                required
                name="state"
                placeholder="California"
                id="state"
                onChange={this.onChange}
                value={this.state.state === null ? "" : this.state.state}
              />
            </FormGroup>

            <FormGroup>
              <Label for="link">Organization Handle</Label>
              <Input
                type="text"
                required
                name="link"
                placeholder="picnic-association"
                id="link"
                onChange={this.onChange}
                value={this.state.link === null ? "" : this.state.link}
              />
              <FormText>
                Enter a unique handle to help others find you.
              </FormText>
            </FormGroup>

            <FormGroup>
              <Label for="icon">Organization Banner</Label>
              <CustomInput
                type="file"
                id="icon"
                name="icon"
                label="Upload organization's banner."
              />
            </FormGroup>

            <div className="form-group">
              <input type="submit" value="Log In" className="btn btn-primary" />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CreateOrganization.propTypes = {
  user: PropTypes.object,
};
export default withRouter(CreateOrganization);
