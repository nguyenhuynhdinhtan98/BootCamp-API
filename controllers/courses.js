const Course = require("../models/Course");
const Bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse.js");
const asyncHandler = require("../middleware/async");

exports.getCourses = asyncHandler(async (req, res, next) => {
  let query;

  if (req.params.bootcampId) {
    query = Course.find({ bootcamp: req.params.bootcampId });
  } else {
    query = Course.find();
  }
  const resuilt = await query;
  res.status(201).json({
    success: true,
    count: resuilt.length,
    message: resuilt,
  });
});
exports.getCourse = asyncHandler(async (req, res, next) => {
  let query = await Course.findById(req.params.id).populate({
    path: "bootcamp",
    select: "name description",
  });

  console.log(query);
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
