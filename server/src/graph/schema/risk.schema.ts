import z from "zod";

const RiskSchema = z.object({
    clauseTitle: z.string(),
    severity: z.enum([
        "Low",
        "Medium",
        "High"
    ]),
    riskType: z.string(),
    reason: z.string(),
    recommendation: z.string(),
    isNegotiable: z.boolean(),
});

// Changed from a raw array to a wrapped object
export const RiskListSchema = z.object({
    risks: z.array(RiskSchema)
});
