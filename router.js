const express = require("express");
const router = express.Router();
router.get("/:id", (req, res) => {
  res.status(200).json({ success: true, message: req.params.id });
});
router.post("/", (req, res) => {
  res.status(200).json({ success: true, message: "POST " });
});
router.put("/:id", (req, res) => {
  res.status(200).json({ success: true, message: "Put " + req.params.id });
});
router.delete("/:id", (req, res) => {
  res.status(200).json({ success: true, message: "Delete " + req.params.id });
});
module.exports = router;
