import { Request, Response } from "express";
import contractModel from "../modals/contract.model";

export const getContracts = async (req: Request, res: Response) => {
    try {
        const allContracts = await contractModel
            .find({ userId: req?.userId })
            .sort({ createdAt: -1 }); // Latest first

        res.json({
            status: "ok",
            contracts: allContracts,
        });
    } catch (error) {
        console.log(error);
        res.status(400).json({
            message: `Something went wrong :- ${error}`,
        });
    }
};