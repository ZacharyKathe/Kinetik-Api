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
    console.log(err);
    res.status(500).json(err);
  }
});

// Gets specific group with associated users
router.get('/:id', async (req, res) => {
  try {
    const groupData = await Group.findByPk(req.params.id, {
      include: [{
        model: User,
        include: [{ model: Goal }]
      },
      {
        model: Goal
      }],
    });

    if (!groupData) {
      res.status(404).json({ message: 'No group found with that id!' });
      return;
    }

    res.status(200).json(groupData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Creates a new group
router.post('/', tokenAuth, async (req, res) => {
  // console.log(req.body);
  try {
    const newGroup = await Group.create(req.body);
    // console.log(newGroup);
    // Must add user_id to group from front end

    await newGroup.addUser(req.user.id);
    res.status(200).json(newGroup);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Edit this specific group
router.put('/:id', tokenAuth, async (req, res) => {
  console.log('reached');
  try {
    const editGroup = await Group.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    )
    // Adds new user to this group if thst user accepts invite
    console.log(req.user);
    console.log(editGroup);
    await editGroup.addUser(req.user.id);
    await editGroup.update(req.body)
    res.status(200).json(editGroup);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// add goal to group!
router.put('/addgoal/:id', tokenAuth, async (req, res) => {
  console.log(req.body.goal_id);
  try {
    const editGroup = await Group.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    )
    // Adds new user to this group if thst user accepts invite
    await editGroup.addGoal(req.body.goal_id);
    // console.log(editGroup);
    await editGroup.update(req.body)
    res.status(200).json(editGroup);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// remove goal from group!
router.put('/removegoal/:id', tokenAuth, async (req, res) => {
  console.log(req.body.goal_id);
  try {
    const editGroup = await Group.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    )
    // Adds new user to this group if thst user accepts invite
    await editGroup.removeGoal(req.body.goal_id);
    // console.log(editGroup);
    await editGroup.update(req.body)
    res.status(200).json(editGroup);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// remove user from group!
router.put('/removeuser/:id', tokenAuth, async (req, res) => {
  console.log(req.body.goal_id);
  try {
    const editGroup = await Group.findOne(
      {
        where: {
          id: req.params.id
        },
        include: { model: User }
      }
    )
    // Adds new user to this group if thst user accepts invite
    await editGroup.removeUser(req.user.id);

    
    await editGroup.update(req.body)
    console.log("group updated:", editGroup);
    

    res.status(200).json(editGroup);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Delete this specific group
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const groupData = await Group.destroy({
      where: {
        id: req.params.id,
      },
    });
    console.log(groupData);
    if (!groupData) {
      res.status(404).json({ message: "No Goal with that id." });
      return;
    }

    res.status(200).json(groupData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});


module.exports = router;