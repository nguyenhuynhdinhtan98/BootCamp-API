const express = require("express");
const router = express.Router();
const {
  getBootCamp,
  getBootCamps,
  postBootCamps,
  putBootCamps,
  deleteBootCamps,
  getBootCampInRadius,
} = require("../controllers/bootcamps");
router.route("/").get(getBootCamps).post(postBootCamps);
router.route("/:id").get(getBootCamp).put(putBootCamps).delete(deleteBootCamps);
router.route("/:zipcode/:distance").get(getBootCampInRadius);
module.exports = router;
