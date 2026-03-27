const express = require("express");
const castController = require("../controllers/castController");

const router = express.Router();

router.get("/", castController.getAllCasts);
router.post("/search", castController.searchCasts);
router.get("/:id", castController.getCastById);
router.post("/", castController.createCast);
router.put("/:id", castController.updateCast);
router.delete("/:id", castController.deleteCast);

module.exports = router;
