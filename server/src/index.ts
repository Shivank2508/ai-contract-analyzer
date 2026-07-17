import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cors from "cors"; // 🟢 ADDED: Import CORS

import documentUpload from "./Routes/documentUpload.Route"
import { connectToMongodb } from "./db/connection"
import authRoute from "./Routes/auth.route"

const app = express();

// 🟢 ADDED: Apply CORS middleware BEFORE your routes
app.use(
    cors({
        origin: "http://localhost:5173", // Replace with your exact React URL
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        message: "working fine"
    })
})

app.use("/api/document", documentUpload)
app.use("/api/auth", authRoute)

const PORT = process.env.PORT || 5000 // 🟢 Added fallback port just in case

connectToMongodb()
    .then(() => app.listen(PORT, () => {
        console.log(`port is running on ${PORT}`)
    })
    ).catch((err) => {
        console.error("MongoDB connection failed:", err);
        process.exit(1);
    });
