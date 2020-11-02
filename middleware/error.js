const ErrorResponse = require("../utils/errorResponse.js");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(error);

  //Mongoose validator
  if (err.code === 10000) {
    const message = "Value is duplicate";
    error = new ErrorResponse(message, 400);
  }

  //Mongoose duplicate
  if (err.code === "ValidationError") {
    const message = Object.values(err.message).map((val) => val.message);
    error = new ErrorResponse(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
  res.end();
};
module.exports = errorHandler;
