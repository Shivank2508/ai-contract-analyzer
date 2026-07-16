import fs from "fs/promises";
import { cleanText } from "../services/text-cleaner.services";
import { PDFParse } from "pdf-parse";
import { DocumentData } from "../types/document.type";
import path from "path";

export const PdfParser = async (filepath: string): Promise<DocumentData> => {
    const buffer = await fs.readFile(filepath);

    const parser = new PDFParse({ data: buffer });

    const result = await parser.getText();

    return {
        text: cleanText(result.text),
        metadata: {
            pages: result.total,
            source: filepath,
            fileName: path.basename(filepath),
        },
    };
};