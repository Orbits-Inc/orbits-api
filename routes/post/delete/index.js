const Post = require("../../../models/post.model");
const userDeleteContext = require("../../user/delete/index");
const ObjectID = require("bson-objectid");

module.exports.post = function post(id, req, res) {
  Post.findByIdAndDelete(id)
    .then(async (post) => {
      res.json({ post, deleted: true });
      await userDeleteContext.post(id, post.author_id, req, res);
    })
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports.likes = function likes(id, req, res) {
  Post.findById(id)
    .then((post) => {
      post.likes = post.likes.filter((_id) => {
        return _id !== req.body.user_id;
      });
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
      newcomments = [];
      for (let i = 0; i < post.comments.length; i++) {
        if (post.comments[i].comment_id.equals(ObjectID(req.body.comment_id))) {
          continue;
        } else {
          newcomments.push(post.comments[i]);
        }
      }
      post.comments = newcomments;
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
