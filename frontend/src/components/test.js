import React, { Component } from 'react'
import { Container, Row, Col } from 'reactstrap'
import ModalForm from './modals/ModalForm'
import DataTable from './tables/DataTable'
import { CSVLink } from "react-csv"

// in a more complicated app you would want to create classes and add them to your index.css file (or create other css files).

// we create a function to fetch all data from our api and add it to the state.
class Test extends Component {
  state = {
    items: []
  }

  // create a function to add an item to the state, another to edit an item in the state, and another to delete an item from the state. We pass those functions to child Components.

  // child Components will call their passed in functions when a user performs an action and will pass back the added, edited, or deleted item.

  // state will update dynamically and the page will thus always display the latest data from the database.

  getItems(){
    fetch('http://localhost:3000/crud')
      .then(response => response.json())
      .then(items => this.setState({items}))
      .catch(err => console.log(err))
  }

  addItemToState = (item) => {
    this.setState(prevState => ({
      items: [...prevState.items, item]
    }))
  }

  updateState = (item) => {
    const itemIndex = this.state.items.findIndex(data => data.id === item.id)
    const newArray = [
    // destructure all items from beginning to the indexed item
      ...this.state.items.slice(0, itemIndex),
    // add the updated item to the array
      item,
    // add the rest of the items to the array from the index after the replaced item
      ...this.state.items.slice(itemIndex + 1)
    ]
    this.setState({ items: newArray })
  }

  deleteItemFromState = (id) => {
    const updatedItems = this.state.items.filter(item => item.id !== id)
    this.setState({ items: updatedItems })
  }

  // Because fetch is an asynchronous function that returns a promise, we call the getItems() function from componentDidMount() in order to not block the initial rendering of the page.
  componentDidMount(){
    this.getItems()
  }

  render() {
    return (
      <Container className="Test">
        <Row>
          <Col>
            <h1 style={{margin: "20px 0"}}>CRUD Database</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <DataTable items={this.state.items} updateState={this.updateState} deleteItemFromState={this.deleteItemFromState} />
          </Col>
        </Row>
        <Row>
          <Col>
            <CSVLink
              filename={"db.csv"}
              color="primary"
              style={{float: "left", marginRight: "10px"}}
              className="btn btn-primary"
              data={this.state.items}>
              Download CSV
            </CSVLink>
            <ModalForm buttonLabel="Add Item" addItemToState={this.addItemToState}/>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default Test