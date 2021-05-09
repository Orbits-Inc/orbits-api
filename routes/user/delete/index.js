const User = require("../../../models/user.model");

module.exports.account = function account(id, req, res) {
  User.findByIdAndDelete(id)
    .then((user) => res.json({ user, deleted: true }))
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports.followers = function followers(id, req, res) {
  User.findById(id)
    .then((user) => {
      user.followers.filter((_id) => {
        return _id !== req.body.user_id;
      });
      user.save().then(() => {
        res.json({
          username: user.username,
          deleted: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, deleted: false });
    });
};

module.exports.following = function following(id, req, res) {
  User.findById(id)
    .then((user) => {
      user.following.filter((_id) => {
        return _id !== req.body.user_id;
      });
      user.save().then(() => {
        res.json({
          username: user.username,
          deleted: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, deleted: false });
    });
};

module.exports.post = function post(id, req, res) {
  User.findById(id)
    .then((user) => {
      user.posts.filter((_id) => {
        return _id !== req.body.post_id;
      });
      user.save().then(() => {
        res.json({
          username: user.username,
          deleted: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, deleted: false });
    });
};
