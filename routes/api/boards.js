const boards = require("express").Router();

// @route GET /api/boards
// @desc Get All Boards
// @access Public
boards.get("/", (req, res) => {
  console.log("GET /api/boards");
  res.send("ok");
});

// @route GET /api/boards/:boardId
// @desc Get a Specific Board
boards.get("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  console.log("GET /api/boards/" + boardId);
  res.send("ok");
});

// @route POST /api/boards
// @desc Add a New Board
// @access Public
boards.post("/", (req, res) => {
  console.log("POST /api/boards");
  res.send("ok");
});

// @route DELETE /api/boards/:boardId
// @desc Deleate a Board
// @access Public
boards.delete("/:boardId", (req, res) => {
  const boardId = req.params.boardId;
  console.log("DELETE /api/boards/" + boardId);
  res.send("ok");
});

module.exports = boards;
