const express = require('express');
const db = require("./userDb");

const router = express.Router();

// add new user working
router.post("/", validateUser, (req, res) => {
 db.insert(req.body)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: "There was an error while saving the post to the database",
      });
    });
});


router.post('/:id/posts', validatePost, (req, res) => {
  res.status(200).json(req.body);
});


 // get requests testing correctly  
router.get("/", (req, res) => {
 db.get(req.query)
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving posts",
      });
    });
});


router.get("/:id", validateUserId, (req, res) => {
  res.status(200).json(req.u);
});


router.get("/:id/posts", validateUserId, (req, res) => {
  db.getUserPosts(req.params.id)
    .then((posts) => {
      if (posts) {
        res.status(200).json(posts);
      } else {
        res.status(404).json({
          message: "post not found",
        });
      }
    })
    .catch((error) => {
      console.log(error);
      res.status(500).json({
        message: "Error processing request",
      });
    });
});

// delete by id working correctly 
router.delete("/:id", validateUserId, (req, res) => {
 db.remove(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: "The user could not be removed" });
    });
});


router.put("/:id", validateUserId, validateUser, (req, res) => {
  db.update(req.params.id, req.body)
    .then(res.status(200).json(req.body))
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Error processing request" });
    });
});

//custom middleware

function validateUserId(req, res, next) {
  const { id } = req.params;
  db.getById(id)
    .then((u) => {
      if (u) {
        req.u = u;
        next();
      } else {
        res.status(404).json({ message: "ID not found" });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "failed", err });
    });
}

function validateUser(req, res, next) {
  const body = req.body;
  !body || body === {}
    ? res.status(400).json({ message: "user not included" })
    : !body.name
    ? res.status(400).json({ message: "missing name" })
    : next();
}

function validatePost(req, res, next) {
  const body = req.body;
  !body || body === {}
    ? res.status(400).json({ message: "post not included" })
    : !body.text
    ? res.status(400).json({ message: "missing text" })
    : next();
}

module.exports = router;