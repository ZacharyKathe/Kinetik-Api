const User = require('./User');
const Goal = require('./Goal');
const Group = require('./Group');
const Comment = require('./Comment');
const CompletedDates = require('./CompletedDates');
const ProfilePic = require("./ProfilePic");

// One user can have many goals!
User.hasMany(Goal, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Each goal belongs to only one user!
Goal.belongsTo(User, {
  foreignKey: 'user_id',
});

//One user can have many Profile Pictures
User.hasMany(ProfilePic,{
  foreignKey: "user_id",
  onDelete: 'CASCADE'
})

ProfilePic.belongsTo(User, {
  foreignKey: 'user_id'
})

// Each user can be a part of many groups!
User.belongsToMany(Group, {
  through: 'GroupUser',
});

// Many users can have the same group!
Group.belongsToMany(User, {
  through: "GroupUser",
})

// Each goal can be a part of many groups!
Goal.belongsToMany(Group, {
  through: 'GroupGoal',
});

// Many goals can have the same group!
Group.belongsToMany(Goal, {
  through: "GroupGoal",
})

// Each goal can have many comments!
Goal.hasMany(Comment, {
  foreignKey: 'goal_id',
  onDelete: 'CASCADE'
})

// Each comment belongs to only one goal!
Comment.belongsTo(Goal, {
  foreignKey: 'goal_id',
})

// Each user can have many comments!
User.hasMany(Comment, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
})

// Each comment belongs to only one user!
Comment.belongsTo(User, {
  foreignKey: 'user_id',
})

Goal.hasMany(CompletedDates, {
  foreignKey: 'goal_id',
  onDelete: 'CASCADE'
})

CompletedDates.belongsTo(Goal, {
  foreignKey: 'goal_id'
})





module.exports = {
  User,
  Goal,
  Group,
  Comment,
  CompletedDates
}