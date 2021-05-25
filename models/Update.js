const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UpdateSchema = new Schema({
  update_name: String,

  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ],

});

const Update = mongoose.model("Update", UpdateSchema);

module.exports = Update;