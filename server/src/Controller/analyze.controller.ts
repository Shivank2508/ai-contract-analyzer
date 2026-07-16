import { Request, Response } from "express";
import contractModel from "../modals/contract.model";
import { contractGraph } from "../graph/contract.graph";

export const analyzeDocument = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Ensure id is a single string
        const contractId = Array.isArray(id) ? id[0] : id;

        if (!contractId) {
            return res.status(400).json({ message: "Contract ID is required" });
        }

        const contract = await contractModel.findById(contractId);

        // Explicitly define the state with types or fallbacks to prevent 'never[]' and 'null'
        const state = {
            contractId: contractId,
            text: contract?.extractedText ?? "", // Fallback to empty string if null/undefined
            metadata: {},
            contractType: "",
            extractedInfo: {},
            clauses: [] as any[],          // Cast empty arrays to match your Graph state definitions
            risk: [] as any[],             // Replace 'any' with your actual Clause/Risk types if available
            missingClauses: [] as string[],
            riskScore: 0,
            summary: "",
            recommendations: [] as string[],
            errors: [] as string[]
        };

        const result = await contractGraph.invoke(state);

        return res.json({
            message: "ok",
            contract: result
        });
    } catch (err: any) {
        console.error(err);
        return res.status(400).json({
            message: err?.message || "An error occurred"
        });
    }
};
