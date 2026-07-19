import { Request, Response } from "express";
import path from "node:path";

import contractModel from "../modals/contract.model";
import { PdfParser } from "../parser/pdf.parser";
import { recursiveChunker } from "../services/recursive-chunker.service";
import { embeddingCunks } from "../services/embedding.service";
import { vectorStoreService } from "../services/vectorDb.service";

export const uploadDocument = async (
    req: Request,
    res: Response
): Promise<void> => {
    let contract: any = null;
    try {
        if (!req.file) {
            res.status(400).json({
                success: false,
                message: "No file uploaded",
            });
            return;
        }
        const file = req.file;
        // Step 1: Create Contract Record
        contract = await contractModel.create({
            userId: req.userId,
            fileName: path.basename(file.path),
            originalName: file.originalname,
            filePath: file.path,
            mimeType: file.mimetype,
            fileSize: file.size,
            pineconeNamespace: `contract_${Date.now()}`,
            status: "PROCESSING",
        });

        // Step 2: Parse PDF
        const parsedPdf = await PdfParser(file.path);

        await contractModel.findByIdAndUpdate(contract._id, {
            status: "CHUNKING",
            pages: parsedPdf.metadata.pages,
            extractedText: parsedPdf.text
        });

        // Step 3: Chunk
        const chunks = await recursiveChunker(
            parsedPdf.text,
            path.basename(file.path)
        );

        await contractModel.findByIdAndUpdate(contract._id, {
            status: "EMBEDDING",
            chunkCount: chunks.length,
        });

        // Step 4: Embeddings
        const embeddings = await embeddingCunks(chunks);

        await contractModel.findByIdAndUpdate(contract._id, {
            status: "INDEXING",
        });

        // Step 5: Store in Pinecone
        await vectorStoreService.addDocuments(
            embeddings,
            contract.pineconeNamespace
        );

        // Step 6: Mark Complete
        const updatedContract = await contractModel.findByIdAndUpdate(
            contract._id,
            {
                status: "COMPLETED",
                vectorCount: embeddings.length,
            },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "File uploaded successfully",
            data: updatedContract,
        });
    } catch (error) {
        console.error("Upload Error:", error);

        // Mark contract as failed
        if (contract) {
            await contractModel.findByIdAndUpdate(contract._id, {
                status: "FAILED",
            });
        }

        res.status(500).json({
            success: false,
            message: "Something went wrong while processing the document.",
        });
    }
};