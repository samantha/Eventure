// POST function that returns a specific user
const postTableData = (req, res, db) => {
  const { username, event_handle } = req.body;
  db.raw(
    "SELECT * FROM rsvps WHERE username='" +
      username +
      "' AND event_handle='" +
      event_handle +
      "' "
  )
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
