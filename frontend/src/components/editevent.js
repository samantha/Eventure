import React from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import '../styles/login.css'

class EditEvent extends React.Component {
  state = {
    first: '',
    last: '',
    email: '',
    password: ''
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  }

  submitFormAdd = e => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          this.props.addItemToState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  submitFormEdit = e => {
    e.preventDefault()
    fetch('http://localhost:3000/users', {
      method: 'put',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        first: this.state.first,
        last: this.state.last,
        email: this.state.email,
        password: this.state.password
      })
    })
      .then(response => response.json())
      .then(item => {
        if(Array.isArray(item)) {
          // console.log(item[0])
          this.props.updateState(item[0])
          this.props.toggle()
        } else {
          console.log('failure')
        }
      })
      .catch(err => console.log(err))
  }

  componentDidMount(){
    // if item exists, populate the state with proper data
    if(this.props.item){
      const { first, last, email, password } = this.props.item
      this.setState({ first, last, email, password })
    }
  }

  render() {
    return (
      <div className="event-container">
       <h1>Edit Event</h1>
        <Form onSubmit={this.submitFormEdit }>
          <FormGroup>
            <Label for="first">Event Name</Label>
            <Input type="text" required name="first" id="first" onChange={this.onChange} value={this.state.first === null ? '' : this.state.first} />
          </FormGroup>
          <FormGroup>
            <Label for="last">Description</Label>
            <Input type="text" required name="last" id="last" onChange={this.onChange} value={this.state.last === null ? '' : this.state.last}  />
          </FormGroup>
          <FormGroup>
            <Label for="email">Location</Label>
            <Input type="email" required name="email" id="email" onChange={this.onChange} value={this.state.email === null ? '' : this.state.email}  />
          </FormGroup>
          <FormGroup>
            <Label for="password">Cancellation Policy</Label>
            <Input type="text" required name="password" id="password" onChange={this.onChange} value={this.state.password === null ? '' : this.state.password} />
          </FormGroup>

          <div className = "form-group">
            <input type = "submit" value = "Edit Event" className = "btn btn-primary" />
         </div>
        </Form>
      </div>
    );
  }
}

export default EditEvent