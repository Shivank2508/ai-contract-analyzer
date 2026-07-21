import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";

export default function AnalysisLoader({ loading }) {
    const [currentStep, setCurrentStep] = useState(0);
    const loadingSteps = [
        {
            icon: "bi-file-earmark-text",
            title: "Reading Contract",
            desc: "Extracting text from your document..."
        },
        {
            icon: "bi-search",
            title: "Analyzing Clauses",
            desc: "Identifying important legal clauses..."
        },
        {
            icon: "bi-exclamation-triangle",
            title: "Assessing Risks",
            desc: "Detecting legal and business risks..."
        },
        {
            icon: "bi-patch-question",
            title: "Checking Missing Clauses",
            desc: "Comparing against industry standards..."
        },
        {
            icon: "bi-lightbulb",
            title: "Generating Recommendations",
            desc: "Preparing AI suggestions..."
        },
        {
            icon: "bi-stars",
            title: "Creating Executive Summary",
            desc: "Almost done..."
        }
    ];
    useEffect(() => {
        if (!loading) return;

        const timer = setInterval(() => {
            setCurrentStep((prev) =>
                prev < loadingSteps.length - 1 ? prev + 1 : prev
            );
        }, 1800);

        return () => clearInterval(timer);
    }, [loading])

    const progress =
        ((currentStep + 1) / loadingSteps.length) * 100;

    return (
        <div className="min-h-screen bg-[#0B1120] flex">
            <Sidebar />

            <main className="flex-1 flex items-center justify-center p-8">
                <div className="w-full max-w-5xl">

                    {/* Header */}
                    <div className="text-center mb-14">

                        <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-violet-500/10 border border-violet-500/20 flex items-center justify-center">

                            <i className="bi bi-cpu text-violet-400 text-5xl animate-pulse"></i>

                        </div>

                        <h1 className="text-4xl font-bold text-white">
                            Analyzing Contract
                        </h1>

                        <p className="text-gray-400 mt-3 max-w-xl mx-auto">
                            Our AI is extracting clauses, identifying risks and
                            preparing a detailed legal analysis.
                        </p>

                    </div>

                    {/* Progress */}
                    <div className="mb-14">

                        <div className="flex justify-between mb-3 text-sm">

                            <span className="text-gray-400">
                                Overall Progress
                            </span>

                            <span className="text-violet-400 font-semibold">
                                {Math.round(progress)}%
                            </span>

                        </div>

                        <div className="h-2 rounded-full bg-[#1B2336] overflow-hidden">

                            <div
                                className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 transition-all duration-700"
                                style={{ width: `${progress}%` }}
                            />

                        </div>

                    </div>


                    {/* Steps */}
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
                        {loadingSteps.map((step, index) => {
                            const active = index === currentStep;
                            const completed = index < currentStep;

                            return (
                                <div
                                    key={index}
                                    className={`rounded-xl border p-4 transition-all duration-500 h-full
                ${active
                                            ? "border-violet-500 bg-violet-500/10 scale-105 shadow-lg shadow-violet-500/20"
                                            : completed
                                                ? "border-emerald-500/30 bg-emerald-500/10"
                                                : "border-white/10 bg-[#121A2D]"
                                        }`}
                                >
                                    <div
                                        className={`h-12 w-12 rounded-xl flex items-center justify-center mb-4 mx-auto
                    ${completed
                                                ? "bg-emerald-500"
                                                : active
                                                    ? "bg-violet-600"
                                                    : "bg-[#1A2438]"
                                            }`}
                                    >
                                        {completed ? (
                                            <i className="bi bi-check-lg text-white text-lg"></i>
                                        ) : (
                                            <i
                                                className={`bi ${step.icon} text-white text-lg ${active ? "animate-spin" : ""
                                                    }`}
                                            ></i>
                                        )}
                                    </div>

                                    <h3 className="text-white font-semibold text-center text-sm">
                                        {step.title}
                                    </h3>

                                    <p className="text-xs text-gray-400 mt-2 text-center leading-relaxed">
                                        {step.desc}
                                    </p>

                                    {active && (
                                        <div className="mt-4">
                                            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                                                <div className="h-full w-1/2 bg-violet-500 animate-pulse rounded-full"></div>
                                            </div>

                                            <p className="text-xs text-violet-400 mt-2 text-center">
                                                Processing...
                                            </p>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    {/* Footer */}
                    <div className="mt-14 flex justify-center">

                        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-[#121A2D] px-6 py-3">

                            <div className="h-3 w-3 rounded-full bg-violet-500 animate-pulse"></div>

                            <span className="text-gray-300">
                                Step {currentStep + 1} of {loadingSteps.length}
                            </span>

                        </div>

                    </div>

                    <p className="text-center text-gray-500 mt-8 text-sm">
                        Large contracts usually finish within 20–40 seconds.
                    </p>

                </div>
            </main>
        </div>
    );
}