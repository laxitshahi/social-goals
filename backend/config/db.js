const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`MongoDB has Connected ${conn.connection.host}`.cyan.underline); //.cyan.underline is from colors package
  } catch (error) {
    console.log(error);
    process.exit(1); //(1) for failure
  }
};

module.exports = connectDB;
