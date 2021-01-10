const asyncHandler = require("../middleware/async");
const path = require("path");
const bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse.js");
const geocoder = require("../utils/Geolocation.js");
//const slugify = require("../utils/slugify.js");
const getBootCamps = asyncHandler(async (req, res, next) => {
  let query;

  //Copy request.query
  let queryStr = { ...req.query };
  const removeField = ["select", "sort", "page", "limit"];
  removeField.forEach((item) => delete queryStr[item]);
  // console.log(queryStr);
  //Create Operator
  queryStr = JSON.stringify(queryStr).replace(
    /\b(gt|gte|lt|lte|in)\b/g,
    (match) => `$${match}`
  );

  //Find JSON with sort
  query = bootcamp.find(JSON.parse(queryStr)).populate("courses");

  // query select
  if (req.query.select) {
    const fields = req.query.select.split(",").join(" ");
    query = query.select(fields);
  }
  // query sort
  if (req.query.sort) {
    const fields = req.query.sort.split(",").join(" ");
    query = query.sort(fields);
  } else {
    query = query.sort("-createdAt");
  }
  //page
  let page = parseInt(req.query.page, 10) || 1;

  //limit
  let limit = parseInt(req.query.limit, 10) || 25;

  let startIndex = (page - 1) * limit;

  let endIndex = page * limit;

  const total = await bootcamp.countDocuments();

  query = query.skip(startIndex).limit(limit);
  //pagination resuilt
  const pagination = {};

  if (endIndex < total) {
    pagination.next = { page: page + 1, limit };
  }
  if (startIndex > 0) {
    pagination.pre = { page: page - 1, limit };
  }

  const resuilt = await query;

  res.status(201).json({
    success: true,
    count: resuilt.length,
    pagination,
    message: resuilt,
  });
});
const getBootCamp = asyncHandler(async (req, res, next) => {
  const resuilt = await bootcamp.findById(req.params.id);
  if (!resuilt) {
    return next(
      new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  res.status(201).json({ success: true, message: resuilt });

  console.log(error);
  next(error);
});
const postBootCamps = asyncHandler(async (req, res, next) => {
  await bootcamp.create(req.body);
  res.status(201).json({ success: true, message: "POST ", data: req.body });
});
const putBootCamps = asyncHandler(async (req, res, next) => {
  const resuilt = await bootcamp.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({ success: true, message: resuilt });
});
const deleteBootCamps = asyncHandler(async (req, res, next) => {
  const resuilt = await bootcamp.findByIdAndDelete(req.params.id);

  resuilt.remove();
  res.status(200).json({ success: true, message: resuilt });
});

let milesToRadian = function (miles) {
  var earthRadiusInMiles = 3963;
  return miles / earthRadiusInMiles;
};

const getBootCampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const la = loc[0].latitude;
  const lo = loc[0].longitude;
  const radius = milesToRadian(distance);
  const resuilt = await bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[la, lo], radius] },
    },
  });
  console.log(resuilt, la, lo, radius);
  res.status(200).json({
    success: true,
    count: resuilt.length,
    data: resuilt,
  });
});

const uploadFile = asyncHandler(async (req, res, next) => {
  const resuilt = await bootcamp.findById(req.params.id);
  if (!resuilt) {
    return next(
      new errorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }
  console.log(req.files);
  if (!req.files) {
    return next(
      new errorResponse(`Please upload file with ${req.params.id}`, 404)
    );
  }
  const file = req.files.file;

  //make you sure photo
  if (!file.mimetype.startsWith("image")) {
    return next(
      new errorResponse(
        `Please upload file or image with ${req.params.id}`,
        404
      )
    );
  }

  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new errorResponse(
        `Please upload file size < ${process.env.MAX_FILE_UPLOAD}`,
        404
      )
    );
  }
  const photoName = `photo_${resuilt.id}${path.parse(file.name).ext}`;
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${photoName}`, async (err) => {
    if (err) {
      return next(new errorResponse(err, 404));
    }
    await bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });
    if (resuilt) res.status(200).json({ success: true, message: photoName });
  });
});
module.exports = {
  getBootCamps,
  getBootCamp,
  postBootCamps,
  putBootCamps,
  deleteBootCamps,
  getBootCampInRadius,
  uploadFile,
};
