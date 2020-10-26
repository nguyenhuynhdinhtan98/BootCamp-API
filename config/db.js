const mongoose = require("mongoose");

const connectDB = async () => {
  const conn = await mongoose.connect(process.env.URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });
  console.log(
    "Connected to MongoDB at " + process.env.PORT + conn.connection.host
  );
};
module.exports = connectDB;
