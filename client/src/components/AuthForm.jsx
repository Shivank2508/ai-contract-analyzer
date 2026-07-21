import { useState } from "react";

const AuthForm = ({ mode, onSubmit, loading, error }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        setFormData((prev) => ({
            ...prev,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {mode === "signup" && (
                <div>
                    <label className="mb-2 block text-sm font-medium text-gray-300">
                        Full Name
                    </label>

                    <input
                        name="name"
                        type="text"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full rounded-xl border border-white/10 bg-[#1B2032] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                    />
                </div>
            )}

            {/* Email */}
            <div>
                <label className="mb-2 block text-sm font-medium text-gray-300">
                    Work Email
                </label>

                <input
                    name="email"
                    type="email"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#1B2032] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
            </div>

            {/* Password */}
            <div>
                <div className="mb-2 flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-300">
                        Password
                    </label>

                    {mode === "login" && (
                        <button
                            type="button"
                            className="text-sm text-purple-400 hover:text-purple-300"
                        >
                            Forgot?
                        </button>
                    )}
                </div>

                <input
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-[#1B2032] px-4 py-3 text-white placeholder:text-gray-500 outline-none transition duration-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
            </div>

            {/* Error */}
            {error && (
                <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                    {error}
                </div>
            )}

            {/* Button */}
            <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-400 px-4 py-3 text-lg font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/30 disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
            >
                {loading ? (
                    <div className="flex items-center gap-3">
                        <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        Please wait...
                    </div>
                ) : mode === "signup" ? (
                    "Create Account"
                ) : (
                    <div className="flex items-center gap-2">
                        Sign In
                        <span>→</span>
                    </div>
                )}
            </button>


        </form>
    );
};

export default AuthForm;