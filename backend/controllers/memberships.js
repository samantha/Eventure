//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
  db.select("*")
    .from("memberships")
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
  const { id, org_handle, username, role } = req.body;
  const added = new Date();
  db("memberships")
    .insert({ id, org_handle, username, role })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "can't add user" }));
};

// PUT function that will update a row with a given id
const putTableData = (req, res, db) => {
  const { id, org_handle, username, role } = req.body;
  db("memberships")
    .where({ id })
    .update({ org_handle, username, role })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

// DELETE function that will delete a row with a given id
const deleteTableData = (req, res, db) => {
  const { username, org_handle } = req.body;
  db("memberships")
    .where({ username, org_handle })
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
