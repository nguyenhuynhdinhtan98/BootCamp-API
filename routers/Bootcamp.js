const express = require("express");
const router = express.Router();
const {
  getBootCamp,
  getBootCamps,
  postBootCamps,
  putBootCamps,
  deleteBootCamps,
} = require("../controllers/bootcamps");
router.route("/").get(getBootCamps).post(postBootCamps);
router.route("/:id").get(getBootCamp).put(putBootCamps).delete(deleteBootCamps);
module.exports = router;
