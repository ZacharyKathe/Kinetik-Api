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
  
  const goals = await Goal.bulkCreate(goalSeedData);
  
  const groups = await Group.bulkCreate(groupSeedData);
  
  const comments = await Comment.bulkCreate(commentSeedData);

  await groups[0].addUser(0)
  await groups[0].addUser(1)
  await groups[0].addUser(2)
 
  await groups[1].addUser(3)
  await groups[1].addUser(4)
  await groups[1].addUser(5)


  process.exit(0);
};


seedDatabase();