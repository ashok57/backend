const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(process.env.MONGO_DB_URL);
    console.log("db connected");
  } catch (e) {
    console.log("db not connected");
  }
};

module.exports = dbConnect;
