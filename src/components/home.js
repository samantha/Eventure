import React, { Component } from "react";
import '../home.css';

const background_img = "img/homepage.jpg";

const bg_style = {
    backgroundImage: `url(${background_img})`,
};

export default class Home extends Component {
    render() {
        return (
            <div id="img">
			<h1 id="company_name">eventure</h1>
			</div>
        );
    }
}