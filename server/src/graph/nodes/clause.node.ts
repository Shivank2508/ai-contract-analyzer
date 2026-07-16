import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { clausePrompt } from "../prompt/clause.prompt";
import { ClauseListSchema } from "../schema/clause.schema";

export async function clauseNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const structurellmModel = llmmModel.withStructuredOutput(ClauseListSchema)
        const result = await structurellmModel.invoke([
            { role: "system", content: clausePrompt },
            { role: "user", content: state.text }
        ])
        return {
            ...state,
            clauses: result.clauses
        }
    } catch (error) {
        console.log("Clause Classification Failed:", error)
        return {
            ...state,
            errors: [
                ...state.errors,
                "Clause Classification Failed"
            ]

        };
    }
}