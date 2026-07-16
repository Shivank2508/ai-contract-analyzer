import z from "zod";

const MissingClauseSchema = z.object({
    clause: z.string(),
    importance: z.enum([
        "Critical",
        "Important",
        "Optional"
    ]),
    reason: z.string()
});

// Changed from a raw array to a wrapped object
export const MissingClauseListSchema = z.object({
    risks: z.array(MissingClauseSchema)
});
