const User = require("../../../models/user.model");
const ObjectID = require("bson-objectid");

module.exports.account = function account(id, req, res) {
  User.findOneAndDelete({ user_id: id })
    .then((user) => res.json({ user, deleted: true }))
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports.followers = function followers(curr_id, id, req, res) {
  User.findOne({ user_id: curr_id })
    .then((user) => {
      user.followers = user.followers.filter((_id) => {
        return _id !== id;
      });
      user.save().then(() => {
        return;
      });
    })
    .catch((err) => {
      return err;
    });
};

module.exports.following = function following(id, req, res) {
  User.findOne({ user_id: id })
    .then((user) => {
      user.following = user.following.filter((_id) => {
        return _id !== req.body.user_id;
      });
      user.save().then(() => {
        this.followers(req.body.user_id, id, req, res);
        res.json({
          username: user.username,
          followingDeleted: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, followingDeleted: false });
    });
};

module.exports.post = function post(post_id, id, req, res) {
  User.findOne({ user_id: id })
    .then((user) => {
      user.posts = user.posts.filter((_id) => {
        return !_id.equals(ObjectID(post_id));
      });
      user.save().then(() => {
        console.log({
          username: user.username,
          postDeleted: true,
        });
      });
    })
    .catch((err) => {
      console.log({ error: err, postDeleted: false });
    });
};
