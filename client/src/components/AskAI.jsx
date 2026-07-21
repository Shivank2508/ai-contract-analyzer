import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { chatapi } from "../api/contractsApi";

export default function FloatingAI({ contract_id }) {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState("");
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "👋 Hello! I'm your AI Contract Assistant.",
        },
    ]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const handleAsk = async () => {
        if (!question.trim() || loading) return;

        const userQuestion = question.trim();

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                content: userQuestion,
            },
        ]);

        setQuestion("");
        setLoading(true);

        try {
            const res = await chatapi(contract_id, userQuestion);

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: res.answer,
                },
            ]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "Something went wrong.",
                },
            ]);
        } finally {
            setLoading(false);
        }
    };
    const textareaRef = useRef(null);

    const suggestions = [
        "What is the notice period?",
        "Can employer terminate immediately?",
        "Who owns the IP?",
        "Is there a non-compete clause?",
    ];

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                textareaRef.current?.focus();
            }, 150);
        }
    }, [open]);

    const handleInput = (e) => {
        setQuestion(e.target.value);

        e.target.style.height = "auto";
        e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
    };

    // const handleAsk = async () => {
    //     if (!question.trim()) return;

    //     const userQuestion = question.trim();

    //     try {
    //         const response = await chatapi(contractId, userQuestion);

    //         console.log(response);

    //         setQuestion("");
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const selectSuggestion = (text) => {
        setQuestion(text);

        requestAnimationFrame(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${Math.min(
                    textareaRef.current.scrollHeight,
                    160
                )}px`;
            }
        });
    };

    return (
        <>
            {/* Floating Button */}
            <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 ">
                <div className="rounded-full bg-white/90 px-4 py-2 shadow-lg border border-violet-200">
                    <p className="text-sm font-semibold text-slate-800">
                        💬 Ask AI
                    </p>
                    <p className="text-xs text-slate-500">
                        Questions about your contract
                    </p>
                </div>

                <button
                    onClick={() => setOpen((prev) => !prev)}
                    className="h-20 w-20 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
                >
                    <i className="bi bi-robot text-white text-3xl"></i>
                </button>
            </div>

            {/* Popup */}
            {open && (
                <div className="fixed bottom-24 right-6 z-50 w-[400px] h-[650px] rounded-3xl border border-white/10 bg-[#171C34] shadow-[0_30px_80px_rgba(0,0,0,.45)] overflow-hidden flex flex-col animate-in fade-in zoom-in duration-300">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-violet-600 to-indigo-600 px-6 py-5 flex justify-between items-center">

                        <div className="flex items-center gap-3">

                            <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-2xl">
                                🤖
                            </div>

                            <div>
                                <h2 className="text-white font-semibold">
                                    Contract AI
                                </h2>

                                <p className="text-xs text-white/80">
                                    Online • Ready to help
                                </p>
                            </div>

                        </div>

                        <button
                            onClick={() => setOpen(false)}
                            className="text-white hover:rotate-90 transition duration-300 cursor-pointer"
                        >
                            <i className="bi bi-x-lg text-xl"></i>
                        </button>

                    </div>



                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">

                        {/* AI */}
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`flex ${msg.role === "user" ? "justify-end" : "items-start gap-3"}`}
                            >
                                {msg.role === "assistant" && (
                                    <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                                        🤖
                                    </div>
                                )}

                                <div
                                    className={`px-4 py-3 rounded-2xl max-w-[80%] whitespace-pre-wrap ${msg.role === "user"
                                        ? "bg-violet-600 text-white"
                                        : "bg-[#0F172A] text-gray-200"
                                        }`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 rounded-full bg-violet-600 flex items-center justify-center">
                                    🤖
                                </div>

                                <div className="bg-[#0F172A] text-gray-200 px-4 py-3 rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm text-gray-300">
                                            Thinking
                                        </span>

                                        <div className="flex gap-1">
                                            <span className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"></span>
                                            <span
                                                className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.15s" }}
                                            ></span>
                                            <span
                                                className="w-2 h-2 bg-violet-400 rounded-full animate-bounce"
                                                style={{ animationDelay: "0.3s" }}
                                            ></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Bottom Input */}
                    <div className="border-t border-white/10 bg-[#0B1120] p-4">
                        <div className="flex items-end gap-3 rounded-3xl border border-white/10 bg-[#111827] px-4 py-2 transition-all duration-200 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20">

                            <textarea
                                ref={textareaRef}
                                value={question}
                                onChange={handleInput}
                                rows={1}
                                placeholder="Ask anything about this contract..."
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleAsk();
                                    }
                                }}
                                className="flex-1 resize-none bg-transparent text-white placeholder:text-gray-500 outline-none max-h-40 overflow-y-auto leading-6 py-2"
                            />

                            <button
                                onClick={handleAsk}
                                disabled={!question.trim()}
                                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-all duration-200 cursor-pointer
                ${question.trim()
                                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg shadow-violet-600/25 hover:scale-105 active:scale-95"
                                        : "bg-gray-700 text-gray-500 cursor-not-allowed"
                                    }`}
                            >
                                <i className="bi bi-arrow-up text-lg"></i>
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    );
}