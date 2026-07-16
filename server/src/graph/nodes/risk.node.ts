import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { riskPrompt } from "../prompt/risk.prompt";
import { RiskListSchema } from "../schema/risk.schema";

export async function riskNode(state: ContractState): Promise<ContractState> {
    try {
        // Pass method: "jsonMode" to enforce clean JSON formatting from Groq
        const structurellm = llmmModel.withStructuredOutput(RiskListSchema);

        const result = await structurellm.invoke([
            { role: "system", content: riskPrompt },
            {
                role: "human",
                content: JSON.stringify(state.clauses, null, 2)
            }
        ]);

        return {
            ...state,
            // Extract the array from the root object wrapper
            risk: result?.risks || []
        };
    } catch (error) {
        console.error("Risk Analysis Failed", error);
        return {
            ...state,
            errors: [...state.errors, "Risk Analysis Failed"]
        };
    }
}

