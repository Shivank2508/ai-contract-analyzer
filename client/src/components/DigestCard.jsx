export default function DigestCard({ contracts = [] }) {
    return (
        <div className="rounded-3xl bg-[#24213F] border border-white/10 p-8">
            <p className="uppercase tracking-[4px] text-gray-400 text-xs">
                Contralytix AI • Daily Digest
            </p>

            <h2 className="text-3xl font-semibold mt-5">
                {contracts.length} recent contract{contracts.length !== 1 ? "s" : ""}
            </h2>

            <div className="space-y-4 mt-8">
                {contracts.length === 0 ? (
                    <div className="rounded-xl bg-black/20 p-5 text-gray-400">
                        No contracts found.
                    </div>
                ) : (
                    contracts.map((contract) => (
                        <div
                            key={contract._id}
                            className="rounded-xl bg-black/20 p-5 flex justify-between items-center"
                        >
                            <div>
                                <h4 className="font-medium">
                                    {contract.originalName}
                                </h4>

                                <p className="text-sm text-gray-400 mt-1">
                                    Uploaded on{" "}
                                    {new Date(contract.createdAt).toLocaleDateString()}
                                </p>
                            </div>

                            <span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${contract.isAnalyzed
                                    ? "bg-green-500/20 text-green-400"
                                    : "bg-yellow-500/20 text-yellow-400"
                                    }`}
                            >
                                {contract.isAnalyzed
                                    ? "Analyzed"
                                    : "Pending"}
                            </span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}