// POST function that returns a specific user
const postTableData = (req, res, db) => {
  const { username } = req.body;
  // db.select('handle,name')
  //   .from("memberships")
  //   .where({ username: username })
  //   .andWhere({ role: "admin" })
  //   .join(
  //     "events",
  //     "memberships.org_handle",
  //     "=",
  //     "events.org_handle"
  //   )
  //   .union([
  //     // db.select('event_handle as handle')
  //     // .from("rsvps")
  //     // .where('username', "dinosaur");
  //     db.raw("SELECT event_handle AS handle FROM rsvps WHERE username='" + username + "'")
  //   ])
  db.raw("SELECT * FROM users WHERE username='" + username + "'")
    .then((item) => {
      if (item.length == 0) {
        res.status(400).json({ dbError: "Empty: No users found" });
      } else {
        res.json(item.rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ dbError: "Error: No users found" });
    });
};

module.exports = {
  postTableData,
};
