// POST function that returns all events they either manage or rsvped to
const postTableData = (req, res, db) => {
  const { org_handle } = req.body;
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
  db.raw(
    "SELECT * FROM events WHERE org_handle='" +
      org_handle +
      "' AND from_date >= CURRENT_DATE ORDER BY from_date ASC"
  )

    // .join(
    //   "events",
    //   "handle",
    //   "=",
    //   "events.handle"
    // )

    // .returning("*")
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
