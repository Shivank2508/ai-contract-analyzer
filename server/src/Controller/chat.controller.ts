import { Request, Response } from "express";
import contractModel from "../modals/contract.model";
import { embeddedQuestion } from "../services/embedding.service";
import { vectorStoreService } from "../services/vectorDb.service";
import { askContractQuestion } from "../services/chatAi.service";

export const chatController = async (req: Request, res: Response) => {
    try {
        const { contract_id } = req.params;
        const { question } = req.body;

        if (!question) {
            return res.status(400).json({
                success: false,
                message: "Question is required",
            });
        }

        const contract = await contractModel.findById(contract_id);

        if (!contract) {
            return res.status(404).json({
                success: false,
                message: "Contract not found",
            });
        }
if (!contract.pineconeNamespace) {
    return res.status(400).json({
        success: false,
        message: "Pinecone namespace missing",
    });
}
        // Create embedding for user's question
        const questionEmbedding = await embeddedQuestion(question);

        // Search similar chunks
        const matches = await vectorStoreService.searchDocuments(
            questionEmbedding,
            contract.pineconeNamespace
        );

        if (!matches || matches.length === 0) {
            return res.json({
                success: true,
                answer: "I couldn't find that information in the contract.",
            });
        }

        // Build context
        const context = matches
            .map((match: any) => match.metadata.text)
            .join("\n\n");

        // Ask LLM
        const answer = await askContractQuestion(context, question);

        return res.json({
            success: true,
            answer,
            sources: matches.map((match: any) => ({
                score: match.score,
                page: match.metadata.page,
                clause: match.metadata.clause,
            })),
        });
    } catch (err: any) {
        console.error(err);

        return res.status(500).json({
            success: false,
            message: err.message || "Internal server error",
        });
    }
};
