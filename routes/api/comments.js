const comments = require("express").Router({ mergeParams: true });

const Comment = require("../../models/Comment");
const Card = require("../../models/Card");

// @route GET /cards/:cardId/comments
// @desc Get All Comments in the Card
// @access Public
comments.get("/", (req, res) => {
  const cardId = req.params.cardId;
  console.log("GET /cards/" + cardId + "/comments");
  Card.findById(cardId)
    .populate("comments")
    .then(card => {
      res.json(card.comments);
    })
    .catch(err => res.status(400).json({ msg: "No such card id" }));
});

// @route POST /cards/:cardId/comments
// @desc Add a New Comment in the Card
// @access Public
comments.post("/", (req, res) => {
  const cardId = req.params.cardId;
  console.log("POST /cards/" + cardId + "/comments");
  Card.findById(cardId)
    .then(card => {
      const { body, author } = req.body;
      const newComment = new Comment({ body, author, cardId });

      newComment
        .save()
        .then(comment => res.json(comment))
        .catch(err => console.log(err));

      card.comments.push(newComment._id);

      card
        .save()
        .then()
        .catch(err => console.log(err));
    })
    .catch(err => res.status(400).json({ msg: "No such card id" }));
});

// @route DELETE /cards/:cardId/comments/:commentId
// @desc Delete a Comment in the Card
// @access Public
comments.delete("/:commentId", (req, res) => {
  const cardId = req.params.cardId;
  const commentId = req.params.commentId;
  console.log("DELETE /cards/" + cardId + "/comments/" + commentId);
  res.send("ok");
});

module.exports = comments;
