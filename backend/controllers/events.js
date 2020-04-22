//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
    db.select('*').from('testtable1')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // POST function that will add a row to the table
  const postTableData = (req, res, db) => {
    const { name, date, description, location, banner, organization, tags, policy } = req.body
    const added = new Date()
    db('testtable1').insert({name, date, description, location, banner, organization, tags, policy, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // PUT function that will update a row with a given id
  const putTableData = (req, res, db) => {
    const { name, date, description, location, banner, organization, tags, policy } = req.body
    db('testtable1').where({id}).update({name, date, description, location, banner, organization, tags, policy})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  // DELETE function that will delete a row with a given id
  const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('testtable1').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  module.exports = {
    getTableData,
    postTableData,
    putTableData,
    deleteTableData
  }