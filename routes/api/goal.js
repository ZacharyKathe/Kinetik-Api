const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth")
const { User, Goal, Comment } = require('../../models')

//Get All Goals
router.get('/', async (req, res) => {
  try {
    const goalData = await Goal.findAll({
      include: [{ model: User }]
    });
    const allGoals = goalData.map((goal) => goal.get({ plain: true }));
    res.status(200).json(allGoals);
  } catch (err) {
    res.status(500).json(err);
  }
});

//Get One Goal
router.get('/:id', async (req, res) => {
  console.log(req.params.id);
  try {
    const goalData = await Goal.findById(req.params.id,
      {
        include: [{ model: User }, { model: Comment }]
      });

    const thisGoal = goalData.get({ plain: true });

    res.status(200).json(thisGoal);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {
    const newGoal = await Goal.create({
      goalName: req.body.goalName,
      goalDescription: req.body.goalDescription,
      user_id: req.session.user_id
    });

    const goal = newGoal.get({ plain: true });
    res.status(200).json(goal);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const editGoal = await Goal.findOne(
      {
        where: {
          id: req.params.id
        }
      }
    )
    await editGoal.update(
      {
        goalName: req.body.goalName,
        goalDescription: req.body.goalDescription
      }
    )
    res.json(200).json(editGoal);
  } catch (err) {
    res.json(400).json(err);
  }
});

router.delete('/:id', tokenAuth, async (req, res) => {
  try {
    const goalData = await Goal.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id
      },
    });

    if (!goalData) {
      res.status(404).json({ message: "No Goal with that id." });
      return;
    }

    res.status(200).json(goalData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;