import { calculateRiskScore } from "../../services/riskScore.service";
import { ContractState } from "../contract.state";

export async function riskScoreNode(
    state: ContractState
): Promise<ContractState> {

    try {

        const score =
            calculateRiskScore(

                state.risk,

                state.missingClauses

            );

        return {

            ...state,

            riskScore: score

        };

    }

    catch {

        return {

            ...state,

            errors: [

                ...state.errors,

                "Risk Score Calculation Failed"

            ]

        };

    }

}