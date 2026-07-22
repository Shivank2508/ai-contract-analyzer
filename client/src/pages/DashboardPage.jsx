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
            <div className="min-h-screen bg-[#0F172A] flex text-white">
                <Sidebar />

                <div className="flex-1 ml-64 flex items-center justify-center">
                    <div className="flex flex-col items-center gap-4">
                        <div className="h-10 w-10 rounded-full border-4 border-slate-600 border-t-violet-500 animate-spin" />

                        <div className="text-center">
                            <h2 className="text-lg font-semibold">
                                Loading Dashboard
                            </h2>

                            <p className="text-sm text-slate-400 mt-1">
                                Fetching contract insights...
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
        <div className="min-h-screen bg-[#0F172A] text-white overflow-hidden">
            <div className="flex">
                <Sidebar />

                <main className="flex-1 ml-64 h-screen overflow-y-auto px-6 py-5">

                    {/* Header */}

                    <div className="flex items-start justify-between mb-6">

                        <div>
                            <p className="uppercase tracking-[4px] text-[10px] text-slate-500">
                                Thursday • Jul 16, 2026
                            </p>

                            <h1 className="text-3xl font-bold mt-2">
                                Good Morning,
                                <span className="text-violet-400">
                                    {" "}
                                    {dashboard?.user?.name}
                                </span>
                            </h1>

                            <p className="text-sm text-slate-400 mt-2 max-w-2xl leading-6">
                                You have{" "}
                                <span className="font-semibold text-white">
                                    3 contracts
                                </span>{" "}
                                pending review and{" "}
                                <span className="font-semibold text-red-400">
                                    2 high-risk findings
                                </span>{" "}
                                requiring your attention.
                            </p>
                        </div>

                        <button
                            onClick={() => {
                                logout();
                                navigate("/login");
                            }}
                            className="flex items-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 transition-all px-4 py-2.5 text-sm font-medium shadow-lg cursor-pointer"
                        >
                            Logout
                            <i className="bi bi-box-arrow-right text-lg"></i>
                        </button>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-4 gap-4">

                        <StatsCard
                            title="Total Contracts"
                            value={dashboard?.stats?.totalContracts ?? 0}
                            subtitle="Uploaded"
                            icon="bi bi-file-earmark-text"
                        />

                        <StatsCard
                            title="Pending"
                            value={dashboard?.stats?.pendingAnalysis ?? 0}
                            subtitle="Awaiting AI"
                            icon="bi bi-clock-history"
                        />

                        <StatsCard
                            title="High Risk"
                            value={dashboard?.stats?.highRisk ?? 0}
                            subtitle="Need Review"
                            icon="bi bi-exclamation-triangle"
                        />

                        <StatsCard
                            title="Hours Saved"
                            value={dashboard?.stats?.hoursSaved ?? 0}
                            subtitle="vs Manual"
                            icon="bi bi-lightning-charge"
                        />

                    </div>

                    {/* Bottom */}

                    <div className="grid grid-cols-3 gap-4 mt-5">

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