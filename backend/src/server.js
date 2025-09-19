import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// ✅ Middleware order matters!
app.use(cors({
  origin: "http://localhost:5173", // allow frontend
  credentials: true,               // optional if using cookies/auth
}));

app.use(express.json()); // parse JSON bodies
app.use(rateLimiter);

// ✅ Routes
app.use("/api/notes", notesRoutes);

// ✅ Start Server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server started on Port: ${PORT}`);
  });
});
