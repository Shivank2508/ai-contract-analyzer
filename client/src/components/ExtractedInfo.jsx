export default function ExtractedInfo({ extractedInfo }) {
    const filteredEntries =
        extractedInfo
            ? Object.entries(extractedInfo).filter(([_, value]) => {
                if (value === null || value === undefined) return false;
                if (typeof value === "string" && value.trim() === "") return false;
                if (Array.isArray(value) && value.length === 0) return false;
                return true;
            })
            : [];

    return (
        <div className="bg-[#171C34] border border-white/10 rounded-xl h-full">
            {/* Header */}
            <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-lg">
                        Extracted Information
                    </h2>

                    <p className="text-xs text-gray-400 mt-1">
                        Key values identified by AI
                    </p>
                </div>

                <div className="h-10 w-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <i className="bi bi-clipboard-data text-blue-400"></i>
                </div>
            </div>

            {/* Content */}
            <div className="p-5">
                {filteredEntries.length > 0 ? (
                    <div className="grid md:grid-cols-4 gap-3">
                        {filteredEntries.map(([key, value]) => (
                            <div
                                key={key}
                                className="bg-[#0F172A] border border-white/10 rounded-lg p-4"
                            >
                                <p className="uppercase text-[11px] tracking-wider text-gray-500">
                                    {key
                                        .replace(/([A-Z])/g, " $1")
                                        .replace(/_/g, " ")
                                        .trim()}
                                </p>

                                <p className="mt-2 font-medium break-words text-gray-200">
                                    {Array.isArray(value)
                                        ? value.join(", ")
                                        : String(value)}
                                </p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                        <i className="bi bi-file-earmark-x text-5xl text-gray-500"></i>

                        <p className="text-gray-400 mt-4">
                            No extracted information found.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}