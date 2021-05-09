const router = require("express").Router();
const User = require("../../models/user.model");
const updateContext = require("./update/index");
const deleteContext = require("./delete/index");

router.route("/:id").get((req, res) => {
  User.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json({ error: err }));
});

router.route("/").post((req, res) => {
  data = req.body;

  const newUser = new User({
    data,
  });

  newUser
    .save()
    .then((user) => {
      res.send({
        user,
        successfull: true,
      });
    })
    .catch((err) => res.status(400).json({ error: err, successfull: false }));
});

router.route("/update/info/:id").post((req, res) => {
  updateContext.info(req.params.id, req, res);
});

router.route("/update/followers/:id").post((req, res) => {
  updateContext.followers(req.params.id, req, res);
});

router.route("/update/following/:id").post((req, res) => {
  updateContext.following(req.params.id, req, res);
});

router.route("/update/notifications/:id").post((req, res) => {
  updateContext.notifications(req.params.id, req, res);
});

router.route("/delete/account/:id").delete((req, res) => {
  deleteContext.account(req.params.id, req, res);
});

router.route("/delete/post/:id").delete((req, res) => {
  deleteContext.post(req.params.id, req, res);
});

router.route("/delete/followers/:id").delete((req, res) => {
  deleteContext.followers(req.params.id, req, res);
});

router.route("/delete/following/:id").delete((req, res) => {
  deleteContext.following(req.params.id, req, res);
});

module.exports = router;
