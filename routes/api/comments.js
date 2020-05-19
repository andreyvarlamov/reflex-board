const comments = require("express").Router({ mergeParams: true });

// @route GET /cards/:cardId/comments
// @desc Get All Comments in the Card
// @access Public
comments.get("/", (req, res) => {
  const cardId = req.params.cardId;
  console.log("GET /cards/" + cardId + "/comments");
  res.send("ok");
});

// @route POST /cards/:cardId/comments
// @desc Add a New Comment in the Card
// @access Public
comments.post("/", (req, res) => {
  const cardId = req.params.cardId;
  console.log("POST /cards/" + cardId + "/comments");
  res.send("ok");
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
