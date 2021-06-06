const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class CompletedDates extends Model { }

CompletedDates.init(
  {
    completedDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    }
  },

  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'CompletedDates',
  }
);

module.exports = CompletedDates;