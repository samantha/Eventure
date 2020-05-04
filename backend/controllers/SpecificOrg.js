// POST function that returns a specific org
const postTableData = (req, res, db) => {
  const { handle } = req.body;

  db.raw("SELECT * FROM organizations WHERE handle='" + handle + "'")
    .then((item) => {
      if (item.length == 0) {
        res.status(400).json({ dbError: "Empty: No organizations found" });
      } else {
        res.json(item.rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ dbError: "Error: No organizations found" });
    });
};

module.exports = {
  postTableData,
};
