import { Schema, model } from "mongoose";

const AnalyzeContractSchema = new Schema(
    {
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
                type: String,
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
                type: String,
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