// POST function that returns a specific user
const postTableData = (req, res, db) => {
  const { username } = req.body;
  db.raw(
    "SELECT * FROM (SELECT friendname FROM friendships WHERE username='" +
      username +
      "' UNION ALL SELECT username FROM friendships WHERE friendname='" +
      username +
      "') AS f FULL JOIN users on f.friendname=users.username WHERE f.friendname IS NOT NULL"
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
