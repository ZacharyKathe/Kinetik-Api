const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth")
const { User, Goal, Comment, Group } = require('../../models')

//Get All Goals
router.get('/', async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [{ model: User }]
    });
    const allGoals = goalData.map((goal) => goal.get({ plain: true }));
    res.status(200).json(allGoals);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

//Get One Goal
router.get('/:id', async (req, res) => {
  try {
    const goalData = await Goal.findByPk(req.params.id,
      {
        include: [{ model: User },
        {
          model: Comment,
          include: { model: User }
        },
        {
          model: Group
        }
      ]
      });

    const thisGoal = goalData.get({ plain: true });

    res.status(200).json(thisGoal);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create new goal!
router.post('/', tokenAuth, async (req, res) => {
  try {
    const newGoal = await Goal.create(req.body);
    console.log(req.user);
    newGoal.user_id = req.user.id;
    newGoal.save();
    res.status(200).json(newGoal);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

// Edit this specific goal
router.put('/:id', tokenAuth, async (req, res) => {
  try {
    const editGoal = await Goal.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    )
    console.log(req.body);
    
    await editGoal.update(req.body)
    res.json(200).json(editGoal);
  } catch (err) {
    console.log(err);
    res.json(400).json(err);
  }
});

// Delete this specific goal
router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const goalData = await Goal.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!goalData) {
      res.status(404).json({ message: "No Goal with that id." });
      return;
    }

    res.status(200).json(goalData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;