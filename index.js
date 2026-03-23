import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { loggerMiddleware } from "./middleware/logger.middleware.js";

dotenv.config();

const app = express();

// fix __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// connect DB
connectDB();

// middlewares
app.use(cors());
app.use(express.json());
app.use(loggerMiddleware);

// 👇 THIS LINE SERVES YOUR FRONTEND
app.use(express.static(path.join(__dirname, "public")));

// routes
app.use("/users", authRoutes);

app.get("/", (req, res) => {
  res.send("API Running");
});

// error handler
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));