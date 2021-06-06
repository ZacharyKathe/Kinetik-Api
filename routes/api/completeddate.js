const router = require("express").Router();
const tokenAuth = require("../../middleware/tokenAuth")
const { User, Goal, Comment, CompletedDates } = require('../../models')
const moment = require('moment');

router.get('/', async (req, res) => {
  try {
    const compData = await CompletedDates.findAll({
      include: [{ model: Goal }]
    });
    const allComp = compData.map((comp) => comp.get({ plain: true }));
    res.status(200).json(allComp);
    console.log(compData)
  } catch (err) {
    res.status(500).json(err);
  }
})

router.post('/', async (req, res) => {
  try {
    const newComp = await CompletedDates.create(req.body);
    console.log(req.user);
    res.status(200).json(newComp);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

module.exports = router;