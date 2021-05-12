const router = require("express").Router();
const User = require("../../models/user.model");
const updateContext = require("./update/index");
const deleteContext = require("./delete/index");
const getContext = require("./get/index");

router.route("/byId/:id").get((req, res) => {
  getContext.get(req.params.id, req, res);
});

router.route("/search/:query").get((req, res) => {
  getContext.search(req.params.query, req, res);
});

router.route("/").get((req, res) => {
  getContext.getAll(req, res);
});

router.route("/").post((req, res) => {
  data = req.body;
  const newUser = new User({
    ...data,
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

router.route("/update/following/:id").post((req, res) => {
  updateContext.following(req.params.id, req, res);
});

router.route("/update/notifications/:id").post((req, res) => {
  updateContext.notifications(req.params.id, req, res);
});

router.route("/delete/account/:id").delete((req, res) => {
  deleteContext.account(req.params.id, req, res);
});

router.route("/delete/following/:id").delete((req, res) => {
  deleteContext.following(req.params.id, req, res);
});

router.route("/delete/ping/:id").delete((req, res) => {
  deleteContext.ping(req.params.id, req, res);
});

module.exports = router;
