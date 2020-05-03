// POST function that will verify user email and password
const postTableData = (req, res, db) => {
  const { username } = req.body;
  db("memberships")
    .where({ username: username })
    .andWhere({ role: "admin" })
    .join(
      "organizations",
      "memberships.org_handle",
      "=",
      "organizations.handle"
    )
    .returning("*")
    .then((item) => {
      if (item.length == 0) {
        res.status(400).json({ dbError: "No organizations found" });
      } else {
        res.json(item);
      }
    })
    .catch((err) =>
      res.status(400).json({ dbError: "No organizations found" })
    );
};

module.exports = {
  postTableData,
};
