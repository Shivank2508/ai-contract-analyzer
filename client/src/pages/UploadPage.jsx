import Sidebar from "../components/Sidebar";

export const UploadPage = () => {
    return (
        <div className="min-h-screen bg-[#0F172A] text-white">
            <div className="flex">
                <Sidebar />
                <div className="flex-1">
                    <main className="p-8">
                        <p className="text-sm text-gray-400 mb-4">
                            Dashboard <span className="mx-2">/</span>
                            <span className="text-white font-medium">Upload contract</span>
                        </p>

                        {/* Heading */}
                        <h1 className="text-2xl font-bold mb-3">Upload a contract</h1>

                        <p className="text-gray-400 text-ll mb-10">
                            Drop a PDF, DOCX or scanned image. Clausal will extract,
                            categorize and score it in under a minute.
                        </p>

                        {/* Upload Box */}
                        <div className="relative rounded-3xl border-2 border-dashed border-violet-500/50 bg-[#141d33]/70 p-10 overflow-hidden">
                            {/* Glow */}
                            <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-400/5"></div>

                            <div className="relative flex flex-col items-center justify-center">
                                {/* Icon */}
                                <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-violet-500 to-cyan-400 flex items-center justify-center shadow-2xl shadow-cyan-500/30 mb-8">
                                    <i className="bi bi-cloud-arrow-up text-4xl text-black"></i>
                                </div>

                                <h2 className="text-4xl font-semibold mb-4">
                                    Drop contract files here
                                </h2>

                                <p className="text-gray-400 text-lg mb-10">
                                    or click to browse · PDF, DOCX, TXT, JPG, PNG · up to 50MB
                                </p>

                                <button className="px-8 py-4 rounded-2xl bg-gradient-to-r from-violet-500 to-fuchsia-400 hover:scale-105 duration-300 text-xl font-semibold flex items-center gap-3">
                                    Choose file
                                    <i className="bi bi-arrow-right"></i>
                                </button>

                                <input
                                    type="file"
                                    className="absolute inset-0 opacity-0 cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Analysis Options */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">

                            {/* Deep Analysis */}
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-stars text-violet-400 text-lg"></i>
                                    </div>

                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input cursor-pointer"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
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
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-file-earmark-text text-violet-400 text-lg"></i>
                                    </div>

                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input cursor-pointer"
                                            type="checkbox"
                                            defaultChecked
                                        />
                                    </div>
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
                            <div className="bg-[#161B2E] border border-[#232943] rounded-3xl p-6 hover:border-violet-500 transition">
                                <div className="flex items-start justify-between mb-5">
                                    <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center">
                                        <i className="bi bi-lock text-violet-400 text-lg"></i>
                                    </div>

                                    <div className="form-check form-switch">
                                        <input
                                            className="form-check-input cursor-pointer"
                                            type="checkbox"
                                        />
                                    </div>
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