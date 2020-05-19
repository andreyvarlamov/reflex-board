const cards = require("express").Router();
const comments = require("./comments");

const Card = require("../../models/Card");
const Board = require("../../models/Board");

// @route GET /api/cards/
// @desc Get All Cards
// @access Public
cards.get("/", (req, res) => {
  console.log("GET /api/cards/");
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => console.log(err));
});

// @route POST /api/cards
// @desc Add a New Card
// @access Public
cards.post("/", (req, res) => {
  console.log("POST /api/cards/");

  const { boardId } = req.body;
  Board.findById(boardId)
    .then(board => {
      const { title, author, description } = req.body;
      const newCard = new Card({ title, author, description, boardId });

      newCard
        .save()
        .then(card => res.json(card))
        .catch(err => console.log(err));

      board.cards.push(newCard._id);

      board
        .save()
        .then()
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.status(400).json({ msg: "No such board id" });
    });
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
