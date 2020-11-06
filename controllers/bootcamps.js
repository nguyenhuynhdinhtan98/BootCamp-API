const asyncHandler = require("../middleware/async");
const bootcamp = require("../models/Bootcamp");
const errorResponse = require("../utils/errorResponse.js");
const geocoder = require("../utils/Geolocation.js");
//const slugify = require("../utils/slugify.js");
const getBootCamps = asyncHandler(async (req, res, next) => {
  const resuilt = await bootcamp.find();
  res.status(201).json({ success: true, message: resuilt });
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
  res.status(200).json({ success: true, message: resuilt });
});
const getBootCampInRadius = asyncHandler(async (req, res, next) => {
  const { zipcode, distance } = req.params;
  const loc = await geocoder.geocode(zipcode);
  const la = loc[0].latitude;
  const lo = loc[0].longitude;
  const radius = distance / 6378.1;
  const resuilt = await bootcamp.find({
    location: {
      $geoWithin: { $centerSphere: [[la, lo], radius] },
    },
  });
  res.status(200).json({
    success: true,
    count: resuilt.length,
    data: resuilt,
  });
});
module.exports = {
  getBootCamps,
  getBootCamp,
  postBootCamps,
  putBootCamps,
  deleteBootCamps,
  getBootCampInRadius,
};
