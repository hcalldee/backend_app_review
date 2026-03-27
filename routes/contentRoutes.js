const express = require("express");
const contentController = require("../controllers/contentController");
const contentCastRoutes = require("./contentCastRoutes");

const router = express.Router();

router.use("/:contentId/casts", contentCastRoutes);
router.get("/", contentController.getAllContents);
router.get("/:id", contentController.getContentById);
router.post("/", contentController.createContent);
router.put("/:id", contentController.updateContent);
router.delete("/:id", contentController.deleteContent);

module.exports = router;
