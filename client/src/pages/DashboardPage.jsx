import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Sidebar from "../components/Sidebar";
import StatsCard from "../components/StatsCard";
import DigestCard from "../components/DigestCard";
import RiskDistribution from "../components/RiskDistribution";
import { getDashboard } from "../api/contractsApi";

export default function DashboardPage() {
    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { logout } = useAuth();

    useEffect(() => {
        fetchDashboard();
    }, []);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const data = await getDashboard();
            setDashboard(data);
        } catch (err) {
            console.error(err);
            setError("Failed to load dashboard.");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0F172A] text-white flex">
                <Sidebar />

                <div className="flex-1 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        {/* Spinner */}
                        <div className="w-12 h-12 border-4 border-slate-600 border-t-blue-500 rounded-full animate-spin"></div>

                        {/* Loading Text */}
                        <div className="text-center">
                            <h2 className="text-xl font-semibold">Loading Dashboard</h2>
                            <p className="text-slate-400 text-sm mt-1">
                                Fetching your latest contract insights...
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#0F172A] text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <div className="flex">
                <Sidebar />

                <main className="flex-1 ml-64 p-8">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <p className="uppercase tracking-[5px] text-gray-400 text-xs">
                                Thursday • Jul 16, 2026
                            </p>

                            <h1 className="text-5xl font-bold mt-3">
                                Good morning, {dashboard.user.name}
                            </h1>

                            <p className="text-gray-400 mt-3">
                                You have{" "}
                                <span className="text-white font-semibold">
                                    3 contracts
                                </span>{" "}
                                pending review and{" "}
                                <span className="text-red-400 font-semibold">
                                    2 high-risk findings
                                </span>{" "}
                                to approve.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => {
                                    logout();
                                    navigate("/login");
                                }}
                                className="flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 font-medium transition hover:bg-violet-700 cursor-pointer"
                            >

                                Logout  <i className="bi bi-box-arrow-right text-xl"></i>
                            </button>
                        </div>

                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-4 gap-6">
                        <StatsCard
                            title="Total Contracts"
                            value={dashboard?.stats?.totalContracts ?? 0}
                            subtitle="Uploaded"
                        />

                        <StatsCard
                            title="Not Analyzed"
                            value={dashboard?.stats?.pendingAnalysis ?? 0}
                            subtitle="Pending"
                        />

                        <StatsCard
                            title="High Risk"
                            value={dashboard?.stats?.highRisk ?? 0}
                            subtitle="Need Review"
                        />

                        <StatsCard
                            title="Hours Saved"
                            value={dashboard?.stats?.hoursSaved ?? 0}
                            subtitle="vs Manual Review"
                        />
                    </div>

                    {/* Bottom Section */}
                    <div className="grid grid-cols-3 gap-6 mt-8">
                        <div className="col-span-2">
                            <DigestCard
                                contracts={dashboard?.recentContracts || []}
                                findings={dashboard?.recentFindings || []}
                            />
                        </div>

                        <RiskDistribution
                            data={dashboard?.riskDistribution || []}
                        />
                    </div>
                </main>
            </div>
        </div>
    );
}