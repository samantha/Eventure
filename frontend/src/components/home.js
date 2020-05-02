import React, { Component, useContext } from "react";
import "../styles/home.css";

const background_img = "img/homepage.jpg";

const bg_style = {
  backgroundImage: `url(${background_img})`,
};

export default class Home extends Component {
  render() {
    let value = this.context;
    /* render something based on the value of UserContext */
    return (
      <div id="img">
        <h1 id="company_name">eventure</h1>
      </div>
    );
  }
}
