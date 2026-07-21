export default function RiskDistribution({ data }) {
    const high = data?.high || 0;
    const medium = data?.medium || 0;
    const low = data?.low || 0;

    const total = high + medium + low;

    const highPercent = total ? (high / total) * 100 : 0;
    const mediumPercent = total ? (medium / total) * 100 : 0;
    const lowPercent = total ? (low / total) * 100 : 0;

    return (
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">
            <h3 className="uppercase tracking-[4px] text-xs text-gray-400">
                Risk Distribution
            </h3>

            <div className="space-y-6 mt-8">

                {/* High */}
                <div>
                    <div className="flex justify-between">
                        <span>High</span>
                        <span>{high}</span>
                    </div>

                    <div className="mt-2 h-2 rounded bg-gray-700">
                        <div
                            className="h-2 rounded bg-red-500"
                            style={{ width: `${highPercent}%` }}
                        />
                    </div>
                </div>

                {/* Medium */}
                <div>
                    <div className="flex justify-between">
                        <span>Medium</span>
                        <span>{medium}</span>
                    </div>

                    <div className="mt-2 h-2 rounded bg-gray-700">
                        <div
                            className="h-2 rounded bg-yellow-500"
                            style={{ width: `${mediumPercent}%` }}
                        />
                    </div>
                </div>

                {/* Low */}
                <div>
                    <div className="flex justify-between">
                        <span>Low</span>
                        <span>{low}</span>
                    </div>

                    <div className="mt-2 h-2 rounded bg-gray-700">
                        <div
                            className="h-2 rounded bg-green-500"
                            style={{ width: `${lowPercent}%` }}
                        />
                    </div>
                </div>

            </div>
        </div>
    );
}