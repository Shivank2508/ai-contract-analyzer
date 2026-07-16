import { z } from "zod";

export const ExtractionSchema = z.object({

    contractTitle: z.string().optional().nullable(),

    employer: z.string().optional().nullable(),

    employee: z.string().optional().nullable(),

    client: z.string().optional().nullable(),

    vendor: z.string().optional().nullable(),

    effectiveDate: z.string().optional().nullable(),

    endDate: z.string().optional().nullable(),

    duration: z.string().optional().nullable(),

    payment: z.string().optional().nullable(),

    currency: z.string().optional().nullable(),

    noticePeriod: z.string().optional().nullable(),

    jurisdiction: z.string().optional().nullable(),

    governingLaw: z.string().optional().nullable(),

    confidentiality: z.boolean().optional().nullable(),

    nonCompete: z.string().optional().nullable(),

    termination: z.string().optional().nullable(),

    intellectualProperty: z.string().optional().nullable(),

    liability: z.string().optional().nullable(),

    disputeResolution: z.string().optional().nullable(),

});