const mongoose = require("mongoose");

const Schema = mongoose.Schema;

module.exports.userSchema = userSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3,
      lowercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      trim: true,
    },
    display_picture: {
      type: String,
    },
    bio: {
      type: String,
      trim: true,
    },
    notifications: {
      type: Array,
    },
    email: {
      type: String,
      required: true,
    },
    posts: {
      type: Array,
    },
    followers: {
      type: Array,
    },
    following: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
