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
    this.createOrg = this.createOrg.bind(this);
    this.assignMembership = this.assignMembership.bind(this);
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
    orgCreated: false,
    creationError: false,
    name: "",
    description: "",
    city: "",
    state: "",
    handle: "",
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
    fetch("http://localhost:3000/orgs", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        description: this.state.description,
        city: this.state.city,
        state: this.state.state,
        handle: this.state.handle,
        // icon: this.state.icon
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.assignMembership();
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
          this.state.creationError = true;
        }
      })
      .catch((err) => console.log(err));
  };

  assignMembership() {
    console.log("assigning membership");
    console.log(this.props.user);
    console.log(this.props.user.username);
    console.log(this.state.handle);
    fetch("http://localhost:3000/memberships", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        org_handle: this.state.handle,
        username: this.props.user.username,
        role: "admin",
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.state.orgCreated = true;
          this.props.addItemToState(item[0]);
          this.props.toggle();
        } else {
          console.log("failure");
          this.state.creationError = true;
        }
      })
      .catch((err) => console.log(err));
  }

  invalidInput = (e) => {
    e.preventDefault();
    console.log("error");
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
      const { name, description, city, state, handle, icon } = this.props.item;
      this.setState({ name, description, city, state, handle, icon });
    }
  }

  render() {
    let status;
    if (this.state.orgCreated) {
      status = (
        <Alert color="success">
          Success! {this.state.nam} has been created. Click here to{" "}
          <a href="/create-org" className="alert-link">
            create another organization
          </a>
          .
        </Alert>
      );
      console.log(this.state.loggedInUser);
    } else if (this.state.creationError) {
      status = <Alert color="warning">Could not create organization.</Alert>;
    }

    return (
      <div className="bg">
        <div className="event-container">
          <h1>Form your tribe.</h1>
          <Form onSubmit={this.createOrg.bind(this)}>
            <FormGroup>
              <Label for="name">Organization Name</Label>
              <Input
                type="text"
                required
                name="name"
                placeholder="Eg. Association of Picnic Enthusiasts"
                id="name"
                onChange={this.onChange}
                value={this.state.name === null ? "" : this.state.name}
              />
            </FormGroup>
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                required
                name="description"
                placeholder="Eg. We love to have picnics. Anywhere. Anytime."
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
                placeholder="Eg. Los Angeles"
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
                placeholder="Eg. California"
                id="state"
                onChange={this.onChange}
                value={this.state.state === null ? "" : this.state.state}
              />
            </FormGroup>

            <FormGroup>
              <Label for="handle">Organization Handle</Label>
              <Input
                type="text"
                required
                name="handle"
                placeholder="Eg. picnic-association"
                id="handle"
                onChange={this.onChange}
                value={this.state.handle === null ? "" : this.state.handle}
              />
              <FormText>
                Enter a unique handle to help others find you. No whitespaces.
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
              <input
                type="submit"
                value="Create Organization"
                className="btn btn-primary"
              />
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
