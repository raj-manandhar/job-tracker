import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB", mongoose.connection.host);
  } catch (error) {
    console.log("Unable to connect to MongoDB", error);
    process.exit(1);
  }
};

export default connectDB;
