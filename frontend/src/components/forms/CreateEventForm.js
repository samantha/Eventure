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
  Row,
  Col,
} from "reactstrap";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";

// import { UserContext} from '../../components/UserContext';
// import UserSwitcher from './UserSwitcher';
import "../../styles/CreateEventForm.css";

class CreateEvent extends React.Component {
  // static contextType = UserContext;

  constructor(props) {
    super();
    // this.getUserOrgs();

    this.state = {
      user: props.user,
      orgItems: null,
    };

    this.createOrg = this.createOrg.bind(this);
    this.assignMembership = this.assignMembership.bind(this);
    this.getUserOrgs = this.getUserOrgs.bind(this);
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
    userOrgsFound: false,
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

  getUserOrgs() {
    console.log("get user orgs");
    fetch("http://localhost:3000/userorgs", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: this.state.user.username,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          item.forEach((element) => console.log(element));
          const orgItems = item.map((org) => (
            <option key={org.handle}>{org.name}</option>
          ));
          this.setState({
            orgItems: orgItems,
          });
          console.log(this.state.orgItems);
          return orgItems;
          //       let optionItems = obj.map((item) =>
          //     <option key={item.array}>{item.array}</option>
          // );
          // var obj = JSON.parse(JSON.stringify(item[0]));
          // console.log(obj.handle);
          // console.log(obj.name);
          // console.log(obj.email);
          // console.log(obj.password);
          // console.log("success");
          // this.state.first_name = obj.first;
          // this.state.last_name = obj.last;
          // this.state.username = obj.username;
          // this.setState({ isLoggedIn: true });
          // this.onChangeUser();
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

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
    this.getUserOrgs();
    if (this.props.item) {
      const { name, description, city, state, handle, icon } = this.props.item;
      this.setState({ name, description, city, state, handle, icon });
    }
  }

  render() {
    // console.log("helllo")

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
      <div className="event-bg">
        <div className="event-container">
          <h1>Create an event.</h1>
          <Form onSubmit={this.createOrg.bind(this)}>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="name">Event Name</Label>
                  <Input
                    type="text"
                    required
                    name="name"
                    placeholder="Eg. Picnic"
                    id="name"
                    onChange={this.onChange}
                    value={this.state.name === null ? "" : this.state.name}
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="handle">Event Handle</Label>
                  <Input
                    type="text"
                    required
                    name="handle"
                    placeholder="Eg. picnic"
                    id="handle"
                    onChange={this.onChange}
                    value={this.state.handle === null ? "" : this.state.handle}
                  />
                  <FormText>
                    Enter a unique handle to help others find your event. No
                    whitespaces.
                  </FormText>
                </FormGroup>
              </Col>
            </Row>
            <FormGroup>
              <Label for="exampleSelect">Organization hosting your event</Label>
              <Input
                type="select"
                name="select"
                id="exampleSelect"
                placeholder="Choose an organization..."
              >
                {this.state.orgItems}
              </Input>
            </FormGroup>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Start Date</Label>
                  <Input type="date" name="city" id="exampleCity" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">Start Time</Label>
                  <Input type="time" name="state" id="exampleState" />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">End Date</Label>
                  <Input type="date" name="city" id="exampleCity" />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">End Time</Label>
                  <Input type="time" name="state" id="exampleState" />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="description">Description</Label>
                  <Input
                    type="textarea"
                    required
                    name="description"
                    placeholder="Eg. Picnic at the beach."
                    id="description"
                    onChange={this.onChange}
                    value={
                      this.state.description === null
                        ? ""
                        : this.state.description
                    }
                  />
                </FormGroup>
              </Col>

              <Col md={6}>
                <FormGroup>
                  <Label for="description">Cancellation Policy</Label>
                  <Input
                    type="textarea"
                    required
                    name="description"
                    placeholder="Eg. If you cancel, we will be sad."
                    id="description"
                    onChange={this.onChange}
                    value={
                      this.state.description === null
                        ? ""
                        : this.state.description
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">Address</Label>
                  <Input
                    type="text"
                    name="city"
                    id="exampleCity"
                    placeholder="1234 Main St"
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleState">Address 2</Label>
                  <Input
                    type="text"
                    name="state"
                    id="exampleState"
                    placeholder="Apartment, studio, or floor"
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="exampleCity">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="exampleCity"
                    placeholder="Eg. Los Angeles"
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="exampleState">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="exampleState"
                    placeholder="Eg. California"
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="exampleZip">Zip</Label>
                  <Input
                    type="text"
                    name="zip"
                    id="exampleZip"
                    placeholder="Eg. 91053"
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="icon">Event Banner</Label>
              <CustomInput
                type="file"
                id="icon"
                name="icon"
                label="Upload event's banner."
              />
            </FormGroup>

            <div className="form-group">
              <input
                type="submit"
                value="Create Event"
                className="btn btn-primary"
              />
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

CreateEvent.propTypes = {
  user: PropTypes.object,
};
export default withRouter(CreateEvent);
