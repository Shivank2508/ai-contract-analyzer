import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { classificationPrompt } from "../prompt/classification.prompt";
import { ClassificationSchema } from "../schema/classification.schema";

export async function classificationNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const structuredLLm = llmmModel.withStructuredOutput(ClassificationSchema)

        const result = await structuredLLm.invoke([
            { role: "system", content: classificationPrompt },
            { role: "human", content: state.text }
        ])

        return {
            ...state,
            contractType: result.contractType

        }
    } catch (error) {
        console.log(error)
        throw error;
    }
}