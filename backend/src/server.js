import express from "express";
import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;



// Middleware
app.use(express.json());//this middleware is used to parse JSON bodies of incoming requests

app.use(rateLimiter);


//app.use((req, res, next) => {
  //console.log(`Req method is ${req.method} & Req URL is ${req.url}`);
  //next();
//});

// Routes
app.use("/api/notes", notesRoutes);

// Start Server
connectDB().then(()=>{
app.listen(PORT, () => {
  console.log(`🚀 Server started on Port: ${PORT}`);
});
});
