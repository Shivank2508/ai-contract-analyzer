import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const initialContracts = [
  {
    id: 1,
    name: "Employment Agreement",
    company: "Google India",
    uploadedBy: "Shivank",
    date: "16 Jul 2026",
    clauses: 42,
    analyzed: false,
  },
  {
    id: 2,
    name: "Vendor Agreement",
    company: "Amazon",
    uploadedBy: "Rahul",
    date: "15 Jul 2026",
    clauses: 31,
    analyzed: true,
    risk: "Medium",
  },
  {
    id: 3,
    name: "NDA Contract",
    company: "Microsoft",
    uploadedBy: "Aman",
    date: "14 Jul 2026",
    clauses: 18,
    analyzed: true,
    risk: "Low",
  },
  {
    id: 4,
    name: "Rental Agreement",
    company: "Personal",
    uploadedBy: "Shivank",
    date: "13 Jul 2026",
    clauses: 26,
    analyzed: false,
  },
];

export default function ContractsPage() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  const contracts = useMemo(() => {
    return initialContracts.filter((c) => {
      const matchSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase());

      const matchFilter =
        filter === "All"
          ? true
          : filter === "Analyzed"
          ? c.analyzed
          : !c.analyzed;

      return matchSearch && matchFilter;
    });
  }, [search, filter]);

  const riskClass = (risk) => {
    if (risk === "High") return "bg-red-500/20 text-red-300";
    if (risk === "Medium") return "bg-yellow-500/20 text-yellow-300";
    return "bg-green-500/20 text-green-300";
  };

  return (
    <div className="min-h-screen bg-[#0F172A] text-white">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="uppercase tracking-[4px] text-[11px] text-gray-500">
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
                className="bg-violet-600 hover:bg-violet-700 px-5 py-2.5 rounded-lg text-sm font-medium"
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

            <div className="mt-5 space-y-3">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="bg-[#171C34] border border-white/10 rounded-xl p-4 hover:border-violet-500 transition"
                >
                  <div className="flex justify-between gap-5">
                    <div className="flex gap-4">
                      <div className="h-12 w-12 rounded-xl bg-violet-500/20 flex items-center justify-center text-xl">
                        📄
                      </div>

                      <div>
                        <h2 className="text-lg font-semibold">
                          {contract.name}
                        </h2>
                        <p className="text-sm text-gray-400">
                          {contract.company}
                        </p>

                        <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-400">
                          <span>👤 {contract.uploadedBy}</span>
                          <span>📅 {contract.date}</span>
                          <span>📄 {contract.clauses} Clauses</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-end justify-between">
                      {contract.analyzed ? (
                        <>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${riskClass(
                              contract.risk
                            )}`}
                          >
                            {contract.risk} Risk
                          </span>

                          <button
                            onClick={() =>
                              navigate(`/contracts/${contract.id}`)
                            }
                            className="mt-4 bg-violet-600 hover:bg-violet-700 px-5 py-2 rounded-lg text-sm"
                          >
                            View Analysis
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="px-3 py-1 rounded-full text-xs bg-gray-600/20 text-gray-300">
                            Not Analyzed
                          </span>

                          <button
                            onClick={() =>
                              navigate(`/analyze/${contract.id}`)
                            }
                            className="mt-4 bg-emerald-600 hover:bg-emerald-700 px-5 py-2 rounded-lg text-sm"
                          >
                            Analyze Contract
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between text-sm text-gray-400">
              <span>{contracts.length} Contracts</span>

              <div className="flex gap-2">
                <button className="px-4 py-2 rounded-lg bg-[#171C34] border border-white/10">
                  Previous
                </button>
                <button className="px-4 py-2 rounded-lg bg-violet-600">
                  Next
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
