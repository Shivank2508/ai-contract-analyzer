import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { missingClausePrompt } from "../prompt/missingclause.prompt";
import { MissingClauseListSchema } from "../schema/missingClause.schema";

export async function missingClauseNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const structuredLLM =
            llmmModel.withStructuredOutput(
                MissingClauseListSchema
            );

        const result =
            await structuredLLM.invoke([

                {
                    role: "system",
                    content: missingClausePrompt
                },

                {
                    role: "user",
                    content: JSON.stringify({

                        contractType:
                            state.contractType,

                        clauses:
                            state.clauses

                    })

                }

            ]);

        return {

            ...state,

            missingClauses: result.risks

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