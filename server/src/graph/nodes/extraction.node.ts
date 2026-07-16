import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { extractionPrompt } from "../prompt/extraction.prompt";
import { ExtractionSchema } from "../schema/extraction.schema";

export async function extractionNode(
    state: ContractState
): Promise<ContractState> {
    try {

        const structuredLLM =
            llmmModel.withStructuredOutput(ExtractionSchema);

        const result = await structuredLLM.invoke([
            {
                role: "system",
                content: extractionPrompt,
            },
            {
                role: "user",
                content: state.text,
            },
        ]);

        return {

            ...state,
            extractedInfo: result,


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