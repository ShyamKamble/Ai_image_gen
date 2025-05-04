import express from "express";
import cors from "cors";
import 'dotenv/config';
import connectdb from "./config/mongodb.js";
import userRouter from "./routes/useroute.js";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
  }));
app.use(express.json());
app.use('/api/user',userRouter)
app.get("/", (req, res) => {
    res.send(`Server is working on port ${PORT} `);
});

const startServer = async () => {
    try {
        await connectdb(); // Connect to MongoDB
        app.listen(PORT, () => {
            console.log(`🚀 Server is running at http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("❌ Failed to connect to the database:", error.message);
        process.exit(1);
    }
};

startServer();
