import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getcontracts } from "../api/contractsApi";

export default function ContractsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [initialContracts, setInitialContracts] = useState(null)

  useEffect(() => {
    async function GetAllContracts() {
      try {
        const data = await getcontracts()
        setInitialContracts(data.contracts)
      } catch (err) {
        console.log(err)
      }
    }
    GetAllContracts()
  }, [])

  const contracts = useMemo(() => {
    return (
      initialContracts?.filter((c) => {
        const matchSearch = c.originalName
          .toLowerCase()
          .includes(search.toLowerCase());

        const matchFilter =
          filter === "All"
            ? true
            : filter === "Analyzed"
              ? c.isAnalyzed
              : !c.isAnalyzed;

        return matchSearch && matchFilter;
      }) || []
    );
  }, [initialContracts, search, filter]);

  const formatSize = (bytes) => {
    if (!bytes) return "0 KB";
    if (bytes < 1024)
      return `${bytes} B`;
    if (bytes < 1024 * 1024)
      return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  };

  const statusColor = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-500/20 text-emerald-300";
      case "PROCESSING":
        return "bg-yellow-500/20 text-yellow-300";
      case "FAILED":
        return "bg-red-500/20 text-red-300";
      default:
        return "bg-blue-500/20 text-blue-300";
    }
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <main className="ml-64 flex-1 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="uppercase tracking-[3px] text-xs text-violet-400 font-medium">
                  Contracts
                </p>
                <h1 className="text-3xl font-bold mt-1">
                  Contract Repository
                </h1>
                <p className="text-sm text-gray-400 mt-1">
                  Manage and analyze all uploaded contracts.
                </p>
              </div>
              <button
                onClick={() => navigate("/upload")}
                className="bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-lg text-sm font-medium cursor-pointer"
              >
                + Upload Contract
              </button>
            </div>
            <div className="mt-6 bg-[#171C34] rounded-xl border border-white/10 p-4 flex flex-wrap gap-3">
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contracts..."
                className="flex-1 min-w-[260px] bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm outline-none"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-[#0F172A] border border-white/10 rounded-lg px-4 py-2.5 text-sm"
              >
                <option>All</option>
                <option>Analyzed</option>
                <option>Not Analyzed</option>
              </select>
            </div>
            <div className="mt-5 space-y-4">
              {contracts.map((contract) => (
                <div
                  key={contract._id}
                  className="bg-[#171C34] border border-white/10 rounded-xl p-5 hover:border-violet-500 transition"
                >
                  <div className="flex justify-between items-start gap-5">
                    {/* Left */}
                    <div className="flex gap-4">
                      <div className="h-14 w-14 rounded-xl bg-violet-600/20 flex items-center justify-center text-2xl">
                        📄
                      </div>
                      <div>
                        <h2 className="text-lg font-semibold">
                          {contract.originalName}
                        </h2>
                        <p className="text-sm text-gray-500 mt-1">
                          Uploaded{" "}
                          {new Date(contract.createdAt).toLocaleDateString()}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-3">
                          <span className="text-xs bg-white/5 px-3 py-1 rounded-full">
                            📑 {contract.pages} Pages
                          </span>
                          <span className="text-xs bg-white/5 px-3 py-1 rounded-full">
                            🧩 {contract.chunkCount} Chunks
                          </span>
                          <span className="text-xs bg-white/5 px-3 py-1 rounded-full">
                            🧠 {contract.vectorCount} Vectors
                          </span>
                          <span className="text-xs bg-white/5 px-3 py-1 rounded-full">
                            💾 {formatSize(contract.fileSize)}
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* Right */}
                    <div className="flex flex-col items-end">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor(
                          contract.status
                        )}`}
                      >
                        {contract.status}
                      </span>
                      {contract.isAnalyzed ? (
                        <button
                          onClick={() =>
                            navigate(`/contracts/${contract._id}`)
                          }
                          className="mt-5 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg text-sm cursor-pointer"
                        >
                          View Analysis
                        </button>
                      ) : (
                        <button
                          onClick={() =>
                            navigate(`/contracts/${contract._id}`)
                          }
                          className="mt-5 bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-lg text-sm cursor-pointer"
                        >
                          Analyze Contract
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {contracts.length === 0 && (
              <div className="bg-[#171C34] border border-dashed border-white/10 rounded-xl py-16 text-center">
                <div className="text-5xl mb-4">📂</div>
                <h3 className="text-xl font-semibold">
                  No Contracts Found
                </h3>
                <p className="text-gray-400 mt-2">
                  Upload your first contract to start AI analysis.
                </p>
                <button
                  onClick={() => navigate("/upload")}
                  className="mt-6 bg-violet-600 hover:bg-violet-700 px-6 py-3 rounded-lg"
                >
                  Upload Contract
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
