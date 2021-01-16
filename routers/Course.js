const express = require("express");
const {
  getCourse,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
} = require("../controllers/courses");
const Course = require("../models/Course");
const advanceResuilt = require("../middleware/advanceResuilt");
const router = express.Router({ mergeParams: true });

router
  .route("/")
  .get(
    advanceResuilt(Course, {
      path: "bootcamp",
      select: "name description",
    }),
    getCourses
  )
  .post(addCourse);
router.route("/:id").get(getCourse).put(updateCourse).delete(deleteCourse);
module.exports = router;
