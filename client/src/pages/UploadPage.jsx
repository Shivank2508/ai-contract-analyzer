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
        navigate(`/contracts/${data?._id}`);
    };

    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <div className="flex">
                <Sidebar />

                <div className="flex-1">
                    <main className="ml-64 flex-1 p-6">

                        {/* Header */}
                        <div className="mb-6">
                            <p className="uppercase tracking-[3px] text-xs text-violet-400 font-medium">
                                Upload Contract
                            </p>

                            <h1 className="text-3xl font-bold mt-2">
                                Upload a Contract
                            </h1>

                            <p className="text-gray-400 mt-2 max-w-3xl">
                                Upload your legal agreement and let Contralytix
                                analyze clauses, risks, obligations, and generate
                                an AI-powered summary in seconds.
                            </p>

                            {/* Warning */}
                            <div className="mt-6 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 flex gap-4">
                                <div className="text-amber-400 text-2xl">
                                    <i className="bi bi-exclamation-triangle-fill"></i>
                                </div>

                                <div>
                                    <h3 className="text-amber-300 font-semibold text-lg">
                                        Current Limitation
                                    </h3>

                                    <p className="text-amber-100/90 mt-2 leading-7">
                                        Contralytix currently supports
                                        <span className="font-semibold">
                                            {" "}text-based PDF contracts only.
                                        </span>
                                        {" "}Support for scanned PDFs, OCR,
                                        DOCX, Word documents, images (JPG/PNG),
                                        and handwritten contracts is currently
                                        under development and will be available
                                        in an upcoming release.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Upload Card */}
                        <div className="relative rounded-3xl border-2 border-dashed border-violet-500/50 bg-[#141d33]/70 p-10">

                            <div className="flex flex-col items-center">

                                {!uploaded ? (
                                    <>
                                        <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center mb-8">
                                            <i className="bi bi-cloud-arrow-up text-4xl text-black"></i>
                                        </div>

                                        <h2 className="text-2xl font-semibold mb-3">
                                            Upload Your Contract
                                        </h2>

                                        <p className="text-gray-300">
                                            Supported format:
                                            <span className="text-violet-400 font-semibold">
                                                {" "}Text-based PDF
                                            </span>
                                        </p>

                                        <p className="text-sm text-amber-400 mb-8 mt-2">
                                            DOCX, scanned PDFs, images (JPG/PNG),
                                            and OCR support are coming soon.
                                        </p>

                                        <label className="px-8 py-3 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-400 cursor-pointer hover:scale-105 transition">
                                            {uploading ? "Uploading..." : "Choose PDF"}

                                            <input
                                                type="file"
                                                hidden
                                                accept=".pdf,application/pdf"
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

                        {/* Features */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                            {/* Deep Analysis */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-stars text-violet-400 text-lg"></i>
                                    </div>

                                    <label className="relative inline-flex">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="peer sr-only"
                                            disabled
                                        />
                                        <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10 peer-checked:bg-violet-600"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white peer-checked:translate-x-5 transition-all"></div>
                                    </label>
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Deep Analysis
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    AI-powered clause extraction, risk detection,
                                    obligation analysis, and legal insights.
                                </p>
                            </div>

                            {/* Summary */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-file-earmark-text text-violet-400 text-lg"></i>
                                    </div>

                                    <label className="relative inline-flex">
                                        <input
                                            type="checkbox"
                                            defaultChecked
                                            className="peer sr-only"
                                            disabled
                                        />
                                        <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10 peer-checked:bg-violet-600"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white peer-checked:translate-x-5 transition-all"></div>
                                    </label>
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Auto Summary
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    Receive an executive summary with important
                                    clauses, obligations, and legal highlights.
                                </p>
                            </div>

                            {/* Privacy */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition-all duration-300">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-lock text-violet-400 text-lg"></i>
                                    </div>

                                    <label className="relative inline-flex">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            disabled
                                        />
                                        <div className="w-12 h-7 rounded-full bg-white/10 border border-white/10"></div>
                                        <div className="absolute left-1 top-1 w-5 h-5 rounded-full bg-white"></div>
                                    </label>
                                </div>

                                <h3 className="text-xl font-semibold mb-2">
                                    Confidential
                                </h3>

                                <p className="text-gray-400 leading-7">
                                    Your uploaded contracts remain private and
                                    are never used for AI model training.
                                </p>
                            </div>

                        </div>

                    </main>
                </div>
            </div>
        </div>
    );
};
