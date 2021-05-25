const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const GoalSchema = new Schema({
  goalName: {
    type: String,
    trim: true,
    required: "Goal Title is required"
  },

  goalDescription: {
    type: String,
    trim: true
  },

  goalCreated: {
    type: Date,
    default: Date.now
  }
});

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;