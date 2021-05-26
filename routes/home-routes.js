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
    const userGoalData = await Goal.findAll({
      where: {
        user_id: req.user.id
      }
    })

    const userGoals = userGoalData.map((goal) => goal.get({ plain: true }))
    res.status(200).json(userGoals)
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

module.exports = router;
