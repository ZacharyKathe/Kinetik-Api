const path = require("path");
const router = require("express").Router();
const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const groupRoutes = require("./group-routes");


// Home routes
router.use('/', homeRoutes);

// Group Routes
router.use('/groups', groupRoutes)
// API Routes
router.use("/api", apiRoutes);


module.exports = router;