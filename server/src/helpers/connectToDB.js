const mongoose = require("mongoose");

module.exports = async function connectToDB() {
  try {
    const connectionString = process.env.MONGO_URI;
    await mongoose.connect(connectionString);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};
