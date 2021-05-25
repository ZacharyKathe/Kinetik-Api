const express = require('express');
const router = express.Router();
const apiAuth = require("../middleware/apiAuth")
const { User, Goal } = require('../models')

router.get("/dashboard", apiAuth, async (req, res) => {
  try {
    const userGoalData = await Goal.findAll( { 
      where: { 
        user_id: req.session.user.id
      }
    })
    if (!req.session.user) {
      // res.render('index')
      return;
    }
    const userGoal = userGoalData.map((goal) => goal.get({ plain: true }))
    res.status(200).json(userGoal)
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;
