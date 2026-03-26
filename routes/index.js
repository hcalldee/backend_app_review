const express = require("express");
const contentRoutes = require("./contentRoutes");
const publisherRoutes = require("./publisherRoutes");
const castRoutes = require("./castRoutes");
const reviewRoutes = require("./reviewRoutes");

const router = express.Router();

router.use("/contents", contentRoutes);
router.use("/publishers", publisherRoutes);
router.use("/casts", castRoutes);
router.use("/reviews", reviewRoutes);

module.exports = router;
