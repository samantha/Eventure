//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
    db.select('*').from('events')
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
    const { id, name, from_date, to_date, description, street, city, state, zipcode, banner, org_id, cancellation_policy } = req.body
    const added = new Date()
    db('events').insert({ id, name, from_date, to_date, description, street, city, state, zipcode, banner, org_id, cancellation_policy, added})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'Can not add event!'}))
  }

  // PUT function that will update a row with a given id
  const putTableData = (req, res, db) => {
    const { id, name, from_date, to_date, description, street, city, state, zipcode, banner, org_id, cancellation_policy } = req.body
    db('events').where({id}).update({ name, from_date, to_date, description, street, city, state, zipcode, banner, org_id, cancellation_policy })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  // DELETE function that will delete a row with a given id
  const deleteTableData = (req, res, db) => {
    const { id } = req.body
    db('events').where({id}).del()
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