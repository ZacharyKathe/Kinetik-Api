const router = require("express").Router();
const userRoutes = require("./user");
const goalRoutes = require("./goal");

// User routes
router.use("/users", userRoutes);
router.use("/goals", goalRoutes);

module.exports = router;