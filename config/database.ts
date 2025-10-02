import mongoose from "mongoose";
let connected = false; // Track the connection status

const connectToDatabase = async () => {
    mongoose.set('strictQuery', true); // Add this line to suppress the warning
  if (connected) {
    console.log("Already connected to the database.");
    return;
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in environment variables");
  }
  
  try {
    await mongoose.connect(process.env.MONGO_URI);
    connected = true;
    console.log("Connected to the database.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

export default connectToDatabase;