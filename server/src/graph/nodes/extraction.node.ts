import { llmmModel, parseJsonFromModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { extractionPrompt } from "../prompt/extraction.prompt";
import { ExtractionSchema } from "../schema/extraction.schema";

export async function extractionNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const result = await llmmModel.invoke([
            {
                role: "system",
                content: extractionPrompt,
            },
            {
                role: "user",
                content: state.text,
            },
        ]);

        const parsed = parseJsonFromModel(result.content, ExtractionSchema);
        const extractedInfo = parsed && typeof parsed === "object" ? parsed : {};

        return {
            ...state,
            extractedInfo,
        };

    } catch (error) {
        console.log("LLM Extraction failed:", error)
        return {
            ...state,
            errors: [
                ...state.errors,
                "Information Extraction Failed",
            ],

        };

    }
}