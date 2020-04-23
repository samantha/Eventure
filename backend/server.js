/**
- the express/app creation/connection/porting
- the postgres connection via knex
- all middleware
- api routes
 */

const express = require('express');

// use process.env variables to keep private variables,
require('dotenv').config()
/*require('dotenv').config({ path: '.env' });*/

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

// db Connection w/ Heroku
// const db = require('knex')({
//   client: 'pg',
//   connection: {
//     connectionString: process.env.DATABASE_URL,
//     ssl: true,
//   }
// });

// db Connection w/ localhost
// var db = require('knex')({
//   client: 'pg',
//   connection: {
//     host : '127.0.0.1',
//     user : 'postgres',
//     password : 'postgres',
//     database : 'eventure'
//   }
// });

// Controllers - aka, the db queries
const test = require('./controllers/test');
// ADD more controls
const users  = require('./controllers/users');
const organizations = ('./controllers/organizations');

// App
const app = express()

// App Middleware
const whitelist = ['http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/crud', (req, res) => test.getTableData(req, res, db))
app.post('/crud', (req, res) => test.postTableData(req, res, db))
app.put('/crud', (req, res) => test.putTableData(req, res, db))
app.delete('/crud', (req, res) => test.deleteTableData(req, res, db))
// ADD more routes
app.get('/users', (req, res) => users.getTableData(req, res, db))
app.post('/users', (req, res) => users.postTableData(req, res, db))
app.put('/users', (req, res) => users.putTableData(req, res, db))
app.delete('/users', (req, res) => users.deleteTableData(req, res, db))
// Organization Routes
app.get('/organizations', (req, res) => organizations.getOrganizations(req, res, db));
app.get('/organizations', (req, res) => organizatinos.getOrganization(req, res, db))
app.post('/organizations', (req, res) => organizatinos.postOrganizations(req, res, db))
app.put('/organizations', (req, res) => organizatinos.putOrganization(req, res, db))
app.delete('/organizations', (req, res) => organizatinos.deleteOrganization(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`app is running on port ${process.env.PORT || 3000}`)
});
