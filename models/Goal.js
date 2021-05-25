const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Goal extends Model { }

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

    goalFrequency: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },

    goalDescription: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    goalCreated: {
      type: DataTypes.DATEONLY,
      // get: function () {
      //   return moment.utc(this.getDataValue('goalCreated')).format('YYYY-MM-DD')
      // }
    },

    goalFinishBy: {
      type: DataTypes.DATEONLY,
      // get: function () {
      //   return moment.utc(this.getDataValue('goalFinishBy')).format('YYYY-MM-DD')
      // },
      allowNull: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'Goal',
  }
);

module.exports = Goal;