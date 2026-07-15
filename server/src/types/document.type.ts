export interface DocumentData {
    text: string;
    metadata: {
        pages: number;
        source: string;
        fileName: string;
    };
} 