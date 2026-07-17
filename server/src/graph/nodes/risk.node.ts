import { llmmModel, parseJsonFromModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { riskPrompt } from "../prompt/risk.prompt";
import { RiskListSchema } from "../schema/risk.schema";

export async function riskNode(state: ContractState): Promise<ContractState> {
    try {
        const result = await llmmModel.invoke([
            { role: "system", content: riskPrompt },
            {
                role: "human",
                content: JSON.stringify(state.clauses, null, 2)
            }
        ]);

        const parsed = parseJsonFromModel(result.content, RiskListSchema);
        const risks = Array.isArray(parsed?.risks) ? parsed.risks : [];

        return {
            ...state,
            risk: risks
        };
    } catch (error) {
        console.error("Risk Analysis Failed", error);
        return {
            ...state,
            errors: [...state.errors, "Risk Analysis Failed"]
        };
    }
}

