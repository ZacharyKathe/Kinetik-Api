const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth")
// const userController = require("../../controllers/userController");
const { User, Goal, Group } = require('../../models')

// Matches with "/api/groups", gets all groups
router.get('/', async (req, res) => {
  try {
    const groupData = await Group.findAll();

    const allgroups = groupData.map(group => group.get({ plain: true }))
    res.status(200).json(allgroups);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Gets specific group with associated users
router.get('/:id', async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [{ model: User }],
    });

    if (!groupData) {
      res.status(404).json({ message: 'No group found with that id!' });
      return;
    }

    res.status(200).json(groupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Creates a new group
router.post('/', async (req, res) => {
  console.log(req.body);
  try {
    const newGroup = await Group.create(req.body);
    console.log(newGroup);

    // Auto adds current user to this group
    // newGroup.addUser(req.session.user.id)
  
    res.status(200).json(newGroup);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const groupData = await Group.destroy({
      where: {
        id: req.params.id,
        // user_id: req.session.user_id
      },
    });

    if (!groupData) {
      res.status(404).json({ message: "No Goal with that id." });
      return;
    }

    res.status(200).json(groupData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;