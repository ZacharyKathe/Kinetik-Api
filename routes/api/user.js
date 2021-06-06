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




module.exports = router;