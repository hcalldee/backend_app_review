const express = require("express");
const publisherController = require("../controllers/publisherController");

const router = express.Router();

router.get("/", publisherController.getAllPublishers);
router.post("/search", publisherController.searchPublishers);
router.get("/:id", publisherController.getPublisherById);
router.post("/", publisherController.createPublisher);
router.put("/:id", publisherController.updatePublisher);
router.delete("/:id", publisherController.deletePublisher);

module.exports = router;
