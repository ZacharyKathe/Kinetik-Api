const router = require("express").Router();
// const userController = require("../../controllers/userController");
const { User, Goal } = require('../../models')

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
      include: [{ model: Goal }, { model: User }],
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

// Adds new user to /api/users
router.post('/', async (req, res) => {
  console.log('route reached')
  console.log(req.body);
  try {
    const newUser = await User.create(req.body)

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;
    })
    console.log(req.session.user);

    res.status(200).json(newUser)
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route, checks if email and password matches the specific user in the /api/users, and on success, creates session for them
router.post('/login', async (req, res) => {
  console.log('route reached!')

  try {
    const foundUser = await User.findOne({
      where: {
        email: req.body.email
      }
    })
    if (!foundUser) {
      req.session.destroy();
      return res.status(401).send('No account with this email found')
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.user = {
        id: foundUser.id,
        email: foundUser.email,
        username: foundUser.username
      };
      console.log(req.session)
      return res.json(req.session)
    }
  } catch (err) {
    req.session.destroy();
    return res.status(401).send('Username or password is incorrect')

  }
});


router.get('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send('Successfully logged out');
});


module.exports = router;