const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Bootcamp = require("./models/Bootcamp");
//Config
dotenv.config({ path: `./config/config.env` });
mongoose.connect(process.env.URL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});
const bootcamps = JSON.parse(fs.readFileSync("./data/bootcamps.json", "utf-8"));
const importData = async () => {
  try {
    await Bootcamp.create(bootcamps);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};
const deleteData = async () => {
  try {
    await Bootcamp.deleteMany();
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

//importData();
//deleteData();

console.log(process.argv);
if (process.argv[2] === "-i") {
  importData();
} else if (process.argv[2] === "-d") {
  deleteData();
}
