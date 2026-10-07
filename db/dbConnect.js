const mongoose = require("mongoose");

const dbConnect = () => {
  try {
    mongoose.connect(
      "mongodb+srv://ashok:ashok@cluster0.kxkpuxs.mongodb.net/practice",
    );
    console.log("db connected");
  } catch (e) {
    console.log("db not connected");
  }
};

module.exports = dbConnect;
