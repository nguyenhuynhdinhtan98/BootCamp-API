const express = require("express");
const router = express.Router();
const {
  getBootCamp,
  getBootCamps,
  postBootCamps,
  putBootCamps,
  deleteBootCamps,
  getBootCampInRadius,
  uploadFile,
} = require("../controllers/bootcamps");

const BootCamp = require("../models/Bootcamp");
const advanceResuilt = require("../middleware/advanceResuilt");
//router into other routers
const courseRouter = require("./Course");

router.use("/:bootcampId/courses", courseRouter);

router
  .route("/")
  .get(advanceResuilt(BootCamp, "course"), getBootCamps)
  .post(postBootCamps);
router.route("/:id").get(getBootCamp).put(putBootCamps).delete(deleteBootCamps);
router.route("/:zipcode/:distance").get(getBootCampInRadius);
router.route("/:id/photo").put(uploadFile);
module.exports = router;
