const cards = require("express").Router();
const comments = require("./comments");

const Card = require("../../models/Card");
const Board = require("../../models/Board");

const authMiddleware = require("../../middleware/auth");

// @route GET /api/cards/
// @desc Get All Cards
// @access Public
cards.get("/", (req, res) => {
  // console.log("DEBUG: GET /api/cards/");
  Card.find()
    .then(cards => res.json(cards))
    .catch(err => console.log(err));
});

// @route POST /api/cards
// @desc Add a New Card
// @access Private
cards.post("/", authMiddleware, (req, res) => {
  // console.log("DEBUG: POST /api/cards/");

  const { boardId } = req.body;
  const { id } = req.user;

  Board.findById(boardId)
    .then(board => {
      if (id !== board.userId.toString())
        return res.status(401).json({ msg: "Not authorized to add this card" });

      const { title, status, author, description } = req.body;
      const newCard = new Card({ title, status, author, description, boardId });

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

// @route PATCH /api/cards/:cardId
// @desc Update a Card
// @access Private
cards.patch("/:cardId", authMiddleware, (req, res) => {
  const cardId = req.params.cardId;
  // console.log("DEBUG: PATCH /api/cards/" + cardId);

  const userId = req.user.id;

  const newCard = req.body;
  delete newCard._id;

  Card.findById(cardId).then(card => {
    const { boardId } = card;

    Board.findById(boardId).then(board => {
      if (userId !== board.userId.toString())
        return res
          .status(401)
          .json({ msg: "Not authorized to edit this card" });

      Card.updateOne({ _id: cardId }, newCard)
        .then(() => {
          Card.findById(cardId).then(card => {
            if (card) return res.json(card);
            else
              return res
                .status(400)
                .json({ msg: "No such card id: " + cardId });
          });
        })
        .catch(err => console.log(err));
    });
  });
});

// @route DELETE /api/cards/:cardId
// @desc Delete a Card
// @access Private
cards.delete("/:cardId", authMiddleware, (req, res) => {
  const cardId = req.params.cardId;
  // console.log("DEBUG: DELETE /api/cards/" + cardId);

  const userId = req.user.id;

  Card.findById(cardId)
    .then(card => {
      Board.findById(card.boardId).then(board => {
        if (userId !== board.userId.toString())
          return res
            .status(401)
            .json({ msg: "Not authorized to edit this card" });

        board.cards = board.cards.filter(
          foundCardId => foundCardId.toString() !== cardId
        );
        board.save();

        card.remove().then(() => res.json({ success: true }));
      });
    })
    .catch(err => res.status(404).json({ success: false }));
});

// redirect /api/cards/:cardId/comments
cards.use("/:cardId/comments", comments);

module.exports = cards;
