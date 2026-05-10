import mongoose from "mongoose";

export const dbConnection = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in config/config.env");
  }

  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "MAJORPROJECT",
    });
    console.log("Connected to database.");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    throw error;
  }
};
