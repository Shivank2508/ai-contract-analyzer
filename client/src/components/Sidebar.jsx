import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
    const navigate = useNavigate();
    const location = useLocation();

    const isActive = (path) => {
        return location.pathname === path || location.pathname.startsWith(path + "/");
    };

    return (
        <aside className="fixed left-0 top-0 h-screen w-64 bg-[#191A2E] border-r border-white/10">
            {/* Logo */}
            <div className="p-8 shrink-0">
                <h2 className="text-2xl font-bold text-white">Contralytix</h2>
                <p className="text-sm text-gray-500">AI • CONTRACTS</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2 overflow-y-auto">
                <button
                    onClick={() => navigate("/dashboard")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition cursor-pointer ${isActive("/dashboard")
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <i className="bi bi-grid-1x2-fill text-lg"></i>
                    Dashboard
                </button>

                <button
                    onClick={() => navigate("/contracts")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition cursor-pointer ${isActive("/contracts")
                        ? "bg-violet-600 text-white"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                        }`}
                >
                    <i className="bi bi-file-earmark-text text-lg"></i>
                    Contracts
                </button>

                <button
                    onClick={() => navigate("/upload")}
                    className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 transition cursor-pointer ${isActive("/upload")
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