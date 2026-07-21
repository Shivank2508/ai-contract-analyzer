import { Schema, Types, model } from "mongoose";

const AnalyzeContractSchema = new Schema(
    {
        userId: {
            type: Types.ObjectId,
            ref: "User",
            required: true,
            index: true,
        },
        contractId: {
            type: String,
            required: true,
        },

        text: {
            type: String,
            required: true,
        },

        metadata: {
            type: Schema.Types.Mixed,
        },

        contractType: {
            type: String,
        },

        extractedInfo: {
            type: Schema.Types.Mixed,
        },

        clauses: [
            {
                type: Schema.Types.Mixed,
            },
        ],

        risk: [
            {
                type: Schema.Types.Mixed,
            },
        ],

        missingClauses: [
            {
                type: Schema.Types.Mixed,
            },
        ],
        riskScore: {
            type: Number,
            default: 0,
        },

        summary: {
            type: String,
        },

        recommendations: [
            {
                type: Schema.Types.Mixed,
            },
        ],

        errors: [
            {
                type: String,
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default model("AnalyzeContract", AnalyzeContractSchema);