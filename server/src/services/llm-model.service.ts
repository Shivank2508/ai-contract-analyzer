import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { z } from "zod";

const deepSeekApiKey = process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY;

if (!deepSeekApiKey) {
    console.warn("DEEPSEEK_API_KEY or OPENAI_API_KEY is not set. DeepSeek requests will fail until configured.");
}

const deepSeekConfig = {
    model: "deepseek-chat",
    apiKey: deepSeekApiKey,
    temperature: 0.2,
    configuration: {
        baseURL: "https://api.deepseek.com/v1",
    },
};

export const llmmModel = new ChatOpenAI(deepSeekConfig);

function normalizeModelContent(content: unknown): string {
    if (typeof content === "string") {
        return content;
    }

    if (Array.isArray(content)) {
        return content
            .map((item) => {
                if (typeof item === "string") {
                    return item;
                }

                if (item && typeof item === "object" && "text" in item) {
                    return String((item as { text?: unknown }).text ?? "");
                }

                return "";
            })
            .join("\n");
    }

    if (content && typeof content === "object") {
        if ("content" in content) {
            return normalizeModelContent((content as { content: unknown }).content);
        }

        if ("text" in content) {
            return String((content as { text?: unknown }).text ?? "");
        }
    }

    return "";
}

function extractJsonCandidate(text: string): string {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1];
    if (fenced) {
        return fenced.trim();
    }

    const firstBrace = text.indexOf("{");
    const lastBrace = text.lastIndexOf("}");
    if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
        return text.slice(firstBrace, lastBrace + 1).trim();
    }

    return text.trim();
}

function coerceString(value: unknown): string | undefined {
    if (typeof value === "string") {
        return value.trim();
    }

    if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
    }

    return undefined;
}

function tryParseJsonLike(value: string): unknown {
    const trimmed = value.trim();
    if (!trimmed) {
        return undefined;
    }

    try {
        return JSON.parse(trimmed);
    } catch {
        const maybeArray = trimmed.match(/^\[(.*)\]$/s);
        if (maybeArray) {
            try {
                return JSON.parse(maybeArray[0]);
            } catch {
                return undefined;
            }
        }

        return undefined;
    }
}

function adaptPayload(payload: unknown): unknown {
    if (!payload || typeof payload !== "object") {
        return payload;
    }

    const record = payload as Record<string, unknown>;

    if (record.contractType && typeof record.contractType !== "string") {
        const coerced = coerceString(record.contractType);
        if (coerced) {
            record.contractType = coerced;
        }
    }

    if (record.clauses && Array.isArray(record.clauses)) {
        return {
            ...record,
            clauses: record.clauses.map((entry) => {
                if (!entry || typeof entry !== "object") {
                    return entry;
                }

                const clauseRecord = entry as Record<string, unknown>;
                if (clauseRecord.title && typeof clauseRecord.title !== "string") {
                    const coerced = coerceString(clauseRecord.title);
                    if (coerced) {
                        clauseRecord.title = coerced;
                    }
                }

                if (clauseRecord.content && typeof clauseRecord.content !== "string") {
                    const coerced = coerceString(clauseRecord.content);
                    if (coerced) {
                        clauseRecord.content = coerced;
                    }
                }

                return clauseRecord;
            })
        };
    }

    if (record.risks && Array.isArray(record.risks)) {
        return {
            ...record,
            risks: record.risks.map((entry) => {
                if (!entry || typeof entry !== "object") {
                    return entry;
                }

                const riskRecord = entry as Record<string, unknown>;
                if (riskRecord.clauseTitle && typeof riskRecord.clauseTitle !== "string") {
                    const coerced = coerceString(riskRecord.clauseTitle);
                    if (coerced) {
                        riskRecord.clauseTitle = coerced;
                    }
                }

                if (riskRecord.reason && typeof riskRecord.reason !== "string") {
                    const coerced = coerceString(riskRecord.reason);
                    if (coerced) {
                        riskRecord.reason = coerced;
                    }
                }

                if (riskRecord.recommendation && typeof riskRecord.recommendation !== "string") {
                    const coerced = coerceString(riskRecord.recommendation);
                    if (coerced) {
                        riskRecord.recommendation = coerced;
                    }
                }

                return riskRecord;
            })
        };
    }

    return record;
}

export function parseJsonFromModel<T>(content: unknown, schema?: z.ZodType<T>): T {
    const rawText = normalizeModelContent(content).trim();
    const jsonText = extractJsonCandidate(rawText);

    try {
        const parsed = tryParseJsonLike(jsonText) ?? JSON.parse(jsonText);
        const adapted = adaptPayload(parsed);

        if (schema) {
            return schema.parse(adapted);
        }

        return adapted as T;
    } catch (error) {
        const fallback = {
            contractType: "Unknown",
            clauses: [],
            risks: [],
            extractedInfo: {},
            recommendations: []
        };

        if (schema) {
            try {
                return schema.parse(fallback);
            } catch {
                return fallback as T;
            }
        }

        return fallback as T;
    }
}

export const deepSeekEmbeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
    apiKey: deepSeekApiKey,
    configuration: {
        baseURL: "https://api.deepseek.com/v1",
    },
});
