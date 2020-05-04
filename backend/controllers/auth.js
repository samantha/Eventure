// POST function that will verify user email and password
const postTableData = (req, res, db) => {
  const { email, password } = req.body;
  db("users")
    .where({ email: email })
    .andWhere({ password: password })
    .returning("*")
    .then((item) => {
      if (item.length == 0) {
        res.status(500).json({ dbError: "Incorrect login information" });
      } else {
        res.json(item);
      }
    })
    .catch((err) =>
      res.status(400).json({ dbError: "Incorrect login information" })
    );
};

module.exports = {
  postTableData,
};
