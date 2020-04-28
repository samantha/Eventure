//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
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

// POST function that will add a row to the table
const postTableData = (req, res, db) => {
  const { id, name, description, city, state, icon } = req.body
  const added = new Date()
  db('organizations').insert({ id, name, description, city, state, icon, added })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'can\'t add organization'}))
}

// PUT function that will update a row with a given id
const putTableData = (req, res, db) => {
  const { id, name, description, city, icon} = req.body
  db('organizations').where({id}).update({ id, name, description, city, icon })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

// DELETE function that will delete a row with a given id
const deleteTableData = (req, res, db) => {
  const { id } = req.body
  db('organizations').where({id}).del()
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