const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get all casts route",
  });
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Get cast by id route",
    params: req.params,
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Create cast route",
    body: req.body,
  });
});

router.put("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Update cast route",
    params: req.params,
    body: req.body,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Delete cast route",
    params: req.params,
  });
});

module.exports = router;
