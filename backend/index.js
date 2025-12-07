import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import mainRouter from "./routes/index.js"; // ✅ include .js extension in ESM

const app = express();
dotenv.config();

app.use(express.json());
app.use(cors());

app.use("/api/v1", mainRouter);

// ✅ Example routes
// /api/v1/user/signup
// /api/v1/user/signin
// /api/v1/account/transfer
// /api/v1/account/balance

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect("mongodb+srv://vaibhavkr0908_db_user:Vaibhav@cluster0.rhlsymi.mongodb.net/paytm-app?retryWrites=true&w=majority");
    console.log("✅ Database connected successfully!");
  } catch (err) {
    console.error("❌ Database connection failed:", err.message);
  }
};

app.get("/", (req, res) => {
  res.json("Server is up and running 🚀");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  connectDB();
  console.log(`🚀 Server is running on port ${PORT}`);
});
