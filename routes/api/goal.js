const router = require("express").Router();
const goalController = require("../../controllers/goalController");

// Matches with "/api/goals"
router.route("/")
  .get(goalController.findAll)
  .post(goalController.create);

// Matches with "/api/goals/:id"
router
  .route("/:id")
  .get(goalController.findById)
  .put(goalController.update)
  .delete(goalController.remove);

module.exports = router;