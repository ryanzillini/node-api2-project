// implement your posts router here
const express = require("express");
const Post = require("./posts-model");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    if (posts) {
      res.json(posts);
    }
  } catch {
    res
      .status(500)
      .json({ message: "The posts information could not be retrieved" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist" });
    } else {
      res.json(post);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "The post information could not be retrieved" });
  }
});

// router.post("/", (req, res) => {
//   const { title, contents } = req.body;
//   if (!title || !contents) {
//     res.status(400).json({
//       message: "Please provide title and contents for the post",
//     });
//   } else {
//     Post.insert({ title, contents })
//       .then(({ id }) => {
//         return Post.findById(id);
//       })
//       .then((post) => {
//         res.status(201).json(post);
//       })
//       .catch((err) => {
//         res.status(500).json({
//           message: "There was an error while saving the post to the database",
//         });
//       });
//   }
// });
router.post("/", async (req, res) => {
  const { title, contents } = req.body;
  if (!title || !contents) {
    res
      .status(400)
      .json({ message: "Please provide title and contents for the post" });
  } else {
    try {
      const newpost = await Post.insert({ title, contents }).then(({ id }) => {
        return Post.findById(id);
      });
      res.status(201).json(newpost);
    } catch {
      res
        .status(500)
        .json({ message: "The post informaton could not be modified" });
    }
  }
});

// router.put('/:id', as)

module.exports = router;
