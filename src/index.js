import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

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

const client = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'postgres',
    database : 'eventure'
  }
})

client.connect() // returns promise
.then(() => console.log("Connected successfully!"))
.catch(e => console.error()) // if fails
.finally(() => client.end()); // always executes. important to end connection

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
