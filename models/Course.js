var mongoose = require("mongoose");
var bootcamp = require("./Bootcamp");
const CourseSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, "Please add title"],
  },
  description: { type: String, require: [true, "Please add description"] },
  tuition: { type: Number, require: [true, "Please add tuition"] },
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
//get avg of course tuitions
CourseSchema.statics.getAvgOfCourse = async function (bootcampId) {
  const obj = await this.aggregate()
    .match({ bootcamp: bootcampId })
    .group({ _id: "$bootcamp", averageCost: { $avg: "$tuition" } });
  try {
    await this.model("bootcamps").findByIdAndUpdate(bootcampId, {
      averageCost: Math.ceil(obj[0].averageCost / 10) * 10,
    });
  } catch (err) {
    console.error(err);
  }
};

// call get getAvgOfCourse after save
CourseSchema.post("save", function () {
  this.constructor.getAvgOfCourse(this.bootcamp);
}); // call get getAvgOfCourse before remove
CourseSchema.pre("remove", function () {
  this.constructor.getAvgOfCourse(this.bootcamp);
});

module.exports = mongoose.model("courses", CourseSchema);
