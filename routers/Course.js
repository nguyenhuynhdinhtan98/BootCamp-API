const express = require("express");
const { getCourse, getCourses, addCourse } = require("../controllers/courses");

const router = express.Router({ mergeParams: true });

router.route("/").get(getCourses).post(addCourse);
router.route("/:id").get(getCourse);
module.exports = router;
