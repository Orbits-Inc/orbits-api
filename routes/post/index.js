const router = require("express").Router();
const Post = require("../../models/post.model");
const userUpdateContext = require("../user/update/index");
const updateContext = require("./update/index");
const deleteContext = require("./delete/index");
const getContext = require("./get/index");
const monthArray = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

router.route("/byId/:id").get((req, res) => {
  getContext.get(req.params.id, req, res);
});

router.route("/").get((req, res) => {
  getContext.getAll(req, res);
});

router.route("/topPosts").get((req, res) => {
  getContext.topPosts(req, res);
});

router.route("/search/:query").get((req, res) => {
  getContext.search(req.params.query, req, res);
});

router.route("/searchByTag/:query").get((req, res) => {
  getContext.searchByTag(req.params.query, req, res);
});

router.route("/").post(async (req, res) => {
  data = req.body;
  date = new Date();
  dateStr =
    date.getDate() +
    " " +
    monthArray[date.getMonth()] +
    " " +
    date.getFullYear();
  data.date = dateStr;
  data.read_time = Math.ceil(data.content.length / 200);
  const newPost = new Post({
    ...data,
  });

  newPost
    .save()
    .then(async (post) => {
      await userUpdateContext.post(post._id, post.author_id, req, res);
      res.send({
        post,
        successfull: true,
      });
    })
    .catch((err) => res.status(400).json({ error: err, successfull: false }));
});

router.route("/update/info/:id").post((req, res) => {
  updateContext.info(req.params.id, req, res);
});

router.route("/update/likes/:id").post((req, res) => {
  updateContext.likes(req.params.id, req, res);
});

router.route("/update/comments/:id").post((req, res) => {
  updateContext.comments(req.params.id, req, res);
});

router.route("/delete/:id").delete((req, res) => {
  deleteContext.post(req.params.id, req, res);
});

router.route("/delete/likes/:id").delete((req, res) => {
  deleteContext.likes(req.params.id, req, res);
});

router.route("/delete/comments/:id").delete((req, res) => {
  deleteContext.comments(req.params.id, req, res);
});

module.exports = router;
