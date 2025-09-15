// Backend/index.js
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import {notFound, errorHandler} from "./middleware/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config(); // Load .env file
connectDB();

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(morgan("dev"));  // Logging

app.use('/auth', authRoutes)

// Basic test route
app.get("/", (req, res) => {
    res.send("📚 Library Management System Backend is running...");
});

app.use(notFound);
app.use(errorHandler);
// Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
);
