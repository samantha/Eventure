// CREATE TABLE organizations (
// 	id serial PRIMARY KEY,
//  name VARCHAR(100) NOT NULL,
//  description VARCHAR(500) NOT NULL,
//  city VARCHAR(100) NOT NULL,
//  icon BYTEA,
//  added TIMESTAMP NOT NULL
// );

//  GET function that returns all organizations from db
const getOrganizations = (req, res, db) => {
    db.select('*').from('organizations')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  // GET function that returns one organization from db using id
  const getOrganization = (req, res, db) => {
    const { id, name, description, city, icon, added } = req.body
      db.select('*').from('organizations').where({id})
        .then(items => {
            if(items.length){
                res.json(items)
            } else {
                res.json({dataExists: 'false'})
            }
        })
        .catch(err => res.status(400).json({dbEerror: 'db error'}))
  }
  
  // POST function that will add a row to the table
  const postOrganization = (req, res, db) => {
    const { id, name, description, city, icon, added } = req.body
    const added = new Date()
    db('organizations').insert({id, name, description, city, icon, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // PUT function that will update a row with a given id
  const putOrganization = (req, res, db) => {
    const { id, name, description, city, icon, added } = req.body
    db('organizations').where({id}).update({id, name, description, city, icon, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // DELETE function that will delete a row with a given id
  const deleteOrganization = (req, res, db) => {
    const { id } = req.body
    db('organizations').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getOrganizations,
    getOrganization,
    postOrganization,
    putOrganization,
    deleteOrganization
  }