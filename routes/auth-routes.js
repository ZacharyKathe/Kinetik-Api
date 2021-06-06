const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Goal, Group } = require('../models')
const bcrypt = require('bcrypt');


const nodemailer = require('nodemailer');
const e = require('express');
const transporter = nodemailer.createTransport({
  service: "Yahoo",
  auth: {
    user: "kinetikapp@yahoo.com",
    pass: "nqltgyqzfaaqtkit"
  }
});

// SIGNUP: prefix: /
router.post("/signup", (req, res) => {
    console.log('THIS IS THE REQ BODY===============');
    
    console.log(req.body);
    
    User.create({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }).then(newUser => {
      const token = jwt.sign({
        username: newUser.username,
        email: newUser.email,
        id: newUser.id
      },
        process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        })
      console.log(token);
      console.log(newUser);
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



router.post('/invite', tokenAuth, (req, res) => {
  console.log(req.body);
  const options = {
    from: "kinetikapp@yahoo.com",
    to: req.body.invitedUser,
    subject: `Hey, join my Kinetik goals group "${req.body.groupName}"!`,
    html: `<h3>Hey, this is ${req.body.myName}!</h3> 
    <p>I'd love for you to come join my group on Kinetik, and we can help encourage each other as we strive to achieve our goals!<p>
    
    <p>If you do not have a profile yet, first visit here and sign up: <a href="http://localhost:3000">Signup</a></p>

    <p>If you already do, just login, and then go here to accept my invitation: <a href="http://${req.body.groupUrl}">Accept</a></p>
    <p>Once you've done that, you can add whatever goal you'd like to share, and comment/give kudos on others' progress! Pretty simple, right?</p>
    <p>Happy goal-achieving!</p>`
  }
  console.log(options);
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log("sent:" + info.response);
      res.json(200)
    }
  })
})

module.exports = router;