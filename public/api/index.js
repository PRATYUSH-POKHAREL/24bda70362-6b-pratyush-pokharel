import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { connectDB } from "../config/db.js";
import authRoutes from "../routes/auth.routes.js";
import { errorMiddleware } from "../middleware/error.middleware.js";

dotenv.config();

const app = express();

// connect DB (IMPORTANT: only once)
let isConnected = false;
const connect = async () => {
  if (!isConnected) {
    await connectDB();
    isConnected = true;
  }
};

app.use(cors());
app.use(express.json());

// routes
app.use("/users", async (req, res, next) => {
  await connect();
  next();
}, authRoutes);

app.use(errorMiddleware);

// 👇 THIS IS IMPORTANT (NO app.listen)
export default app;