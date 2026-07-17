import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatsCard from "../components/StatsCard";
import DigestCard from "../components/DigestCard";
import RiskDistribution from "../components/RiskDistribution";

export default function DashboardPage() {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <main className="p-8">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="uppercase tracking-[5px] text-gray-400 text-xs">
                                    Thursday • Jul 16, 2026
                                </p>

                                <h1 className="text-5xl font-bold mt-3">
                                    Good morning, Shivank
                                </h1>
                                <p className="text-gray-400 mt-3">
                                    You have <span className="text-white font-semibold">3 contracts</span>{" "}
                                    pending review and{" "}
                                    <span className="text-red-400 font-semibold">
                                        2 high-risk findings
                                    </span>{" "}
                                    to approve.
                                </p>
                            </div>
                            <button className="px-7 py-4 rounded-xl bg-violet-500 hover:bg-violet-600 transition">
                                New Contract
                            </button>
                        </div>
                        <div className="grid grid-cols-4 gap-6 mt-10">
                            <StatsCard
                                title="Total Contracts"
                                value="128"
                                subtitle="+12 this month"
                            />
                            <StatsCard
                                title="In Review"
                                value="7"
                                subtitle="3 awaiting you"
                            />
                            <StatsCard
                                title="High Risk"
                                value="14"
                                subtitle="2 need approval"
                            />
                            <StatsCard
                                title="Hours Saved"
                                value="312"
                                subtitle="vs. manual review"
                            />
                        </div>
                        <div className="grid grid-cols-3 gap-6 mt-8">
                            <div className="col-span-2">
                                <DigestCard />
                            </div>
                            <RiskDistribution />
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
}