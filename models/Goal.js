const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Goal extends Model {}

Goal.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },

    goalName: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },

    goalDescription: {
      type: TEXT,
      trim: true
    },

    goalCreated: {
      type: Date,
      default: Date.now
    }
  }
);

const Goal = mongoose.model("Goal", GoalSchema);

module.exports = Goal;