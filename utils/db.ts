import mongoose from "mongoose";

const db = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL!);
    console.log("MOngodb Connected!");
  } catch (error) {
    console.log("MOngodb  Not  Connected!");
  }
};

export default db;
