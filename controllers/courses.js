const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");

exports.getCourse = asyncHandler(async (req, res, next) => {
  let query = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  // console.log(query);
  if (!query) {
    return next(
      new errorResponse(`No course with the id of ${req.params.id}`),
      404
    );
  }
  const resuilt = await query;
  res.status(201).json({
    success: true,
    count: resuilt.length,
    message: resuilt,
  });
});
exports.getCourses = asyncHandler(async (req, res, next) => {
  if (req.params.id) {
    let resuilt = await Course.findById(req.params.id);
    res.status(201).json({
      success: true,
      count: resuilt.length,
      message: resuilt,
    });
  } else {
    res.status(201).json(res.advanceResuilt);
  }
});
exports.addCourse = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  const bootcamp = await Bootcamp.findById(req.params.bootcampId);
  if (!bootcamp) {
    return next(
      new errorResponse(
        `No bootcamp with the id of ${req.params.bootcampId}`,
        404
      )
    );
  }
  const course = await Course.create(req.body);
  res.status(200).json({
    success: true,
    data: course,
  });
});
exports.updateCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new errorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: course,
  });
});
exports.deleteCourse = asyncHandler(async (req, res, next) => {
  let course = await Course.findById(req.params.id);
  if (!course) {
    return next(
      new errorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }
  course = await Course.findByIdAndDelete(req.params.id);
  res.status(200).json({
    success: true,
    data: course,
  });
});
