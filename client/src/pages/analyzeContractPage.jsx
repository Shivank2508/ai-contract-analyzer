import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { analyzeContract } from "../api/contractsApi";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import StatCard from "../components/StatCard";
import AnalysisLoader from "../components/AnalysisLoader";
import ExtractedInfo from "../components/ExtractedInfo";
import ExecutiveSummary from "../components/ExecutiveSummary";
import ClauseCard from "../components/ClauseCard";
import RiskAnalysis from "../components/RiskAnalysis";
import MissingClauses from "../components/MissingClauses";
import Recommendations from "../components/Recommendations";
import AskAI from "../components/AskAI";
import FloatingAI from "../components/AskAI";

export default function AnalyzeContractPage() {
    const { contract_id } = useParams();
    const [loading, setLoading] = useState(true);
    const [analysis, setAnalysis] = useState(null);
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("clauses");
    const navigate = useNavigate()
    useEffect(() => {
        async function load() {
            try {
                const data = await analyzeContract(contract_id);
                setAnalysis(data.contract);
            } catch (e) {
                setError("Failed to load analysis");
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [contract_id]);

    if (loading) {
        return (
            <AnalysisLoader
                loading={loading}
            />
        );
    }
    if (error) {
        return <div className="min-h-screen bg-[#0F172A] text-red-400 p-10">{error}</div>;
    }
    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <div className="flex ">
                <Sidebar />
                <div className="flex-1 pb-3">
                    <main className="ml-64 flex-1 p-6 space-y-6">
                        {/* ================= PAGE HEADER ================= */}
                        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                            <div>
                                <p className="uppercase tracking-[3px] text-xs text-violet-400 font-medium">
                                    AI CONTRACT ANALYZER
                                </p>
                                <h1 className="text-3xl font-bold mt-2">
                                    {analysis?.extractedInfo?.contractTitle ||
                                        analysis?.contractType ||
                                        "Contract Analysis"}
                                </h1>
                                <p className="text-gray-400 mt-2 max-w-3xl">
                                    AI analyzed this contract and extracted clauses, risks,
                                    recommendations and key legal information.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/contracts")}
                                className="flex items-center gap-2 bg-violet-600 hover:bg-violet-700 transition px-5 py-3 rounded-xl font-medium cursor-pointer"
                            >
                                <i className="bi bi-arrow-left"></i>
                                Back
                            </button>

                        </div>
                        {/* ================= DASHBOARD ================= */}
                        <div className="grid grid-cols-12 gap-4">

                            <div className="col-span-12 lg:col-span-4">
                                <div className="bg-[#171C34] border border-white/10 rounded-xl p-5 h-[140px] flex flex-col justify-between">

                                    <div className="flex justify-between items-start">

                                        <div>

                                            <p className="text-xs text-gray-400">
                                                Overall Risk
                                            </p>

                                            <h2 className="text-4xl font-bold mt-2">
                                                {analysis?.riskScore}%
                                            </h2>

                                            <span className="inline-flex mt-2 px-2 py-0.5 rounded-full text-[11px] bg-red-500/15 text-red-400">
                                                High Risk
                                            </span>

                                        </div>

                                        <div className="h-16 w-16 rounded-full border-[5px] border-red-500 flex items-center justify-center text-xl font-bold text-red-400">
                                            {analysis?.riskScore}
                                        </div>

                                    </div>

                                    <div className="h-2 bg-[#0F172A] rounded-full overflow-hidden">

                                        <div
                                            className="h-full bg-red-500 rounded-full"
                                            style={{ width: `${analysis?.riskScore}%` }}
                                        />

                                    </div>

                                </div>
                            </div>

                            <div className="col-span-12 xl:col-span-8">

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-5 h-full">

                                    <StatCard
                                        title="Contract Type"
                                        value={analysis?.contractType || "-"}
                                        subtitle="AI Detected"
                                        icon="bi-file-earmark-text"
                                        iconColor="text-violet-400"
                                    />

                                    <StatCard
                                        title="Clauses"
                                        value={analysis?.clauses?.length || 0}
                                        subtitle="Clauses Found"
                                        icon="bi-list-ul"
                                        iconColor="text-blue-400"
                                    />

                                    <StatCard
                                        title="Risks"
                                        value={analysis?.risk?.length || 0}
                                        subtitle="Need Attention"
                                        icon="bi-exclamation-triangle"
                                        iconColor="text-red-400"
                                        valueColor="text-red-400"
                                    />

                                    <StatCard
                                        title="Missing"
                                        value={analysis?.missingClauses?.length || 0}
                                        subtitle="Missing Clauses"
                                        icon="bi-patch-question"
                                        iconColor="text-yellow-400"
                                        valueColor="text-yellow-400"
                                    />

                                </div>

                            </div>

                        </div>
                        <div className="xl:col-span-3">
                            <ExtractedInfo extractedInfo={analysis?.extractedInfo} />
                        </div>

                        {/* ================= SUMMARY ================= */}
                        <div className="xl:col-span-2">
                            <ExecutiveSummary summary={analysis?.summary} />
                        </div>



                        {/* ================= ANALYSIS TABS ================= */}
                        <div className="bg-[#171C34] border border-white/10 rounded-xl">

                            <div className="flex overflow-x-auto">

                                <button
                                    onClick={() => setActiveTab("clauses")}
                                    className={`px-6 py-4 whitespace-nowrap border-b-2 transition cursor-pointer
            ${activeTab === "clauses"
                                            ? "border-violet-500 text-violet-400 bg-violet-500/10"
                                            : "border-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    <i className="bi bi-file-earmark-text me-2"></i>
                                    Clauses ({analysis?.clauses?.length || 0})
                                </button>

                                <button
                                    onClick={() => setActiveTab("risks")}
                                    className={`px-6 py-4 whitespace-nowrap border-b-2 transition cursor-pointer
            ${activeTab === "risks"
                                            ? "border-red-500 text-red-400 bg-red-500/10"
                                            : "border-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    <i className="bi bi-exclamation-triangle me-2"></i>
                                    Risks ({analysis?.risk?.length || 0})
                                </button>

                                <button
                                    onClick={() => setActiveTab("missing")}
                                    className={`px-6 py-4 whitespace-nowrap border-b-2 transition cursor-pointer
            ${activeTab === "missing"
                                            ? "border-yellow-500 text-yellow-400 bg-yellow-500/10"
                                            : "border-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    <i className="bi bi-patch-question me-2"></i>
                                    Missing ({analysis?.missingClauses?.length || 0})
                                </button>

                                <button
                                    onClick={() => setActiveTab("recommendations")}
                                    className={`px-6 py-4 whitespace-nowrap border-b-2 transition cursor-pointer
            ${activeTab === "recommendations"
                                            ? "border-emerald-500 text-emerald-400 bg-emerald-500/10"
                                            : "border-transparent text-gray-400 hover:text-white"
                                        }`}
                                >
                                    <i className="bi bi-lightbulb me-2"></i>
                                    Recommendations
                                </button>


                            </div>

                        </div>
                        <div className="mt-5">
                            {activeTab === "clauses" && (
                                <div className="bg-[#171C34] border border-white/10 rounded-xl p-6">
                                    <div className="flex items-center justify-between mb-6">
                                        <div>
                                            <h2 className="text-xl font-semibold">
                                                Contract Clauses
                                            </h2>

                                            <p className="text-sm text-gray-400 mt-1">
                                                AI identified {analysis?.clauses?.length || 0} important clauses.
                                            </p>
                                        </div>
                                        <div className="px-4 py-2 rounded-lg bg-violet-500/15 border border-violet-500/20 text-violet-300 text-sm font-medium">
                                            {analysis?.clauses?.length || 0} Clauses
                                        </div>
                                    </div>
                                    {analysis?.clauses?.length ? (
                                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                                            {analysis.clauses.map((clause, index) => (
                                                <ClauseCard
                                                    key={index}
                                                    clause={clause}
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 flex flex-col items-center justify-center text-center">
                                            <div className="h-16 w-16 rounded-full bg-white/5 flex items-center justify-center mb-5">
                                                <i className="bi bi-file-earmark-x text-3xl text-gray-500"></i>
                                            </div>
                                            <h3 className="text-lg font-semibold">
                                                No Clauses Found
                                            </h3>
                                            <p className="text-gray-400 mt-2">
                                                AI couldn't identify any contract clauses.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            )}
                            {activeTab === "risks" && (
                                <RiskAnalysis risks={analysis?.risk || []} />
                            )}
                            {activeTab === "missing" && (
                                <MissingClauses
                                    missingClauses={analysis?.missingClauses || []}
                                />
                            )}
                            {activeTab === "recommendations" && (
                                <Recommendations
                                    recommendations={analysis?.recommendations || []}
                                />
                            )}
                        </div>
                        {analysis?.errors?.length > 0 && (
                            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6">
                                <h2 className="text-xl font-semibold text-red-300 mb-5">
                                    Analysis Errors
                                </h2>
                                <div className="space-y-3">
                                    {analysis.errors.map((item, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#0F172A] border border-red-500/20 rounded-lg p-4"
                                        >
                                            {item}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
            <FloatingAI contract_id={contract_id} />
        </div>
    );
}
