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
  } catch (error) {
    console.log(error);
  }
};
importData();
