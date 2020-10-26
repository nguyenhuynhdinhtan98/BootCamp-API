const ErrorResponse = require("../utils/errorResponse.js");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  // Log to console for dev
  console.log(error);

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
  });
  res.end();
};
module.exports = errorHandler;
