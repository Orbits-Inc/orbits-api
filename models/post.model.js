const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    image: {
      type: String,
    },
    content: {
      type: String,
      required: true,
    },
    read_time: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
    },
    tags: {
      type: Array,
    },
    likes: {
      type: Array,
    },
    comments: {
      type: Array,
    },
    author_id: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
