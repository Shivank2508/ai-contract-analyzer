import express from "express";
import cors from "cors";

const app = express();

// Allow requests from your React app
app.use(
    cors()
);

app.use(express.json());

export default app;