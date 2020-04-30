import React, { Component, useContext } from "react";
import "../styles/home.css";
import { UserContext } from "../components/UserContext";

const background_img = "img/homepage.jpg";

const bg_style = {
  backgroundImage: `url(${background_img})`,
};

export default class Home extends Component {
  componentDidMount() {
    let value = this.context;
    /* perform a side-effect at mount using the value of UserContext */
  }
  componentDidUpdate() {
    let value = this.context;
    /* ... */
  }
  componentWillUnmount() {
    let value = this.context;
    /* ... */
  }
  render() {
    let value = this.context;
    /* render something based on the value of UserContext */
    return (
      <div id="img">
        <h1 id="company_name">eventure</h1>
        <div>{value}</div>
      </div>
    );
  }
}
Home.contextType = UserContext; // This part is important to access context values
