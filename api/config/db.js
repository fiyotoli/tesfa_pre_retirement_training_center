import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });

  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/employe-profile`);
    console.log("MongoDB connection established successfully");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1); // Exit the application in case of connection error
  }
};

export default connectDB;
