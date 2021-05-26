const express = require('express');
const jwt = require('jsonwebtoken');
// const { json } = require('sequelize/types');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group } = require('../models')

// All GROUP ROUTES, prefix: /groups

// Send all the groups for that user to be displayed on their group page
router.get("/", async (req, res) => {
  if (req.session.logged_in) {
    try {

      const userGroupData = await Group.findAll({
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

router.get("/:id", async (req, res) => {
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