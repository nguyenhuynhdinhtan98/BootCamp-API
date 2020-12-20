var mongoose = require("mongoose");
var bootcamp = require("./Bootcamp");
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title"],
  },
  description: { type: String, require: [true, "Please add description"] },
  tuition: { type: String, require: [true, "Please add tuition"] },
  miniumskill: {
    type: String,
    require: [true, "Please add miniumskill"],
    enum: ["beginner", "intermediate", "advanced"],
  },
  scholarhipsAvailable: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  bootcamp: {
    type: mongoose.Schema.ObjectId,
    ref: "bootcamps",
    required: true,
  },
});
module.exports = mongoose.model("Course", CourseSchema);
