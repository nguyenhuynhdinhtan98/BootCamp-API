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

//router into other routers
const courseRouter = require("./Course");

router.use("/:bootcampId/courses", courseRouter);

router.route("/").get(getBootCamps).post(postBootCamps);
router.route("/:id").get(getBootCamp).put(putBootCamps).delete(deleteBootCamps);
router.route("/:zipcode/:distance").get(getBootCampInRadius);
router.route("/:id/photo").put(uploadFile);
module.exports = router;
