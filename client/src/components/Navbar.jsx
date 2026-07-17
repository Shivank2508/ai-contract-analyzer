export default function Navbar() {
    return (
        <header className="h-20 border-b border-white/10 flex items-center justify-between px-8">

            <div className="w-[500px]">
                <div className="flex items-center rounded-xl bg-white/5 px-4 py-3">

                    <i className="bi bi-search text-lg"></i>

                    <input
                        placeholder="Ask anything about your contracts..."
                        className="ml-3 w-full bg-transparent outline-none"
                    />

                </div>
            </div>

            <div className="flex gap-4">

                <button className="rounded-xl bg-white/5 p-3">
                    <i className="bi bi-bell text-lg"></i>
                </button>

                <button className="rounded-xl bg-white/5 p-3">
                    <i className="bi bi-gear text-lg"></i>
                </button>

            </div>

        </header>
    );
}