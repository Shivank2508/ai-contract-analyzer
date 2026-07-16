

import { llmmModel } from "../../services/llm-model.service";
import { ContractState } from "../contract.state";
import { recommendationPrompt } from "../prompt/recommendation.prompt";
import { RecommendationListSchema } from "../schema/recommendation.schema";

export async function recommendationNode(

    state: ContractState

): Promise<ContractState> {

    try {

        const structuredLLM =

            llmmModel.withStructuredOutput(

                RecommendationListSchema

            );

        const result =

            await structuredLLM.invoke([

                {

                    role: "system",

                    content:
                        recommendationPrompt

                },

                {

                    role: "user",

                    content: JSON.stringify({

                        contractType:
                            state.contractType,

                        extractedInfo:
                            state.extractedInfo,

                        risks:
                            state.risk,

                        missingClauses:
                            state.missingClauses,

                        riskScore:
                            state.riskScore

                    })

                }

            ]);

        return {

            ...state,

            recommendations: result.risks

        };

    }

    catch {

        return {

            ...state,

            errors: [

                ...state.errors,

                "Recommendation Generation Failed"

            ]

        };

    }

}