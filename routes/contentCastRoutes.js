const express = require("express");
const contentCastController = require("../controllers/contentCastController");

const router = express.Router({ mergeParams: true });

router.get("/", contentCastController.getCastsByContent);
router.post("/", contentCastController.addCastToContent);
router.delete("/:castId", contentCastController.removeCastFromContent);

module.exports = router;

