import z from "zod";

export const ClassificationSchema = z.object({
    contractType: z.string(),
})