const mongoose = require("mongoose");
const { userSchema } = require("./user.model");

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    post_id: {
      type: String,
      required: true,
      unique: true,
    },
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
    author: {
      type: userSchema,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("User", postSchema);

module.exports = Post;
