const express = require("express");
const bootcamp = require("../models/Bootcamp");
const ErrorResponse = require("../utils/errorResponse.js");
const getBootCamps = async (req, res, next) => {
  try {
    const resuilt = await bootcamp.find();
    res.status(201).json({ success: true, message: resuilt });
  } catch (error) {
    next(error);
  }
};
const getBootCamp = async (req, res, next) => {
  try {
    const resuilt = await bootcamp.findById(req.params.id);
    if (!resuilt) {
      return next(
        new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
      );
    }
    res.status(201).json({ success: true, message: resuilt });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
const postBootCamps = async (req, res, next) => {
  try {
    await bootcamp.create(req.body);
    res.status(201).json({ success: true, message: "POST ", data: req.body });
  } catch (error) {
    next(error);
  }
};
const putBootCamps = async (req, res, next) => {
  try {
    const resuilt = await bootcamp.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ success: true, message: resuilt });
  } catch (error) {
    next(error);
  }
};
const deleteBootCamps = async (req, res, next) => {
  try {
    const resuilt = await bootcamp.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: resuilt });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getBootCamps,
  getBootCamp,
  postBootCamps,
  putBootCamps,
  deleteBootCamps,
};
