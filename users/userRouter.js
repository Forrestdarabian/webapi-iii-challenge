const express = require("express");
const User = require("./userDb");
const router = express.Router();

router.post("/", (req, res) => {});

router.post("/:id/posts", (req, res) => {});

router.get("/", (req, res) => {
  User.get()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "Error getting users" });
    });
});
router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.user);
});
router.get("/:id/posts", (req, res) => {});

router.delete("/:id", (req, res) => {});

router.put("/:id", validateUserId, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  User.update(id, { name }).then(updated => {
    res.status(200).json(updated);
  });
});
//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params.id;
  User.getById(id).then(user => {
    if (user) {
      req.user = user;
      next();
    } else {
      res.status(404).json({ error: "User with id does not exist" });
    }
  });
}
function validateUser(req, res, next) {}

function validatePost(req, res, next) {}

module.exports = router;
