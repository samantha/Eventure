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

class EditOrgForm extends React.Component {
  // static contextType = UserContext;

  constructor(props) {
    super(props);
    this.state = {
      org_handle: this.props.match.params.handle,
      org: {},
    };
    this.getOrg = this.getOrg.bind(this);
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

  submitFormEdit = (e) => {
    e.preventDefault();
    console.log("updating org");
    console.log(this.state.icon);
    console.log(this.state.handle);
    fetch("http://localhost:3000/orgs", {
      method: "put",
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
        if (!Array.isArray(item)) {
          console.log("failure");
          this.setState({
            creationError: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  invalidInput = (e) => {
    e.preventDefault();
    console.log("error");
  };

  getOrg() {
    console.log("get org");
    fetch("http://localhost:3000/specificorg", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        handle: this.props.match.params.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.setState({
            org: item[0],
            orgCreated: true,
          });
          this.setState({
            name: this.state.org.name,
            description: this.state.org.description,
            city: this.state.org.city,
            state: this.state.org.state,
            handle: this.state.org.handle,
            icon: this.state.org.icon,
          });
          // console.log(this.state.org);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getOrg();
    // if (this.props.item) {
    //   const { name, description, city, state, handle, icon } = this.props.item;
    //   this.setState({ name, description, city, state, handle, icon });
    // }
  }

  render() {
    let status;
    if (this.state.orgCreated) {
      status = (
        <Alert color="success">
          Success! {this.state.name} has been updated.{" "}
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
      status = <Alert color="warning">Could not update organization.</Alert>;
    }

    return (
      <div className="org-bg">
        <div className="event-container">
          <h1>Form your tribe.</h1>
          <Form onSubmit={this.submitFormEdit}>
            <FormGroup>
              <Label for="name">Organization Name</Label>
              <Input
                type="text"
                required
                name="name"
                placeholder="Eg. Association of Picnic Enthusiasts"
                id="name"
                onChange={this.onChange}
                defaultValue={
                  this.state.name === null ? "" : this.state.org.name
                }
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
                defaultValue={
                  this.state.description === null
                    ? ""
                    : this.state.org.description
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
                defaultValue={
                  this.state.city === null ? "" : this.state.org.city
                }
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
                defaultValue={
                  this.state.state === null ? "" : this.state.org.state
                }
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
                defaultValue={
                  this.state.handle === null ? "" : this.state.org.handle
                }
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
                defaultValue={
                  this.state.icon === null ? "" : this.state.org.icon
                }
              />
            </FormGroup>

            <div className="form-group">
              <input
                type="submit"
                defaultValue="Create Organization"
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

EditOrgForm.propTypes = {
  user: PropTypes.object,
};
export default withRouter(EditOrgForm);
