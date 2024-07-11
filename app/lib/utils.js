import mongoose from "mongoose";

export const connectToDB = async () => {
  if (mongoose.connections[0].readyState) return ;
  console.log("Connecting to MongoDB");

  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Connected to MongoDB");
  } catch (err) {
    throw new Error("failed to connect to database");
  }
};

export default connectToDB;

