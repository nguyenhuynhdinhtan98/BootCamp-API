const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/error");
const app = express();
//Config
dotenv.config({ path: `./config/config.env` });
//Connection Database
connectDB();

// Route files
const router = require("./routers/Bootcamp.js");

//Error handle

// Body parser
app.use(express.json());

// Mount routers
app.use("/api/bootcamps", router);

app.use(errorHandler);
//Declare Port
const PORT = process.env.PORT || 5000;

//Run server
const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err}`.red.bold);
  // Close server & exit process
  server.close(() => process.exit(1));
});
