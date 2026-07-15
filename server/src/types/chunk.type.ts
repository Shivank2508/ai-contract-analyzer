export interface Chunk {
    id: number,
    text: string,
    metadata: {
        chunkIndex: number,
        start: number,
        end: number,
        source: string
    }
}