import React, { Component } from "react";
import ReactDOM from "react-dom";
import './App.css';
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button';
import QrReader from 'react-qr-reader'
import Sidebar from "react-sidebar";

var QRCode = require('qrcode.react');

export default class QR extends Component {
	
state = {
    result: 'No result'
}
 
handleScan = data => {
    if (data) {
      this.setState({
        result: data
      })
    }
}

handleError = err => {
    console.error(err)
}


//sidebar
constructor(props) {
    super(props);
    this.state = {
		sidebarOpen: true
    };
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
}
 
onSetSidebarOpen(open) {
	this.setState({ sidebarOpen: open });
}
  

render(){
  return (
	<div>
		<Sidebar
			sidebar={
				<div>
				<center>
					<img height="125" width="125" src={ require('./icon.png') } />
					<h2>Full Name</h2>
					<h4>Title Name</h4>
					<br/>
					<p>City, State</p>
					<p>+1 (123) 456-7890</p>
					<p>email@example.com</p>
					<br/>
					<Button variant="primary">Edit</Button>
				</center>
				</div>
			}
			open={this.state.sidebarOpen}
			onSetOpen={this.onSetSidebarOpen}
			styles={{ 
				sidebar: { 
					background: "white",
					padding: 24
				}
			}}
		 >
			<Button variant="dark" onClick={() => this.onSetSidebarOpen(true)}>Open Sidebar</Button>
		</Sidebar>
		<br />
        <Popup modal trigger={<Button variant="secondary">QR Code</Button>}>
			<center>
				<h1>QR Code:</h1>
				<QRCode
					value={"http://google.com/"}
					size={128}
					bgColor={"#ffffff"}
					fgColor={"#000000"}
					level={"L"}
					includeMargin={false}
					renderAs={"svg"}
				/>
			</center>
		</Popup>
		<br />
		<Popup modal trigger={<Button variant="secondary">QR Scanner</Button>}>
			<center>
				<h1>QR Scanner:</h1>
				<QrReader
				  delay={300}
				  onError={this.handleError}
				  onScan={this.handleScan}
				  style={{ width: '25%' }}
				/>
				<p>{this.state.result}</p>
			</center>
		</Popup>
    </div>
  );
}
}

