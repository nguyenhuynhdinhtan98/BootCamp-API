const Course = require("../models/Course");

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
