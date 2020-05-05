// POST function that returns all events after yesterday
// SELECT * FROM events WHERE from_date >= CURDATE() ORDERBY from_date ASC;
const getTableData = (req, res, db) => {
  db.raw(
    "SELECT * FROM events WHERE from_date >= CURRENT_DATE ORDER BY from_date ASC"
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
  getTableData,
};
