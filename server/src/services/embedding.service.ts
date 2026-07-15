import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { Chunk } from "../types/chunk.type";

const embeddings = new GoogleGenerativeAIEmbeddings({
    model: "gemini-embedding-001",
    apiKey: process.env.GEMINI_API_KEY
})

export async function embeddingCunks(chunks: Chunk[]) {
    const texts = chunks.map((chunk) => chunk.text)
    const vectors = await embeddings.embedDocuments(texts)
    return chunks.map((chunk, index) => ({
        id: chunk.id,
        text: chunk.text,
        embedding: vectors[index],
        metadata: chunk.metadata
    }));

}
