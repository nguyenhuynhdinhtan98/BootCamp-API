const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const fileUpload = require("express-fileupload");
const connectDB = require("./config/db.js");
const errorHandler = require("./middleware/error");
const path = require("path");
const app = express();
//Config
dotenv.config({ path: `./config/config.env` });
//Connection Database
connectDB();

//app upload file
app.use(fileUpload());

//set static folder
app.use(express.static(path.join(__dirname, "public")));
// Route files
const routerBootcamp = require("./routers/Bootcamp");
const routerCourse = require("./routers/Course");

// Body parser
app.use(express.json());

// Mount routers
app.use("/api/bootcamps", routerBootcamp);
app.use("/api/courses", routerCourse);

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
