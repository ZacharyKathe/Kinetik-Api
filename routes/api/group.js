const router = require("express").Router();
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
  try {
    const newGroupData = await Group.create({
      name: req.body.name,
    });

    // Auto adds current user to this group
    newGroupData.addUser(req.session.user._id)
    
    const newGroup = newGroupData.get({ plain: true });
    res.status(200).json(newGroup);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;