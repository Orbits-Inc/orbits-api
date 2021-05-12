const User = require("../../../models/user.model");

module.exports.get = function get(id, req, res) {
  User.findOne({ user_id: id })
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

module.exports.getAll = function getAll(req, res) {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => {
      res.status(400).json({ error: err });
    });
};

module.exports.search = async function search(query, req, res) {
  const cursor = User.find({
    $or: [
      { name: new RegExp(query, "i") },
      { username: new RegExp(query, "i") },
    ],
  }).cursor();
  const users = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    users.push(doc); // Prints documents one at a time
  }
  res.json(users);
};
