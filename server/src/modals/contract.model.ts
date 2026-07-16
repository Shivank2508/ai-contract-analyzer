import { Schema, model } from "mongoose";

const ContractSchema = new Schema(
    {
        fileName: String,
        originalName: String,
        filePath: String,
        mimeType: String,
        fileSize: Number,
        extractedText: String,
        pages: Number,
        chunkCount: Number,
        vectorCount: Number,

        pineconeNamespace: String,

        status: {
            type: String,
            enum: [
                "UPLOADING",
                "PROCESSING",
                "CHUNKING",
                "EMBEDDING",
                "COMPLETED",
                "FAILED",
            ],
            default: "PROCESSING",
        },
    },
    {
        timestamps: true,
    }
);
export default model("Contract", ContractSchema);