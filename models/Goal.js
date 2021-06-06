const { Model, DataTypes, TEXT } = require('sequelize');
const sequelize = require('../config/connection');
const moment = require('moment');

class Goal extends Model { }

Goal.init(
  {
    goal_category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    goal_name: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },

    goal_frequency: {
      type: DataTypes.STRING,
      trim: true,
      allowNull: false
    },

    goal_description: {
      type: DataTypes.TEXT,
      allowNull: true
    },

    goal_progress : {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },

    
    goal_target : {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    
    value_type : {
      type: DataTypes.STRING,
      allowNull: true
    },
    
    goal_start: {
      type: DataTypes.DATEONLY,
      // get: function () {
      //   return moment.utc(this.getDataValue('goalCreated')).format('YYYY-MM-DD')
      // }
    },

    goal_finish: {
      type: DataTypes.DATEONLY,
      // get: function () {
      //   return moment.utc(this.getDataValue('goalFinishBy')).format('YYYY-MM-DD')
      // },
      allowNull: true,
    },

    isComplete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    lastCompletedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

        lastUpdate: {
          type: DataTypes.DATE,
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