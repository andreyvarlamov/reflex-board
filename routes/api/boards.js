const boards = require("express").Router();

const Board = require("../../models/Board");
const User = require("../../models/User");

const authMiddleware = require("../../middleware/auth");

// @route GET /api/boards
// @desc Get All Boards
// @access Public
boards.get("/", (req, res) => {
  console.log("DEBUG: GET /api/boards");
  Board.find()
    .then(boards => res.json(boards))
    .catch(err => {
      console.log(err);
      res.status(400).json({ msg: "Error Getting boards from DB" });
    });
});

// @route GET /api/boards/:boardId
// @desc Get a Specific Board
// @access Public
boards.get("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  console.log("DEBUG: GET /api/boards/" + boardId);
  Board.findById(boardId)
    .populate("cards")
    .then(board => res.json(board))
    .catch(err => {
      console.log(err);
      res.status(404).json({ msg: "No board with such id" });
    });
});

// @route POST /api/boards
// @desc Add a New Board
// @access Private
boards.post("/", authMiddleware, (req, res) => {
  console.log("DEBUG: POST /api/boards");
  const { title } = req.body;
  const { id } = req.user;

  User.findById(id)
    .then(user => {
      const newBoard = new Board({ title, userId: id });
      newBoard
        .save()
        .then(board => res.json(board))
        .catch(err => console.log(err));

      user.boards.push(newBoard._id);

      user
        .save()
        .then()
        .catch(err => console.log(err));
    })
    .catch(err => {
      res.status(400).json({ msg: "No such user id" });
    });
});

// @route DELETE /api/boards/:boardId
// @desc Deleate a Board
// @access Public
boards.delete("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  console.log("DEBUG: DELETE /api/boards/" + boardId);
  res.send("ok");
});

module.exports = boards;
