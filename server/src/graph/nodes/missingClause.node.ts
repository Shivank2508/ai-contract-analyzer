import { llmmModel, parseJsonFromModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { missingClausePrompt } from "../prompt/missingclause.prompt";
import { MissingClauseListSchema } from "../schema/missingClause.schema";

export async function missingClauseNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const result = await llmmModel.invoke([
            {
                role: "system",
                content: missingClausePrompt
            },
            {
                role: "user",
                content: JSON.stringify({
                    contractType: state.contractType,
                    clauses: state.clauses
                })
            }
        ]);

        const parsed = parseJsonFromModel(result.content, MissingClauseListSchema);
        const missingClauses = Array.isArray(parsed?.risks) ? parsed.risks : [];
        return {
            ...state,
            missingClauses
        };
    } catch (error) {
        console.log("Missing Clause Detection Failed", error)
        return {

            ...state,

            errors: [

                ...state.errors,

                "Missing Clause Detection Failed"

            ]

        };
    }
}