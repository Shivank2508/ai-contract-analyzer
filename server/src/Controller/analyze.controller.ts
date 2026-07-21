import { Request, Response } from "express";
import contractModel from "../modals/contract.model";
import { contractGraph } from "../graph/contract.graph";
import analyzeModel from "../modals/analyze.model";

export const analyzeDocument = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        // Ensure id is a single string
        const contractId = Array.isArray(id) ? id[0] : id;

        if (!contractId) {
            return res.status(400).json({ message: "Contract ID is required" });
        }

        const contract = await contractModel.findById(contractId);
        if (!contract) {
            return res.status(404).json({
                message: "Contract not found",
            });
        }
        const existingAnalysis = await analyzeModel.findOne({ contractId }).lean();
        if (existingAnalysis) {
            return res.json({
                message: "ok",
                contract: existingAnalysis,
                cached: true
            });
        }

        // Explicitly define the state with types or fallbacks to prevent 'never[]' and 'null'
        const state = {
            contractId: contractId,
            text: contract?.extractedText ?? "", // Fallback to empty string if null/undefined
            metadata: {},
            contractType: "",
            extractedInfo: {},
            clauses: [] as any[],          // Cast empty arrays to match your Graph state definitions
            risk: [] as any[],             // Replace 'any' with your actual Clause/Risk types if available
            missingClauses: [] as any[],
            riskScore: 0,
            summary: "",
            recommendations: [] as any[],
            errors: [] as string[]
        };

        const result = await contractGraph.invoke(state);
        const analyzedContract = await analyzeModel.create({
            userId: contract.userId,
            contractId: result.contractId,
            text: result.text,
            metadata: result.metadata,
            contractType: result.contractType,
            extractedInfo: result.extractedInfo,
            clauses: result.clauses,
            risk: result.risk,
            missingClauses: result.missingClauses,
            riskScore: result.riskScore,
            summary: result.summary,
            recommendations: result.recommendations,
            errors: result.errors,
        });
        await contractModel.findByIdAndUpdate(contractId, {
            isAnalyzed: true,
            analyzedAt: new Date(),
        });
        return res.json({
            message: "ok",
            contract: analyzedContract
        });
    } catch (err: any) {
        console.error(err);
        return res.status(400).json({
            message: err?.message || "An error occurred"
        });
    }
};
