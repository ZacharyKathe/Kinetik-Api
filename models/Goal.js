const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  goal_name: {
    type: String,
    trim: true,
    required: "Group name is Required"
  },

  category: {
    type: String,
    trim: true,
    required: true
  },

});

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;