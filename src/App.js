import React, { Component } from "react";
import ReactDOM from "react-dom";
import './App.css';
import Popup from "reactjs-popup";
import Button from 'react-bootstrap/Button';
import QrReader from 'react-qr-reader'

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

render(){
  return (
    <div>
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

