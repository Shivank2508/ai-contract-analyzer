import { useState } from "react";
import Sidebar from "../components/Sidebar";
import { uploadContract } from "../api/contractsApi";
import { useNavigate } from "react-router-dom";

export const UploadPage = () => {
    const [file, setFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [uploaded, setUploaded] = useState(false);
    const [data, setData] = useState(null);

    const navigate = useNavigate();

    const handleFileChange = async (e) => {
        const selectedFile = e.target.files[0];
        if (!selectedFile) return;

        setFile(selectedFile);
        setUploading(true);

        const formData = new FormData();
        formData.append("document", selectedFile);

        try {
            const contractData = await uploadContract(formData);

            setData(contractData.data);
            setUploaded(true);
        } catch (error) {
            console.error(error);
        } finally {
            setUploading(false);
        }
    };



    const handleAnalyze = () => {
        navigate(`/contracts/${data?._id}`)
    };
    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <main className="ml-64 flex-1 p-6">

                        <div className="mb-6">
                            <p className="uppercase tracking-[3px] text-xs text-violet-400 font-medium">
                                Upload contract
                            </p>

                            <h1 className="text-3xl font-bold mt-2">
                                Upload a contract
                            </h1>

                            <p className="text-gray-400 mt-2 max-w-3xl">
                                Drop a PDF, DOCX or scanned image. Contralytix will extract,
                                categorize and score it in under a minute.
                            </p>
                        </div>

                        <div className="relative rounded-3xl border-2 border-dashed border-violet-500/50 bg-[#141d33]/70 p-10">

                            <div className="flex flex-col items-center">

                                {!uploaded ? (
                                    <>
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center mb-8">
                                            <i className="bi bi-cloud-arrow-up text-4xl text-black"></i>
                                        </div>

                                        <h2 className="text-2xl font-semibold mb-3">
                                            Drop contract files here
                                        </h2>

                                        <p className="text-gray-400 mb-8">
                                            PDF, DOCX, TXT, JPG, PNG
                                        </p>

                                        <label className="px-8 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-400 cursor-pointer">
                                            {uploading ? "Uploading..." : "Choose File"}

                                            <input
                                                type="file"
                                                hidden
                                                onChange={handleFileChange}
                                            />
                                        </label>

                                        {uploading && (
                                            <div className="w-full max-w-md mt-6">
                                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-violet-500 animate-pulse w-full"></div>
                                                </div>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                                            <i className="bi bi-check-circle-fill text-5xl text-green-400"></i>
                                        </div>

                                        <h2 className="text-3xl font-bold text-green-400">
                                            Upload Successful
                                        </h2>

                                        <p className="mt-4 text-gray-300">
                                            <strong>{file.name}</strong>
                                        </p>

                                        <p className="text-gray-500">
                                            {(file.size / 1024 / 1024).toFixed(2)} MB
                                        </p>

                                        <button
                                            onClick={handleAnalyze}
                                            className="mt-8 px-10 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-cyan-400 text-lg font-semibold hover:scale-105 transition cursor-pointer"
                                        >
                                            Analyze Contract
                                            <i className="bi bi-arrow-right ms-2"></i>
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>


                        {/* Analysis Options */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                            {/* Deep Analysis */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-stars text-violet-400 text-lg"></i>
                                    </div>

                                    <label className="relative inline-flex ">
                                        <input type="checkbox" defaultChecked className="peer sr-only" disabled />
                                        <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10 peer-checked:bg-violet-600 transition-all duration-300"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-5"></div>
                                    </label>
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Deep analysis
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    Full clause-level review, benchmarking against
                                    <br />
                                    12k+ similar contracts.
                                </p>
                            </div>

                            {/* Auto Summary */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-file-earmark-text text-violet-400 text-lg"></i>
                                    </div>

                                    <label className="relative inline-flex ">
                                        <input type="checkbox" defaultChecked className="peer sr-only" disabled />
                                        <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10 peer-checked:bg-violet-600 transition-all duration-300"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-5"></div>
                                    </label>
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Auto-summary
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    One-page executive summary generated after
                                    <br />
                                    analysis.
                                </p>
                            </div>

                            {/* Confidential */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-lock text-violet-400 text-lg"></i>
                                    </div>

                                    <label className="relative inline-flex cursor-pointer">
                                        <input type="checkbox" className="peer sr-only" disabled />
                                        <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10 peer-checked:bg-violet-600 transition-all duration-300"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 peer-checked:translate-x-5"></div>
                                    </label>
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Confidential mode
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    Data is not used for model training.
                                    <br />
                                    SOC 2 & GDPR compliant.
                                </p>
                            </div>

                        </div>

                    </main>
                </div>
            </div>
        </div>

    );
};