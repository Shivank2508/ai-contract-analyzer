import { llmmModel, parseJsonFromModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { classificationPrompt } from "../prompt/classification.prompt";
import { ClassificationSchema } from "../schema/classification.schema";

export async function classificationNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const contractText = typeof state.text === "string" && state.text.trim().length > 0
            ? state.text
            : "No contract text provided.";

        const result = await llmmModel.invoke([
            { role: "system", content: classificationPrompt },
            { role: "human", content: contractText }
        ]);

        const parsed = parseJsonFromModel(result.content, ClassificationSchema);
        const contractType = parsed.contractType || "Other";

        return {
            ...state,
            contractType
        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}