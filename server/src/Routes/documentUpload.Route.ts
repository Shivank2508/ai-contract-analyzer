import express from "express";

import uploadFile from "../middleware/document.middleware";

import { protect } from "../middleware/auth.middleware";
import { getContracts } from "../Controller/getContracts";
import { getDashboard } from "../Controller/dashboard.controller";
import { chatController } from "../Controller/chat.controller";
import { analyzeDocument } from "../Controller/analyze.controller";
import { uploadDocument } from "../Controller/document.controller";

const route = express.Router();

route.get("/dashboard", protect, getDashboard);

route.post(
    "/upload",
    protect,
    uploadFile.single("document"),
    uploadDocument
);

route.get("/analyze/:id", protect, analyzeDocument);

route.get("/contracts", protect, getContracts);

// Chat with a contract
route.post("/contracts/:contract_id/chat", protect, chatController);

export default route;