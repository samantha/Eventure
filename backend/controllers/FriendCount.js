// POST function that returns all events after yesterday
// SELECT * FROM events WHERE from_date >= CURDATE() ORDERBY from_date ASC;
const postTableData = (req, res, db) => {
  const { username } = req.body;
  db.raw(
    "SELECT COUNT(*) as numberOfFriends FROM (SELECT friendname FROM friendships where username='" +
      username +
      "' UNION ALL SELECT username from friendships where friendname='" +
      username +
      "') AS f;"
  )
    .then((item) => {
      if (item.length == 0) {
        res.status(400).json({ dbError: "Empty: No events found" });
      } else {
        res.json(item.rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(400).json({ dbError: "Error: No events found" });
    });
};

module.exports = {
  postTableData,
};
