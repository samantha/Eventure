import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
/*import * as serviceWorker from './serviceWorker';
*/
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(<App />, document.getElementById('root'));

//const Client = require('pg').Client;
/*const {Client} = require('pg'); // same as above
// create a new Client
const client = new Client(
{
    user: "postgres",
    password: 'postgres',
    host: 'localhost',
    port: 5432,
    database: "eventure"
});*/


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
/*serviceWorker.unregister();
*/