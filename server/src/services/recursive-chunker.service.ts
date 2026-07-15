import { Chunk } from "../types/chunk.type";

export const recursiveChunker = (
    text: string,
    source: string
): Chunk[] => {

    const chunkSize = 500;

    const paragraphs = text.split("\n\n");

    const chunks: Chunk[] = [];

    let id = 1;
    let chunkIndex = 0;
    let currentPosition = 0;

    for (const paragraph of paragraphs) {

        const trimmedParagraph = paragraph.trim();

        if (!trimmedParagraph) continue;

        // Small paragraph
        if (trimmedParagraph.length <= chunkSize) {

            chunks.push({
                id,
                text: trimmedParagraph,
                metadata: {
                    chunkIndex,
                    start: currentPosition,
                    end: currentPosition + trimmedParagraph.length,
                    source
                }
            });

            currentPosition += paragraph.length + 2;
            id++;
            chunkIndex++;

            continue;
        }

        // Large paragraph
        const sentences = trimmedParagraph.split(/(?<=[.!?])\s+/);

        let currentChunk = "";

        for (const sentence of sentences) {

            if ((currentChunk + sentence).length <= chunkSize) {

                currentChunk += sentence + " ";

            } else {

                const chunkText = currentChunk.trim();

                chunks.push({
                    id,
                    text: chunkText,
                    metadata: {
                        chunkIndex,
                        start: currentPosition,
                        end: currentPosition + chunkText.length,
                        source
                    }
                });

                currentPosition += chunkText.length;

                id++;
                chunkIndex++;

                // Start new chunk
                currentChunk = sentence + " ";
            }
        }

        // Push remaining chunk
        if (currentChunk.trim()) {

            const chunkText = currentChunk.trim();

            chunks.push({
                id,
                text: chunkText,
                metadata: {
                    chunkIndex,
                    start: currentPosition,
                    end: currentPosition + chunkText.length,
                    source
                }
            });

            currentPosition += chunkText.length;

            id++;
            chunkIndex++;
        }

        currentPosition += 2; // paragraph separator
    }

    return chunks;
};