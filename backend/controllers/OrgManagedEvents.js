// POST function that returns events managed by user (admin of an organization)
const postTableData = (req, res, db) => {
  const { handle } = req.body;
  db("events")
    .where({ org_handle: handle })
    .returning("*")
    .then((item) => {
      if (item.length == 0) {
        res.status(400).json({ dbError: "No events found" });
      } else {
        res.json(item);
      }
    })
    .catch((err) => res.status(400).json({ dbError: "No events found" }));
};

module.exports = {
  postTableData,
};
