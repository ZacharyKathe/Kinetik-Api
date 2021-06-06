const router = require("express").Router();
const userRoutes = require("./user");
const goalRoutes = require("./goal");
const groupRoutes = require("./group");
const commentRoutes = require("./comment");
const completedRoutes = require("./completeddate");

// User routes
router.use("/users", userRoutes);
router.use("/goals", goalRoutes);
router.use("/groups", groupRoutes);
router.use("/comments", commentRoutes);
router.use("/completed", completedRoutes);

module.exports = router;