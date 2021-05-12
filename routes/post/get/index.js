const Post = require("../../../models/post.model");

module.exports.get = function get(id, req, res) {
  Post.findById(id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports.getAll = function getAll(req, res) {
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports.topPosts = function topPosts(req, res) {
  Post.find()
    .then((posts) => {
      for (let i = 0; i < posts.length; i++) {
        for (let j = 0; j < posts.length - 1; j++) {
          if (
            posts[j].comments.length + posts[j].likes.length <
            posts[j + 1].comments.length + posts[j + 1].likes.length
          ) {
            temp = posts[j];
            posts[j] = posts[j + 1];
            posts[j + 1] = temp;
          }
        }
      }
      res.json(posts);
    })
    .catch((err) => res.status(400).json({ error: err }));
};

module.exports.search = async function search(query, req, res) {
  const cursor = Post.find({ title: new RegExp(query, "i") }).cursor();
  const postsWithTitle = [];
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    postsWithTitle.push(doc); // Prints documents one at a time
  }
  const tagCursor = await Post.find();
  const postsWithTag = [];
  for (let i = 0; i < tagCursor.length; i++) {
    if (tagCursor[i].tags.includes(query)) {
      postsWithTag.push(tagCursor[i]);
    }
  }
  const posts = [];
  for (
    let i = 0;
    i < Math.min(postsWithTag.length, postsWithTitle.length);
    i++
  ) {
    if (str(postsWithTag[i]._id) === str(postsWithTitle[i]._id)) {
      posts.push(postsWithTag[i]);
    } else {
      posts.push(postsWithTag[i]);
      posts.push(postsWithTitle[i]);
    }
  }
  if (postsWithTag.length > postsWithTitle.length) {
    for (let i = postsWithTitle.length; i < postsWithTag.length; i++) {
      posts.push(postsWithTag[i]);
    }
  } else {
    for (let i = postsWithTag.length; i < postsWithTitle.length; i++) {
      posts.push(postsWithTitle[i]);
    }
  }
  res.json(posts);
};

module.exports.searchByTag = async function searchByTag(query, req, res) {
  const tagCursor = await Post.find();
  const postsWithTag = [];
  for (let i = 0; i < tagCursor.length; i++) {
    if (tagCursor[i].tags.includes(query)) {
      postsWithTag.push(tagCursor[i]);
    }
  }
  res.json(postsWithTag);
};
