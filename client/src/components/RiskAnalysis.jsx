import React from "react";

const RiskAnalysis = ({ risks = [] }) => {
    return (
        <div className="bg-[#171C34] border border-white/10 rounded-xl p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-semibold">Risk Analysis</h2>
                    <p className="text-gray-400 text-sm mt-1">
                        AI detected {risks.length} legal risks.
                    </p>
                </div>

                <span className="bg-red-500/20 text-red-300 px-4 py-2 rounded-lg text-sm">
                    {risks.length} Risks
                </span>
            </div>

            {risks.length ? (
                <div className="space-y-4">
                    {risks.map((risk, index) => {
                        const severity = (
                            risk.severity ||
                            risk.level ||
                            "Medium"
                        ).toLowerCase();

                        const style = {
                            high: {
                                border: "border-red-500/30",
                                bg: "bg-red-500/10",
                                badge: "bg-red-500 text-white",
                                icon: "bi-exclamation-octagon-fill",
                            },
                            medium: {
                                border: "border-yellow-500/30",
                                bg: "bg-yellow-500/10",
                                badge: "bg-yellow-500 text-black",
                                icon: "bi-exclamation-triangle-fill",
                            },
                            low: {
                                border: "border-emerald-500/30",
                                bg: "bg-emerald-500/10",
                                badge: "bg-emerald-500 text-white",
                                icon: "bi-check-circle-fill",
                            },
                        }[severity] || {
                            border: "border-yellow-500/30",
                            bg: "bg-yellow-500/10",
                            badge: "bg-yellow-500 text-black",
                            icon: "bi-exclamation-triangle-fill",
                        };

                        return (
                            <div
                                key={index}
                                className={`rounded-xl border ${style.border} ${style.bg} p-5`}
                            >
                                <div className="flex justify-between items-start gap-4">
                                    <div className="flex gap-4 flex-1">
                                        <div className="h-12 w-12 rounded-xl bg-[#0F172A] flex items-center justify-center">
                                            <i
                                                className={`bi ${style.icon} text-xl`}
                                            ></i>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3">
                                                <h3 className="font-semibold text-lg">
                                                    {risk.title ||
                                                        risk.type ||
                                                        risk.category ||
                                                        `Risk ${index + 1}`}
                                                </h3>

                                                <span
                                                    className={`px-3 py-1 rounded-full text-xs font-semibold ${style.badge}`}
                                                >
                                                    {severity.toUpperCase()}
                                                </span>
                                            </div>

                                            <p className="text-gray-300 mt-3 leading-7">
                                                {risk.description ||
                                                    risk.reason ||
                                                    risk.message ||
                                                    "No description available."}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {risk.impact && (
                                    <div className="mt-4 rounded-lg bg-[#0F172A] border border-white/10 p-4">
                                        <h4 className="font-medium text-sm mb-2 text-orange-300">
                                            Business Impact
                                        </h4>

                                        <p className="text-gray-300 text-sm leading-6">
                                            {risk.impact}
                                        </p>
                                    </div>
                                )}

                                {risk.recommendation && (
                                    <div className="mt-4 rounded-lg bg-[#0F172A] border border-emerald-500/20 p-4">
                                        <h4 className="font-medium text-sm mb-2 text-emerald-400">
                                            AI Recommendation
                                        </h4>

                                        <p className="text-gray-300 text-sm leading-6">
                                            {risk.recommendation}
                                        </p>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-3 mt-5">
                                    {risk.clause && (
                                        <span className="bg-white/5 px-3 py-1 rounded-lg text-xs">
                                            <i className="bi bi-file-earmark-text me-1"></i>
                                            {risk.clause}
                                        </span>
                                    )}

                                    {risk.page && (
                                        <span className="bg-white/5 px-3 py-1 rounded-lg text-xs">
                                            <i className="bi bi-file-earmark me-1"></i>
                                            Page {risk.page}
                                        </span>
                                    )}

                                    {risk.confidence && (
                                        <span className="bg-violet-500/20 text-violet-300 px-3 py-1 rounded-lg text-xs">
                                            <i className="bi bi-bullseye me-1"></i>
                                            {risk.confidence}% Confidence
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-16">
                    <i className="bi bi-shield-check text-5xl text-emerald-400"></i>

                    <h3 className="text-xl font-semibold mt-5">
                        No Risks Detected
                    </h3>

                    <p className="text-gray-400 mt-2">
                        AI did not identify any legal risks in this contract.
                    </p>
                </div>
            )}
        </div>
    );
};

export default RiskAnalysis;