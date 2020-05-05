//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
  db.select("*")
    .from("friendships")
    .then((items) => {
      if (items.length) {
        res.json(items);
      } else {
        res.json({ dataExists: "false" });
      }
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

// POST function that will add a row to the table
const postTableData = (req, res, db) => {
  const { username, friendname } = req.body;
  db("friendships")
    .insert({ username, friendname })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "can't add friendname" }));
};

// PUT function that will update a row with a given username
const putTableData = (req, res, db) => {
  const { username, friendname } = req.body;
  db("friendships")
    .where({ username, friendname })
    .update({ username, friendname })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

// DELETE function that will delete a row with a given username
const deleteTableData = (req, res, db) => {
  const { username, friendname } = req.body;
  db("friendships")
    .where({ username, friendname })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
};
