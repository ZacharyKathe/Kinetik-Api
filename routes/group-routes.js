const express = require('express');
const jwt = require('jsonwebtoken');
// const { json } = require('sequelize/types');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group } = require('../models')

// All GROUP ROUTES, prefix: /groups

// Send all the groups for that user to be displayed on their group page
router.get("/", tokenAuth, async (req, res) => {
  try {
    const userGroupData = await Group.findAll({
      where: {
        user_id: req.user.id
      },
      include: [{ model: User }]
    });

    const userGroups = userGroupData.map((group) => group.get({ plain: true }))
    res.status(200).json(userGroups)
  } catch (err) {
    res.json(err);
  }
})

// Go to a specific group page
router.get("/:id", tokenAuth, async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [{ model: User }]
    })

    res.status(200).json(groupData);

  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

module.exports = router;