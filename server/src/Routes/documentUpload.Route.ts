import express from "express";
import { uploadDocument } from "../controller/document.controller";
import uploadFile from "../middleware/document.middleware";
import { analyzeDocument } from "../controller/analyze.controller";
import { protect } from "../middleware/auth.middleware";

const route = express.Router()

route.post("/upload", protect, uploadFile.single("document"), uploadDocument)
route.get("/analyze/:id", protect, analyzeDocument)

export default route