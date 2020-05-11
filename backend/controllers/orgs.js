//  GET function that returns all data from the db table
const getTableData = (req, res, db) => {
  db.select("*")
    .from("organizations")
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
  const { id, name, description, city, state, handle, icon } = req.body;
  const added = new Date();
  db("organizations")
    .insert({ id, name, description, city, state, handle, icon, added })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) =>
      res.status(400).json({ dbError: "can't add organization" })
    );
};

// PUT function that will update a row with a given id
const putTableData = (req, res, db) => {
  const { id, name, description, city, handle, icon } = req.body;
  db("organizations")
    .where({ handle })
    .update({ name, description, city, handle, icon })
    .returning("*")
    .then((item) => {
      res.json(item);
    })
    .catch((err) => res.status(400).json({ dbError: "db error" }));
};

// DELETE function that will delete a row with a given id
const deleteTableData = (req, res, db) => {
  const { handle } = req.body;
  db("organizations")
    .where({ handle })
    .del()
    .then(() => {
      res.json({ delete: "true" });
    })

    .catch((err) => {
      console.error(err);
      res.status(400).json({ dbError: "Error: Can't delete org" });
    });
};

module.exports = {
  getTableData,
  postTableData,
  putTableData,
  deleteTableData,
};
