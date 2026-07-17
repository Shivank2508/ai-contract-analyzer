import { useNavigate } from "react-router-dom";

export default function Sidebar() {
    const navigate=useNavigate()
    return (
        <aside className="w-64 border-r border-white/10 bg-[#191A2E]">

            <div className="p-8">
                <h2 className="text-2xl font-bold">
                    Clausal
                </h2>

                <p className="text-gray-500 text-sm">
                    AI • CONTRACTS
                </p>
            </div>

            <nav className="space-y-2 px-4">

                <button 
                onClick={()=>navigate("/dashboard")}
                className="flex w-full items-center gap-3 rounded-xl bg-violet-600 px-4 py-3 cursor-pointer">
                    <i className="bi bi-grid-1x2-fill text-lg"></i>
                    Dashboard
                </button>

                <button
                onClick={()=>navigate("/upload")}
                className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:text-white cursor-pointer">
                    <i className="bi bi-file-earmark-text text-lg"></i>
                    Contracts
                </button>

                <button 
                 onClick={()=>navigate("/upload")}
                className="flex w-full items-center gap-3 px-4 py-3 text-gray-400 hover:text-white cursor-pointer">
                    <i className="bi bi-cloud-upload text-lg"></i>
                    Upload
                </button>

            </nav>

        </aside>
    );
}