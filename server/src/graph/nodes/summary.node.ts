import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { summaryPrompt } from "../prompt/summary.prompt.";

export async function summaryNode(
    state: ContractState
): Promise<ContractState> {
    try {
        const response = await llmmModel.invoke([

            {
                role: "system",
                content: summaryPrompt
            },

            {
                role: "user",
                content: JSON.stringify({

                    contractType: state.contractType,

                    extractedInfo: state.extractedInfo,

                    risks: state.risk,

                    missingClauses: state.missingClauses,

                    riskScore: state.riskScore

                })

            }

        ]);
        return {
            ...state,
            summary: response.content.toString()
        }
    } catch (error) {
        console.log("Summary Generation Failed", error)

        return {

            ...state,

            errors: [

                ...state.errors,

                "Summary Generation Failed"

            ]

        };

    }

}
