const express = require('express');
const jwt = require('jsonwebtoken');
// const { json } = require('sequelize/types');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group } = require('../models')

// All HOME ROUTES, prefix: /

// User home, displays their goals
router.get("/dashboard", tokenAuth, async (req, res) => {
  try {
    console.log(req.user);
    const userGoalData = await Goal.findAll({
      // where: {
      //   user_id: req.user.id
      // }
    })
    const userGoal = userGoalData.map((goal) => goal.get({ plain: true }))
    res.status(200).json(userGoal)
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;
