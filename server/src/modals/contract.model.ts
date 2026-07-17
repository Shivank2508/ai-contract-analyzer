import { Schema, model, Types } from "mongoose";

const ContractSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },

        fileName: {
            type: String,
            required: true,
        },

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