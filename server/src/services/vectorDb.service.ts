import { Pinecone } from '@pinecone-database/pinecone';
import { EmbeddedChunk } from '../types/embedding.type';

const pc = new Pinecone({
    apiKey: `${process.env.PINECONE_API_KEY}`
});
const index = pc.index('ai-contract-analyzer');



class VectorStoreService {
    async addDocuments(
        embeddedChunks: EmbeddedChunk[],
        namespace: string
    ) {
        const namespaceIndex = index.namespace(namespace);

        await namespaceIndex.upsert({
            records: embeddedChunks.map((chunk) => ({
                id: chunk.id.toString(), // Pinecone IDs should be strings
                values: chunk.embedding,
                metadata: {
                    text: chunk.text,
                    ...chunk.metadata,
                },
            })),
        });
    }

    async searchDocuments(queryEmbedding: number[]) {
        const results = await index.query({
            vector: queryEmbedding,
            topK: 5,
            includeMetadata: true,
            includeValues: false,
        });

        return results.matches;
    }
}

export const vectorStoreService = new VectorStoreService();