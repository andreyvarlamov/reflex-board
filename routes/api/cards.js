const cards = require("express").Router();
const comments = require("./comments");

// @route GET /api/cards/
// @desc Get All Cards in the Board
// @access Public
cards.get("/", (req, res) => {
  console.log("GET /api/cards/");
  res.send("ok");
});

// @route POST /api/cards
// @desc Add a New Card in the Board
// @access Public
cards.post("/", (req, res) => {
  console.log("POST /api/cards/");
  res.send("ok");
});

// @route DELETE /api/cards/:cardId
// @desc Delete a Card
// @access Public
cards.delete("/:cardId", (req, res) => {
  const cardId = req.params.cardId;
  console.log("DELETE /api/cards/" + cardId);
  res.send("ok");
});

// redirect /api/cards/:cardId/comments
cards.use("/:cardId/comments", comments);

module.exports = cards;
