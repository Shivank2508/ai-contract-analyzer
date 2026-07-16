import { ChatGroq } from "@langchain/groq";

export const llmmModel = new ChatGroq({
    model: "llama-3.3-70b-versatile",
    apiKey: process.env.GROQ_API_KEY,
})