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
    this.setState({
      user: this.state.loggedInUser,
    });
  }

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

  // uploadFile(e) {
  //    let file = e.target.files[0];
  //     console.log(file.name);
  //    if (file)
  //      {
  //      let path = "img/" + file.name;
  //      console.log(path);
  //      this.setState({
  //    [e.target.name]: {path}
  //  });
  //    }
  //      // if (file) {
  //      //   let data = new FormData();
  //      //   data.append('file', file);
  //      //   console.log(data);
  //      //   // axios.post('/files', data)...
  //      // }

  //    };

  createOrg = (e) => {
    e.preventDefault();
    console.log("creating org");
    console.log(this.state.icon);
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
        icon: this.state.icon,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.assignMembership();
          // this.props.addItemToState(item[0]);
          // this.props.toggle();
        } else {
          console.log("failure");
          this.setState({
            creationError: true,
          });
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
          this.setState({
            orgCreated: true,
          });
          // this.props.addItemToState(item[0]);
          // this.props.toggle();
        } else {
          console.log("failure");
          this.setState({
            creationError: true,
          });
        }
      })
      .catch((err) => console.log(err));
  }

  invalidInput = (e) => {
    e.preventDefault();
    console.log("error");
  };

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
          Success! {this.state.name} has been created.{" "}
          <a href={"/o/" + this.state.handle} className="alert-link">
            View your organization page
          </a>{" "}
          or{" "}
          <a href="/create-org" className="alert-link">
            create another organization
          </a>
          .
        </Alert>
      );
    } else if (this.state.creationError) {
      status = <Alert color="warning">Could not create organization.</Alert>;
    }

    return (
      <div className="org-bg">
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
              <Label for="icon">Organization Icon Url</Label>
              <Input
                type="text"
                required
                name="icon"
                placeholder="Eg. https://upload.wikimedia.org/picnic-association.jpg"
                id="icon"
                onChange={this.onChange}
                value={this.state.icon === null ? "" : this.state.icon}
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
          {status}
        </div>
      </div>
    );
  }
}

CreateOrganization.propTypes = {
  user: PropTypes.object,
};
export default withRouter(CreateOrganization);
