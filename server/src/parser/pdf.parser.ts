import fs from "fs/promises";
import path from "path";
import { PDFParse } from "pdf-parse";
import { cleanText } from "../services/text-cleaner.services";
import { DocumentData } from "../types/document.type";

export const PdfParser = async (filepath: string): Promise<DocumentData> => {
    const buffer = await fs.readFile(filepath)
    const parser = new PDFParse({ data: buffer })

    const result = await parser.getText()
    const cleaned = cleanText(result.text);
    return {
        text: cleaned,
        metadata: {
            pages: result.total,
            source: filepath,
            fileName: path.basename(filepath),
        },
    };
}
