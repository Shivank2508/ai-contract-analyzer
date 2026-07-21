export default function ClauseCard({ clause, index }) {
    const importance =
        clause.importance || clause.severity || "Medium";

    const confidence = clause.confidence || 95;

    const badgeStyles = {
        High: "bg-red-500/15 text-red-300 border-red-500/30",
        Medium: "bg-amber-500/15 text-amber-300 border-amber-500/30",
        Low: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
    };

    return (
        <div className="group bg-[#101827] border border-white/10 rounded-xl p-5 hover:border-violet-500/60 hover:bg-[#121C31] transition-all duration-300">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="h-10 w-10 rounded-lg bg-violet-500/15 flex items-center justify-center text-violet-300 shrink-0">
                        <i className="bi bi-file-earmark-text"></i>
                    </div>
                    <div className="min-w-0">
                        <h3 className="font-semibold text-white truncate">
                            {clause.title ||
                                clause.name ||
                                clause.type ||
                                `Clause ${index + 1}`}
                        </h3>
                        <p className="text-xs text-gray-400">
                            {clause.category || "General"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end gap-2 shrink-0">
                    <span
                        className={`text-[11px] px-2.5 py-1 rounded-full border ${badgeStyles[importance]}`}
                    >
                        {importance}
                    </span>
                    <span className="text-[11px] px-2.5 py-1 rounded-md bg-violet-500/10 text-violet-300 border border-violet-500/20">
                        {confidence}% Confidence
                    </span>
                </div>
            </div>
            {/* Description */}
            <p className="text-sm text-gray-300 leading-6 mt-4 line-clamp-5">
                {clause.text ||
                    clause.description ||
                    clause.content ||
                    "No description available."}
            </p>
            {/* Footer */}
            {clause.page && (
                <div className="flex justify-end mt-4 pt-3 border-t border-white/5">
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                        <i className="bi bi-file-earmark"></i>
                        Page {clause.page}
                    </span>
                </div>
            )}
        </div>
    );
}