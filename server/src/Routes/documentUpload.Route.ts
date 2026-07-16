import express from "express";
import { uploadDocument } from "../Controller/document.controller";
import uploadFile from "../middleware/document.middleware";
import { analyzeDocument } from "../Controller/analyze.controller";

const route = express.Router()

route.post("/upload", uploadFile.single("document"), uploadDocument)
route.get("/analyze/:id", analyzeDocument)

export default route