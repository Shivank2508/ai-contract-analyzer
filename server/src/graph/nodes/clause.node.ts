import { llmmModel, parseJsonFromModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { clausePrompt } from "../prompt/clause.prompt";
import { ClauseListSchema } from "../schema/clause.schema";

export async function clauseNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const result = await llmmModel.invoke([
            { role: "system", content: clausePrompt },
            { role: "user", content: state.text }
        ]);

        const parsed = parseJsonFromModel(result.content, ClauseListSchema);
        const clauses = Array.isArray(parsed.clauses) ? parsed.clauses : [];

        return {
            ...state,
            clauses
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