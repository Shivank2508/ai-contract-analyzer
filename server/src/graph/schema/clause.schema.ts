// src/graph/schema/clause.schema.ts
import z from "zod";

export const ClauseSchema = z.object({
    title: z.string(),
    category: z.enum([
        "Termination", "Confidentiality", "Payment", "Non Compete",
        "Intellectual Property", "Liability", "Indemnity", "Warranty",
        "Arbitration", "Jurisdiction", "Force Majeure", "Renewal",
        "Privacy", "Dispute Resolution", "Other"
    ]),
    content: z.string(),
    riskLevel: z.enum(["Low", "Medium", "High"]),
});

// FIX: Wrap the array in an object matching what the LLM returns
export const ClauseListSchema = z.object({
    clauses: z.array(ClauseSchema)
});
