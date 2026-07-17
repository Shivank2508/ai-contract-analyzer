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
            missingClauses: [] as string[],
            riskScore: 0,
            summary: "",
            recommendations: [] as string[],
            errors: [] as string[]
        };

        const result = await contractGraph.invoke(state);

        const normalizeArrayField = (value: unknown): string[] => {
            if (Array.isArray(value)) {
                return value.map((item) => String(item));
            }

            if (typeof value === "string") {
                const trimmed = value.trim();
                if (!trimmed) {
                    return [];
                }

                try {
                    const parsed = JSON.parse(trimmed);
                    if (Array.isArray(parsed)) {
                        return parsed.map((item) => String(item));
                    }
                } catch {
                    // fallback for values like "[\n { ... } ]" or other literal-like strings
                }

                const arrayLikeMatch = trimmed.match(/^\[([\s\S]*)\]$/);
                if (arrayLikeMatch) {
                    const inner = arrayLikeMatch[1];
                    const candidateItems = inner
                        .split(/\n|\r/)
                        .map((part) => part.trim())
                        .filter(Boolean)
                        .map((part) => part.replace(/^\{/, "").replace(/\}$/, "").trim());

                    if (candidateItems.length) {
                        return candidateItems.map((item) => item.replace(/,$/, ""));
                    }
                }

                return [trimmed];
            }

            return [];
        };

        const normalizedMissingClauses = normalizeArrayField(result.missingClauses);
        const normalizedRecommendations = normalizeArrayField(result.recommendations);

        const analyzedContract = await analyzeModel.create({

            contractId: result.contractId,
            text: result.text,
            metadata: result.metadata,
            contractType: result.contractType,
            extractedInfo: result.extractedInfo,
            clauses: result.clauses,
            risk: result.risk,
            missingClauses: normalizedMissingClauses,
            riskScore: result.riskScore,
            summary: result.summary,
            recommendations: normalizedRecommendations,
            errors: result.errors,
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
