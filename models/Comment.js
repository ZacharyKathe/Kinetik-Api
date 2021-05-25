const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    comment_content: String,

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
      },
    },

    goal_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Goal',
        key: 'id',
      },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: 'Comment',
  }
);

module.exports = Comment;