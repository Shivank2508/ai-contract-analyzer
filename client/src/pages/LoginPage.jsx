import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError("");

        try {
            await login(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#090B17] text-white">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Side */}
                <div className="relative flex flex-col justify-between overflow-hidden p-10 px-16 ">

                    {/* Background Blur */}
                    <div className="absolute inset-0">
                        <div className="absolute -top-32 left-10 h-96 w-96 rounded-full bg-purple-600/20 blur-[140px]" />
                        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-[120px]" />
                    </div>

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r from-sky-400 to-purple-500 font-bold">
                                C
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold">Contralytix</h2>
                                <p className="text-xs tracking-[4px] uppercase text-gray-400">
                                    AI That Understands Contracts
                                </p>
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="mt-16 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                            <span className="h-2 w-2 rounded-full bg-green-400"></span>
                            New · Clause diff & negotiation copilot
                        </div>

                        {/* Heading */}
                        <h1 className="mt-8 max-w-3xl text-6xl font-bold leading-tight">
                            Read every contract
                            <br />
                            <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                                like a partner would
                            </span>
                            <br />
                            in seconds.
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
                            Analyze NDAs, employment agreements, SaaS contracts and vendor
                            agreements instantly. Surface risky clauses, benchmark against
                            market standards and receive AI-powered recommendations.
                        </p>

                        {/* Stats */}
                        <div className="mt-14 flex flex-wrap gap-6">
                            {[
                                {
                                    value: "6",
                                    label: "Findings",
                                    sub: "Risk scored",
                                },
                                {
                                    value: "312 hrs",
                                    label: "Time Saved",
                                    sub: "Saved",
                                },
                                {
                                    value: "128",
                                    label: "Documents",
                                    sub: "Analyzed",
                                },
                            ].map((item) => (
                                <div
                                    key={item.label}
                                    className="w-44 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
                                >
                                    <h3 className="text-3xl font-bold">{item.value}</h3>
                                    <p className="mt-2 text-lg">{item.label}</p>
                                    <p className="text-sm text-gray-400">{item.sub}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <p className="relative z-10 text-sm text-gray-500">
                        Trusted by legal teams across startups and enterprises.
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-8 ">

                    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-2xl">

                        <p className="mb-2 text-sm uppercase tracking-[4px] text-gray-400">
                            Sign In
                        </p>

                        <h2 className="text-4xl font-bold">
                            Welcome back
                        </h2>

                        <p className="mt-2 mb-8 text-gray-400">
                            Continue to your contract workspace.
                        </p>

                        <AuthForm
                            mode="login"
                            onSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />

                        <div className="my-6 flex items-center">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="px-3 text-sm text-gray-500">OR</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>
                        <div className="mt-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-4">
                            <p className="text-sm font-medium text-amber-300">
                                Don't want to create an account?
                            </p>

                            <p className="mt-2 text-sm text-gray-300">
                                Sign in with the demo credentials below:
                            </p>

                            <div className="mt-3 space-y-2 rounded-lg bg-black/20 p-3 text-sm">
                                <p>
                                    <span className="font-semibold text-white">Email:</span>{" "}
                                    <span className="text-sky-300">johndoe@example.com</span>
                                </p>

                                <p>
                                    <span className="font-semibold text-white">Password:</span>{" "}
                                    <span className="text-sky-300">SecurePassword123</span>
                                </p>
                            </div>
                        </div>

                        {/* <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#171A29] py-3 transition hover:bg-[#202338]">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="h-5"
                                alt=""
                            />
                            Continue with Google
                        </button> */}

                        <p className="mt-8 text-center text-gray-400">
                            Don't have an account?{" "}
                            <Link
                                to="/signup"
                                className="font-semibold text-purple-400 hover:text-purple-300"
                            >
                                Create one
                            </Link>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default LoginPage;