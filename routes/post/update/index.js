const Post = require("../../../models/post.model");
const ObjectID = require("bson-objectid");

module.exports.info = function info(id, req, res) {
  Post.findById(id)
    .then((post) => {
      console.log(req.body);
      post = Object.assign(post, req.body);
      console.log(post);
      post.save().then(() => {
        res.json({
          post: post,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};

module.exports.likes = function likes(id, req, res) {
  Post.findById(id)
    .then((post) => {
      post.likes.push(req.body.user_id);
      post.save().then(() => {
        res.json({
          post: post,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};

module.exports.comments = function comments(id, req, res) {
  Post.findById(id)
    .then((post) => {
      req.body.comment_id = ObjectID();
      post.comments.push(req.body);
      post.save().then(() => {
        res.json({
          post: post,
          updated: true,
        });
      });
    })
    .catch((err) => {
      res.status(400).json({ error: err, updated: false });
    });
};
