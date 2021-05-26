const sequelize = require('../config/connection');
const { User, Goal, Group, Comment } = require('../models');

const userSeedData = require('./userSeedData.json');
const goalSeedData = require('./goalSeedData.json');
const groupSeedData = require('./groupSeedData.json');
const commentSeedData = require('./commentSeedData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Create users from user JSON seed
  const users = await User.bulkCreate(userSeedData);

  console.log('--------Users Seeded -----------')

  const goals = await Goal.bulkCreate(goalSeedData);

  console.log('--------Goal Seeded -----------')

  const groups = await Group.bulkCreate(groupSeedData);

  console.log('--------Groups Seeded -----------')

  const comments = await Comment.bulkCreate(commentSeedData);

  console.log('--------Comments Seeded -----------')

  await groups[0].addUsers([1, 2, 3])

  await groups[1].addUsers([3, 4, 5])



  process.exit(0);
};


seedDatabase();