const express = require("express");
const contentController = require("../controllers/contentController");

const router = express.Router();

router.get("/", contentController.getAllContents);
router.get("/:id", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);

module.exports = router;
