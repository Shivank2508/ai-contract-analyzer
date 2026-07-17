

import { llmmModel, parseJsonFromModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { recommendationPrompt } from "../prompt/recommendation.prompt";
import { RecommendationListSchema } from "../schema/recommendation.schema";

export async function recommendationNode(

    state: ContractState

): Promise<ContractState> {

    try {
        const result = await llmmModel.invoke([
            {
                role: "system",
                content: recommendationPrompt
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

        const parsed = parseJsonFromModel(result.content, RecommendationListSchema);
        const recommendations = Array.isArray(parsed?.risks) ? parsed.risks : [];

        return {
            ...state,
            recommendations
        };

    }

    catch (error) {
        console.log("Recommendation Generation Failed", error)

        return {

            ...state,

            errors: [

                ...state.errors,

                "Recommendation Generation Failed"

            ]

        };

    }

}