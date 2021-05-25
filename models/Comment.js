const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  comment: String,

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

});

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;