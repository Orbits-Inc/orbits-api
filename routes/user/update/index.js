const User = require("../../../models/user.model");

module.exports.info = function info(id, req, res) {
  User.findById(id)
    .then((user) => {
      user = req.body;
      user.save().then(() => {
        res.json({
          username: user.username,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};

module.exports.followers = function followers(id, req, res) {
  User.findById(id)
    .then((user) => {
      user.followers.push(req.body.user_id);
      user.save().then(() => {
        res.json({
          username: user.username,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};

module.exports.following = function following(id, req, res) {
  User.findById(id)
    .then((user) => {
      user.following.push(req.body.user_id);
      user.save().then(() => {
        res.json({
          username: user.username,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};

module.exports.notifications = function notifications(id, req, res) {
  User.findById(id)
    .then((user) => {
      user.notifications.push(req.body.notification);
      user.save().then(() => {
        res.json({
          username: user.username,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};
