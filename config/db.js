import mongoose from "mongoose";

const mongo_URI = process.env.MONGO_URI;

const connectDb = async () => {
  try {
    mongoose.connection.on('connected', () => {
      console.log("Database Connected Successfully");
    });

    await mongoose.connect(mongo_URI);
  } catch (error) {
    console.error("Database connection failed");
    console.error(error.message);
  }
};

export default connectDb;
