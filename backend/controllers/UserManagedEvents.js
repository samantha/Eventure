// POST function that returns events managed by user
const postTableData = (req, res, db) => {
  const { username } = req.body;
  db("memberships")
    .where({ username: username })
    .andWhere({ role: "admin" })
    .join("events", "memberships.org_handle", "=", "events.org_handle")
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
