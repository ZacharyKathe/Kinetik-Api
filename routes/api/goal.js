const router = require("express").Router();
// const goalController = require("../../controllers/goalController");
const { User, Goal } = require('../../models')

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

module.exports = router;