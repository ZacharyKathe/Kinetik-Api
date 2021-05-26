const router = require("express").Router();
// const userController = require("../../controllers/userController");
const { User, Goal, Comment } = require('../../models')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');

// Matches with "/api/users"
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
    res.status(500).json(err);
  }
})

// Matches with "/api/users/:id"
router.get('/:id', async (req, res) => {
  try {

    const userData = await User.findByPk(req.params.id, {
      include: [{
        model: Goal,
        as: "goals",
        attributes: ['goal_category']
      }],
      // attributes: {
      //   exclude: ["password"],
      //   // Doesn't work:
      // }
    });

    if (!userData) {
      res.status(404).json({ message: 'No user found with that id!' });
      return;
    }

    res.status(200).json(userData);

  } catch (err) {
    res.status(500).json(err);
  }
});

// SIGNUP: Adds new user to /api/users
router.post('/', async (req, res) => {
  console.log('route reached')
  console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })

    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN: Login route, checks if email and password matches the specific user in the /api/users, and on success, creates session for them
router.post('/login', async (req, res) => {
  console.log('route reached!')

  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!foundUser) {
      return res.status(401).send('Username or password is incorrect')
    }
    // If the password matches the user password, create new token with user data and secret.
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      const token = jwt.sign({
        username: foundUser.username,
        email: foundUser.email,
        id: foundUser.id
      }, process.env.JWT_SECRET,
        {
          expiresIn: "2h"
        })
      res.json({ token, foundUser })
    }
  } catch (err) {
    req.session.destroy();
    return res.status(401).send('Username or password is incorrect')

  }
});


router.get('/logout', (req, res) => {
  if (err) {
    res.status(500).json({ message: "error, could not log out" })
  }
  res.status(200).send('Successfully logged out');
});


module.exports = router;