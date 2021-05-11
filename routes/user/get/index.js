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
