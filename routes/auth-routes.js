const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group } = require('../models')
const bcrypt = require("bcrypt")
// SIGNUP: prefix: /
router.post("/signup", (req, res) => {
  User.create({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }).then(newUser => {
    const token = jwt.sign({
      name: newUser.name,
      email: newUser.email,
      id: newUser.id
    },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h"
      })
    res.json({ token, user: newUser })
  }).catch(err => {
    console.log(err);
    res.status(500).json({ message: "an error occured", err })
  })
})

// LOGIN: Login route, checks if email and password matches the specific user in the /api/users, and on success, creates session for them
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then(user => {
    if (!user) {
      console.log('user not found')
      return res.status(403).json({ message: "auth failed" })
    } else if (!bcrypt.compareSync(req.body.password, user.password)) {
      console.log(req.body.password);
      console.log("passwords dont match")
      return res.status(403).json({ message: "auth failed" })
    } else {
      console.log(user);
      const token = jwt.sign({
        username: user.username,
        email: user.email,
        id: user.id
      },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        })
      console.log(token);
      res.json({ token, user })
    }
  })
})



router.get('/logout', (req, res) => {
  if (err) {
    res.status(500).json({ message: "error, could not log out" })
  }
  res.status(200).send('Successfully logged out');
});

module.exports = router;