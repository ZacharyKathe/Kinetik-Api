const router = require("express").Router();
const { User, Goal, Group, Comment } = require('../../models')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const tokenAuth = require("../../middleware/tokenAuth");

// Matches with "/api/users", find ALL users
router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: {
        exclude: ["password"]
      }
    });

    const allUsers = userData.map(user => user.get({ plain: true }))
    res.status(200).json(allUsers);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
})

router.get('/test', tokenAuth, (req, res) => {
  res.json(req.user)
})

// Matches with "/api/users/:id", find ONE user
router.get('/:id', async (req, res) => {
  try {

    const userData = await User.findByPk(req.params.id, {
      include: [{ model: Goal }, { model: Group }],
      attributes: {
        exclude: ["password"],
      }
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(userData);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Delete specific user (how to make it so user can only delete their profile?)
router.delete('/:id', tokenAuth, async (req, res) => {
  try {

    const userData = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json(userData);

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// SIGNUP: Adds new user to /api/users
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