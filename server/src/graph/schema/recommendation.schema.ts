import z from "zod";

const RecommendationSchema  = z.object({
    title: z.string(),
      priority: z.enum([
        "High",
        "Medium",
        "Low"
    ]),
    recommendation: z.string(),
    reason: z.string(),
});

// Changed from a raw array to a wrapped object
export const RecommendationListSchema  = z.object({
    risks: z.array(RecommendationSchema)
});
