const express = require('express');
const jwt = require('jsonwebtoken');
// const { json } = require('sequelize/types');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group, Comment } = require('../models')

// All HOME ROUTES, prefix: /

// User home, displays their goals
router.get("/dashboard", tokenAuth, async (req, res) => {
  try {
    console.log(req.user.id);
    const loggedUser = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [{ 
        model: Goal,
        include: [{ model: Comment }]
      }, { 
        model: Group,
        include: [{ model: User }]}]
    })  
    console.log(loggedUser);

    res.status(200).json(loggedUser)
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

module.exports = router;
