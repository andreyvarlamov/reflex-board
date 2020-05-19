const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: String,
    cardId: {
      type: mongoose.Schema.ObjectId,
      ref: "Card",
    },
  },
  { timestamps: true }
);

module.exports = Comment = mongoose.model("Comment", CommentSchema);
