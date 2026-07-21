import { Request, Response } from "express";
import contractModel from "../modals/contract.model";
import analyzeModel from "../modals/analyze.model";
import userModel from "../modals/user.model";

export const getDashboard = async (
    req: Request,
    res: Response
): Promise<void> => {
    try {
        const userId = req?.userId;
        const user = await userModel.findById(userId)
        // Total uploaded contracts
        const totalContracts = await contractModel.countDocuments({
            userId,
        });

        // Uploaded but not analyzed
        const pendingAnalysis = await contractModel.countDocuments({
            userId,
            isAnalyzed: false,
        });

        // High Risk Contracts
        const highRisk = await analyzeModel.countDocuments({
            userId,
            riskScore: {
                $gte: 70,
            },
        });

        // Recent Contracts
        const recentContracts = await contractModel
            .find({
                userId,
            })
            .sort({
                createdAt: -1,
            })
            .limit(3)
            .select(
                "originalName status isAnalyzed createdAt analyzedAt"
            );

        // Risk Distribution
        const low = await analyzeModel.countDocuments({
            userId,
            riskScore: {
                $lt: 40,
            },
        });

        const medium = await analyzeModel.countDocuments({
            userId,
            riskScore: {
                $gte: 40,
                $lt: 70,
            },
        });

        const high = await analyzeModel.countDocuments({
            userId,
            riskScore: {
                $gte: 70,
            },
        });

        res.json({
            success: true,
            data: {
                user: {
                    name: user?.name
                },
                stats: {
                    totalContracts,
                    pendingAnalysis,
                    highRisk,
                    hoursSaved: totalContracts * 2.5,
                },
                riskDistribution: {
                    low,
                    medium,
                    high,
                },
                recentContracts,
            },
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Failed to load dashboard",
        });
    }
};