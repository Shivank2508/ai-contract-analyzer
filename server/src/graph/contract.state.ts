import { Annotation } from "@langchain/langgraph";
import { z } from "zod";
import { ExtractionSchema } from "./schema/extraction.schema"; // Adjust path if needed

// 1. Infer the TypeScript type from your Zod schema
type ExtractionInfoType = z.infer<typeof ExtractionSchema>;

// 2. Runtime object used by StateGraph constructor
export const ContractStateAnnotation = Annotation.Root({
    contractId: Annotation<string>(),
    text: Annotation<string>(),
    metadata: Annotation<any>(),
    contractType: Annotation<any>(),

    // CHANGE THIS: Pass the inferred schema type instead of string
    extractedInfo: Annotation<ExtractionInfoType>(),

    clauses: Annotation<any[]>(),
    risk: Annotation<any[]>(),
    missingClauses: Annotation<any[]>(),
    riskScore: Annotation<number>(),
    summary: Annotation<string>(),
    recommendations: Annotation<any[]>(),
    errors: Annotation<string[]>()
});

// 3. TypeScript type used by your node parameters
export type ContractState = typeof ContractStateAnnotation.State;
