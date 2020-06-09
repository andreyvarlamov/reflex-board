const boards = require("express").Router();

const Board = require("../../models/Board");
const User = require("../../models/User");
const Card = require("../../models/Card");

const authMiddleware = require("../../middleware/auth");

// @route GET /api/boards
// @desc Get All Boards
// @access Public
boards.get("/", (req, res) => {
  console.log("DEBUG: GET /api/boards");
  Board.find()
    .populate("userId", "firstName lastName")
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
    .then(board => {
      if (!board) return res.status(404).json({ msg: "No board with such id" });
      res.json(board);
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

// @route PATCH /api/boards/:boardId
// @desc Update a Board
// @access Private
boards.patch("/:boardId", authMiddleware, (req, res) => {
  const boardId = req.params.boardId;
  console.log("DEBUG: PATCH /api/boards/" + boardId);

  const { id } = req.user;

  Board.findById(boardId).then(board => {
    if (!board) return res.status(404).json({ msg: "No such board id" });
    if (board.userId.toString() !== id)
      return res
        .status(401)
        .json({ msg: "Auth token does not correspond to the board's author" });

    const newBoard = req.body;
    delete newBoard._id;

    // If status dictionary changed, if there any statuses are deleted, delete corresponding cards
    if (newBoard.statusDictionary) {
      const deletedStatuses = board.statusDictionary.filter(
        status => !newBoard.statusDictionary.includes(status)
      );

      if (deletedStatuses) {
        Card.find({
          boardId: boardId,
          status: { $in: deletedStatuses },
        }).then(cards => {
          const foundCardIds = cards.map(card => card._id.toString());

          Card.deleteMany({ _id: { $in: foundCardIds } }).then(() => {
            Board.updateOne({ _id: boardId }, newBoard).then(() => {
              Board.findById(boardId).then(board => {
                board.cards = board.cards.filter(
                  cardId => !foundCardIds.includes(cardId.toString())
                );
                board.save().then(() => {
                  Board.findById(boardId)
                    .populate("cards")
                    .then(board => {
                      if (!board)
                        return res
                          .status(400)
                          .json({ msg: "No such board id: " + boardId });

                      return res.json(board);
                    });
                });
              });
            });
          });
        });
      } else {
        Board.updateOne({ _id: boardId }, newBoard).then(() => {
          Board.findById(boardId)
            .populate("cards")
            .then(board => {
              if (board) return res.json(board);
              else
                return res
                  .status(400)
                  .json({ msg: "No such board id: " + boardId });
            });
        });
      }
    } else {
      Board.updateOne({ _id: boardId }, newBoard).then(() => {
        Board.findById(boardId)
          .populate("cards")
          .then(board => {
            if (board) return res.json(board);
            else
              return res
                .status(400)
                .json({ msg: "No such board id: " + boardId });
          });
      });
    }
  });
});

// @route DELETE /api/boards/:boardId
// @desc Deleate a Board
// @access Private
boards.delete("/:boardId", authMiddleware, (req, res) => {
  const boardId = req.params.boardId;
  console.log("DEBUG: DELETE /api/boards/" + boardId);

  const { id } = req.user;

  Board.findById(boardId)
    .then(board => {
      if (board.userId.toString() !== id)
        return res.status(403).json({
          msg: "Auth token does not correspond to the board's author",
        });

      User.findById(id).then(user => {
        if (!user)
          return res.status(404).json({
            msg:
              "User in token does not correspond to any user in the database",
          });

        user.boards = user.boards.filter(
          foundBoardId => foundBoardId.toString() !== board._id.toString()
        );
        user.save();
      });

      Card.deleteMany({ boardId: board._id }).then();

      board.remove().then(() => res.json({ success: true }));
    })
    .catch(() => res.status(404).json({ success: false }));
});

module.exports = boards;
