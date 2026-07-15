import express from "express";
import { uploadDocument } from "../Controller/document.controller";
import uploadFile from "../middleware/document.middleware";

const route = express.Router()

route.post("/upload", uploadFile.single("document"), uploadDocument)

export default route