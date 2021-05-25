const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GroupSchema = new Schema({
  group_name: {
    type: String,
    trim: true,
    required: "Group name is Required"
  },

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],

});

const Group = mongoose.model("Group", GroupSchema);

module.exports = Group;