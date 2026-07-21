import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
    const navigate = useNavigate();
    const { signup } = useAuth();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (formData) => {
        setLoading(true);
        setError("");

        try {
            await signup(formData);
            navigate("/dashboard");
        } catch (err) {
            setError(err.message || "Signup failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#090B17] text-white">
            <div className="grid min-h-screen lg:grid-cols-2">

                {/* Left Side */}
                <div className="relative flex flex-col justify-between overflow-hidden p-10 px-16">

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
                                <p className="text-xs uppercase tracking-[4px] text-gray-400">
                                    AI That Understands Contracts
                                </p>
                            </div>
                        </div>

                        {/* Badge */}
                        <div className="mt-16 inline-flex items-center gap-2 rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm text-purple-300">
                            <span className="h-2 w-2 rounded-full bg-green-400"></span>
                            Secure · AI-powered legal workspace
                        </div>

                        {/* Heading */}
                        <h1 className="mt-8 max-w-3xl text-6xl font-bold leading-tight">
                            Build your
                            <br />
                            <span className="bg-gradient-to-r from-sky-400 to-purple-400 bg-clip-text text-transparent">
                                AI legal workspace
                            </span>
                            <br />
                            today.
                        </h1>

                        <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-400">
                            Create your account to analyze contracts, detect legal
                            risks, compare clauses, and receive AI-powered legal
                            insights in seconds.
                        </p>

                        {/* Features */}
                        <div className="mt-14 flex flex-wrap gap-6">
                            {[
                                {
                                    value: "AI",
                                    label: "Clause Review",
                                    sub: "Instant Analysis",
                                },
                                {
                                    value: "99%",
                                    label: "Risk Detection",
                                    sub: "Accurate Insights",
                                },
                                {
                                    value: "∞",
                                    label: "Contracts",
                                    sub: "Upload Anytime",
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
                        Join professionals using AI to simplify legal review.
                    </p>
                </div>

                {/* Right Side */}
                <div className="flex items-center justify-center p-8">

                    <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-10 shadow-2xl backdrop-blur-2xl">

                        <p className="mb-2 text-sm uppercase tracking-[4px] text-gray-400">
                            Create Account
                        </p>

                        <h2 className="text-4xl font-bold">
                            Get started
                        </h2>

                        <p className="mt-2 mb-8 text-gray-400">
                            Create your account and start analyzing contracts with AI.
                        </p>

                        <AuthForm
                            mode="signup"
                            onSubmit={handleSubmit}
                            loading={loading}
                            error={error}
                        />

                        <div className="my-6 flex items-center">
                            <div className="h-px flex-1 bg-white/10" />
                            <span className="px-3 text-sm text-gray-500">OR</span>
                            <div className="h-px flex-1 bg-white/10" />
                        </div>

                        {/* <button className="flex w-full items-center justify-center gap-3 rounded-xl border border-white/10 bg-[#171A29] py-3 transition hover:bg-[#202338]">
                            <img
                                src="https://www.svgrepo.com/show/475656/google-color.svg"
                                className="h-5"
                                alt="Google"
                            />
                            Continue with Google
                        </button> */}

                        <p className="mt-8 text-center text-gray-400">
                            Already have an account?{" "}
                            <Link
                                to="/login"
                                className="font-semibold text-purple-400 hover:text-purple-300"
                            >
                                Sign in
                            </Link>
                        </p>

                    </div>

                </div>

            </div>
        </div>
    );
};

export default SignupPage;