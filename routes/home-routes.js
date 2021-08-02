const express = require('express');
const jwt = require('jsonwebtoken');
// const { json } = require('sequelize/types');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group, Comment, CompletedDates } = require('../models')
<<<<<<< HEAD
const ProfilePic = require("../models/ProfilePic")
=======
const ProfilePic = require('../models/ProfilePic')
>>>>>>> 906afde970eedc0acf04efbc1b177a55188e8962

// All HOME ROUTES, prefix: /

// User home, displays their goals
router.get("/dashboard", tokenAuth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const loggedUser = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [{ 
        model: Goal,
        include: [{ model: Comment }, { model: Group }]
      }, { 
        model: Group,
<<<<<<< HEAD
        include: [{ model: User }]},
        { model: ProfilePic } 
=======
        include: [{ model: User }]
      }, { 
        model: ProfilePic 
      }
>>>>>>> 906afde970eedc0acf04efbc1b177a55188e8962
      ]
    })  
    // console.log(loggedUser);

    res.status(200).json(loggedUser)
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

// User home, get only incomplete goals
router.get("/incomplete-goals", tokenAuth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const loggedUser = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [{ 
        model: Goal,
        where: {
          isComplete: false
        },
        include: [{ model: Comment }, { model: CompletedDates }]
      }, { 
        model: Group,
        include: [{ model: User }]
        }
      ]
    })  
    // console.log(loggedUser);

    res.status(200).json(loggedUser)
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})

// User home, get only incomplete goals
router.get("/complete-goals", tokenAuth, async (req, res) => {
  try {
    // console.log(req.user.id);
    const loggedUser = await User.findOne({
      where: {
        id: req.user.id
      },
      include: [{ 
        model: Goal,
        where: {
          isComplete: true
        },
        include: [{ model: Comment, model: CompletedDates }]
      }, 
      { 
        model: Group,
        include: [{ model: User }]
      }]
    })  
    // console.log(loggedUser);

    res.status(200).json(loggedUser)
  } catch (err) {
    console.log(err);
    res.json(err);
  }
})
module.exports = router;
