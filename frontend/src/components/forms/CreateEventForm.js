import React from "react";
import {
  Alert,
  Form,
  FormGroup,
  Label,
  Input,
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

    this.createEvent = this.createEvent.bind(this);
    this.assignTags = this.assignTags.bind(this);
    this.getUserOrgs = this.getUserOrgs.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  state = {
    name: "",
    from_date: null,
    to_date: null,
    start_time: null,
    end_time: null,
    description: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    org_handle: "",
    cancellation_policy: "",
    handle: "",
    tags: "",
  };

  onChange = (e) => {
    console.log(this.state.org_handle);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  onSelect(e) {
    console.log("selection made");
    const selectedIndex = e.target.options.selectedIndex;
    console.log(selectedIndex);
    console.log(e.target.options[selectedIndex].value);
    this.setState({
      org_handle: e.target.options[selectedIndex].value,
    });
    console.log(this.state.org_handle);
  }

  getUserOrgs() {
    console.log("get user orgs");
    fetch("http://localhost:3000/usermanagedorgs", {
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
            <option key={org.handle} value={org.handle}>
              {org.name}
            </option>
          ));
          this.setState({
            orgItems: orgItems,
          });
          console.log(this.state.orgItems);
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  }

  createEvent = (e) => {
    e.preventDefault();
    console.log("creating event");
    console.log(this.state.org_handle);
    fetch("http://localhost:3000/events", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: this.state.name,
        from_date: this.state.from_date,
        to_date: this.state.to_date,
        start_time: this.state.start_time,
        end_time: this.state.end_time,
        description: this.state.description,
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        zipcode: this.state.zipcode,
        org_handle: this.state.org_handle,
        cancellation_policy: this.state.cancellation_policy,
        handle: this.state.handle,
      }),
    })
      .then((response) => response.json())
      .then((item) => {
        if (Array.isArray(item)) {
          this.assignTags();
          // this.props.addItemToState(item[0]);
          // this.props.toggle();
          console.log("create events!");
        } else {
          console.log("failure");
        }
      })
      .catch((err) => console.log(err));
  };

  assignTags() {
    console.log("assigning tags");
    var tags = this.state.tags.trim().split(",");
    console.log(tags);
    tags.forEach((tag) =>
      fetch("http://localhost:3000/tags", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tag: tag,
          handle: this.state.handle,
        }),
      })
        .then((response) => response.json())
        .then((item) => {
          if (Array.isArray(item)) {
            // this.props.addItemToState(item[0]);
            // this.props.toggle();
            console.log("added tags!");
          } else {
            console.log("failure");
          }
        })
    );
  }

  invalidInput = (e) => {
    e.preventDefault();
    console.log("error");
  };

  componentDidMount() {
    // get and set currently logged in user to state
    // if item exists, populate the state with proper data
    this.getUserOrgs();
    if (this.props.item) {
      const {
        name,
        from_date,
        to_date,
        start_time,
        end_time,
        description,
        street,
        city,
        state,
        zipcode,
        banner,
        org_handle,
        cancellation_policy,
        handle,
      } = this.props.item;
      this.setState({
        name,
        from_date,
        to_date,
        start_time,
        end_time,
        description,
        street,
        city,
        state,
        zipcode,
        banner,
        org_handle,
        cancellation_policy,
        handle,
      });
    }
  }

  render() {
    // console.log("helllo")

    // let status;
    // if (this.state.orgCreated) {
    //   status = (
    //     <Alert color="success">
    //       Success! {this.state.nam} has been created. Click here to{" "}
    //       <a href="/create-org" className="alert-link">
    //         create another organization
    //       </a>
    //       .
    //     </Alert>
    //   );
    //   console.log(this.state.loggedInUser);
    // } else if (this.state.creationError) {
    //   status = <Alert color="warning">Could not create organization.</Alert>;
    // }

    return (
      <div className="event-bg">
        <div className="event-container">
          <h1>Create an event.</h1>
          <Form onSubmit={this.createEvent.bind(this)}>
            <FormGroup>
              <Label for="org_handle">
                Your organization hosting the event
              </Label>
              <Input
                type="select"
                defaultValue={""}
                name="org_handle"
                id="org_handle"
                placeholder="Choose an organization..."
                onChange={this.onSelect}
              >
                <option value="" disabled>
                  Select your organization...
                </option>
                {this.state.orgItems}
              </Input>
            </FormGroup>
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

            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="from_date">Start Date</Label>
                  <Input
                    type="date"
                    name="from_date"
                    id="from_date"
                    onChange={this.onChange}
                    value={
                      this.state.from_date === null ? "" : this.state.from_date
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="start_time">Start Time</Label>
                  <Input
                    type="time"
                    name="start_time"
                    id="start_time"
                    onChange={this.onChange}
                    value={
                      this.state.start_time === null
                        ? ""
                        : this.state.start_time
                    }
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col md={6}>
                <FormGroup>
                  <Label for="to_date">End Date</Label>
                  <Input
                    type="date"
                    name="to_date"
                    id="to_date"
                    onChange={this.onChange}
                    value={
                      this.state.to_date === null ? "" : this.state.to_date
                    }
                  />
                </FormGroup>
              </Col>
              <Col md={6}>
                <FormGroup>
                  <Label for="end_time">End Time</Label>
                  <Input
                    type="time"
                    name="end_time"
                    id="end_time"
                    onChange={this.onChange}
                    value={
                      this.state.end_time === null ? "" : this.state.end_time
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              <Col md={4}>
                <FormGroup>
                  <Label for="street">Address</Label>
                  <Input
                    type="text"
                    name="street"
                    id="street"
                    placeholder="Eg. 1234 Main St"
                    onChange={this.onChange}
                    value={this.state.street === null ? "" : this.state.street}
                  />
                </FormGroup>
              </Col>
              <Col md={4}>
                <FormGroup>
                  <Label for="city">City</Label>
                  <Input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Eg. Los Angeles"
                    onChange={this.onChange}
                    value={this.state.city === null ? "" : this.state.city}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="state">State</Label>
                  <Input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Eg. California"
                    onChange={this.onChange}
                    value={this.state.state === null ? "" : this.state.state}
                  />
                </FormGroup>
              </Col>
              <Col md={2}>
                <FormGroup>
                  <Label for="zipcode">Zip</Label>
                  <Input
                    type="text"
                    name="zipcode"
                    id="zipcode"
                    placeholder="Eg. 91053"
                    onChange={this.onChange}
                    value={
                      this.state.zipcode === null ? "" : this.state.zipcode
                    }
                  />
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
                  <Label for="cancellation_policy">Cancellation Policy</Label>
                  <Input
                    type="textarea"
                    required
                    name="cancellation_policy"
                    placeholder="Eg. If you cancel, we will be sad."
                    id="cancellation_policy"
                    onChange={this.onChange}
                    value={
                      this.state.cancellation_policy === null
                        ? ""
                        : this.state.cancellation_policy
                    }
                  />
                </FormGroup>
              </Col>
            </Row>

            <FormGroup>
              <Label for="tags">Tags</Label>
              <Input
                type="text"
                required
                name="tags"
                placeholder="Eg. food, drinks"
                id="tags"
                onChange={this.onChange}
                value={this.state.tags === null ? "" : this.state.tags}
              />
              <FormText>Enter tags separated by a comma.</FormText>
            </FormGroup>

            <FormGroup>
              <Label for="banner">Event Banner</Label>
              <CustomInput
                type="file"
                id="banner"
                name="banner"
                label="Upload event's banner."
                onChange={this.onChange}
                value={this.state.banner === null ? "" : this.state.banner}
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
