import { geminiEmbeddings } from "./llm-model.service";
import { Chunk } from "../types/chunk.type";

export async function embeddingCunks(chunks: Chunk[]) {
    const texts = chunks.map((chunk) => chunk.text);
    const vectors = await geminiEmbeddings.embedDocuments(texts);

    return chunks.map((chunk, index) => ({
        id: chunk.id,
        text: chunk.text,
        embedding: vectors[index],
        metadata: chunk.metadata
    }));
}

