import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <aside className="w-64 border-r border-white/10 bg-[#191A2E]">
            <div className="p-8">
                <h2 className="text-2xl font-bold">Clausal</h2>

                <p className="text-gray-500 text-sm">
                    AI • CONTRACTS
                </p>
            </div>

            <nav className="space-y-2 px-4">

                <button
                    onClick={() => navigate("/dashboard")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition ${
                        isActive("/dashboard")
                            ? "bg-violet-600 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                    <i className="bi bi-grid-1x2-fill text-lg"></i>
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/contracts")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition ${
                        isActive("/contracts")
                            ? "bg-violet-600 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                    <i className="bi bi-file-earmark-text text-lg"></i>
                    Contracts
                </button>

                <button
                    onClick={() => navigate("/upload")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 cursor-pointer transition ${
                        isActive("/upload")
                            ? "bg-violet-600 text-white"
                            : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                >
                    <i className="bi bi-cloud-upload text-lg"></i>
                    Upload
                </button>

            </nav>
        </aside>
    );
}