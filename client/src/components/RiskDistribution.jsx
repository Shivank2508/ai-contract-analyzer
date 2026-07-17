export default function RiskDistribution() {
    return (
        <div className="rounded-3xl bg-white/5 border border-white/10 p-8">

            <h3 className="uppercase tracking-[4px] text-xs text-gray-400">
                Risk Distribution
            </h3>

            <div className="space-y-6 mt-8">

                <div>
                    <div className="flex justify-between">
                        <span>High</span>
                        <span>14</span>
                    </div>

                    <div className="mt-2 h-2 rounded bg-gray-700">
                        <div className="h-2 rounded bg-red-500 w-1/4"></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between">
                        <span>Medium</span>
                        <span>31</span>
                    </div>

                    <div className="mt-2 h-2 rounded bg-gray-700">
                        <div className="h-2 rounded bg-yellow-500 w-1/2"></div>
                    </div>
                </div>

                <div>
                    <div className="flex justify-between">
                        <span>Low</span>
                        <span>83</span>
                    </div>

                    <div className="mt-2 h-2 rounded bg-gray-700">
                        <div className="h-2 rounded bg-green-500 w-3/4"></div>
                    </div>
                </div>

            </div>

        </div>
    );
}