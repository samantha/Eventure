//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
  db.select('*').from('socials')
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
  const { handle, facebook, twitter, instagram} = req.body
  // const added = new Date()
  db('socials').insert({ handle, facebook, twitter, instagram })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'can\'t add social media!'}))
}

// PUT function that will update a row with a given handle
const putTableData = (req, res, db) => {
  const { handle, facebook, twitter, instagram } = req.body
  db('socials').where({handle}).update({ facebook, twitter, instagram })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({dbError: 'db error'}))
}

// DELETE function that will delete a row with a given handle
const deleteTableData = (req, res, db) => {
  const { handle } = req.body
  db('socials').where({handle}).del()
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