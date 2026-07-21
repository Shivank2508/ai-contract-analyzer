import React from "react";

const MissingClauses = ({ missingClauses = [] }) => {
    return (
        <div className="bg-[#171C34] border border-white/10 rounded-xl p-5">
            {/* Header */}
            <div className="flex items-center justify-between mb-5">
                <div>
                    <h2 className="text-xl font-semibold">
                        Missing Clauses
                    </h2>

                    <p className="text-gray-400 text-sm mt-1">
                        AI identified clauses that are commonly expected but
                        missing.
                    </p>
                </div>

                <span className="bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-lg text-sm">
                    {missingClauses.length} Missing
                </span>
            </div>

            {missingClauses.length ? (
                <div className="grid lg:grid-cols-2 gap-4">
                    {missingClauses.map((item, index) => (
                        <div
                            key={index}
                            className="bg-[#0F172A] border border-yellow-500/20 rounded-xl p-5 hover:border-yellow-400 transition"
                        >
                            <div className="flex gap-4">
                                <div className="h-12 w-12 rounded-xl bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                                    <span className="font-bold text-yellow-300">
                                        {index + 1}
                                    </span>
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-center justify-between flex-wrap gap-2">
                                        <h3 className="font-semibold text-white">
                                            {item.clause}
                                        </h3>

                                        <span
                                            className={`text-xs px-2 py-1 rounded ${item.importance === "Critical"
                                                ? "bg-red-500/20 text-red-300"
                                                : item.importance ===
                                                    "Important"
                                                    ? "bg-yellow-500/20 text-yellow-300"
                                                    : "bg-blue-500/20 text-blue-300"
                                                }`}
                                        >
                                            {item.importance}
                                        </span>
                                    </div>

                                    <p className="text-gray-400 text-sm mt-3 leading-6">
                                        {item.reason}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="h-20 w-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <i className="bi bi-check-circle-fill text-4xl text-emerald-400"></i>
                    </div>

                    <h3 className="text-2xl font-semibold mt-6">
                        Complete Contract
                    </h3>

                    <p className="text-gray-400 mt-3">
                        AI found no important missing clauses.
                    </p>
                </div>
            )}
        </div>
    );
};

export default MissingClauses;