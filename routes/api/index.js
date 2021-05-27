const router = require("express").Router();
const userRoutes = require("./user");
const goalRoutes = require("./goal");
const groupRoutes = require("./group");
const commentRoutes = require("./comment");

// User routes
router.use("/users", userRoutes);
router.use("/goals", goalRoutes);
router.use("/groups", groupRoutes);
router.use("/comments", commentRoutes);

module.exports = router;