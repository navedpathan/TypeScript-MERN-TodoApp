import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("DB connected successfully");
  } catch (err) {
    console.error("DB connection failed", err);
  }
};

export default connectDB;
