const boards = require("express").Router();

const Board = require("../../models/Board");

// @route GET /api/boards
// @desc Get All Boards
// @access Public
boards.get("/", (req, res) => {
  console.log("DEBUG: GET /api/boards");
  Board.find()
    .then(boards => res.json(boards))
    .catch(err => console.log(err));
});

// @route GET /api/boards/:boardId
// @desc Get a Specific Board
boards.get("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  console.log("DEBUG: GET /api/boards/" + boardId);
  res.send("ok");
});

// @route POST /api/boards
// @desc Add a New Board
// @access Public
boards.post("/", (req, res) => {
  console.log("DEBUG: POST /api/boards");
  const { title } = req.body;
  const newBoard = new Board({ title });
  newBoard
    .save()
    .then(board => res.json(board))
    .catch(err => console.log(err));
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
