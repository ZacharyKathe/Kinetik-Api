const express = require('express');
const { json } = require('sequelize/types');
const router = express.Router();
const apiAuth = require("../middleware/apiAuth")
const { User, Goal, Group } = require('../models')

// User home, displays their goals
router.get("/dashboard", apiAuth, async (req, res) => {
  try {
    const userGoalData = await Goal.findAll({
      where: {
        user_id: req.session.user.id
      }
    })
    if (!req.session.user) {
      return;
    }
    const userGoal = userGoalData.map((goal) => goal.get({ plain: true }))
    res.status(200).json(userGoal)
  } catch (err) {
    res.json(err);
  }
})

// Send all the groups for that user to be displayed on their group page
router.get("/groups", apiAuth, async (req, res) => {
  if (req.session.logged_in) {
    try {

      const userGroupData = await Group.findAll( {
        include: { model: User }
      });
      const userGroups = userGroupData.map((group) => group.get({ plain: true }))

      res.status(200).json(userGroups)
    } catch (err) {
      res.json(err);
    }
  } else {
    res.status(401);
  }
})

router.get("/groups/:id", apiAuth, async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [{ model: User }]
    })

    // const currTripData = await Trip.findByPk(req.params.id, {
    //   include: [{ model: GearItem }]
    // })
    // const userGear = userGearData.map((gear) => gear.get({ plain: true }))
    // const currTrip = currTripData.get({ plain: true })
    // userGear.username = req.session.user.username;
    
  } catch (err) {
    res.json(err);
  }
})

module.exports = router;
