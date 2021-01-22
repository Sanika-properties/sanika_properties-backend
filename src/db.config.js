require("dotenv").config();
const app = require("express")();
const mongoose = require("mongoose");
const url = process.env.DBURL || "mongodb://localhost:27017/sanika-properties";

module.exports = async function connectDb() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log("connected to DB");
  } catch (error) {
    console.log(error.message);
  }
};
