const router = require("express").Router();
const userRoutes = require("./user");
const goalRoutes = require("./goal");
const groupRoutes = require("./group");
const commentRoutes = require("./comment");
const completedRoutes = require("./completeddate");
const pictureRoutes = require("./profilePicture");

// User routes
router.use("/users", userRoutes);
router.use("/goals", goalRoutes);
router.use("/groups", groupRoutes);
router.use("/comments", commentRoutes);
router.use("/completed", completedRoutes);
router.use("/profilePictures", pictureRoutes);

module.exports = router;