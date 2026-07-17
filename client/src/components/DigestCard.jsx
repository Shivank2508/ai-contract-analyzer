export default function DigestCard() {
    return (
        <div className="rounded-3xl bg-[#24213F] border border-white/10 p-8">

            <p className="uppercase tracking-[4px] text-gray-400 text-xs">
                Clausal AI • Daily Digest
            </p>

            <h2 className="text-3xl font-semibold mt-5">
                3 contracts need your attention today
            </h2>

            <div className="space-y-4 mt-8">

                <div className="rounded-xl bg-black/20 p-5">
                    🔴 Northwind MSA has a liability cap issue.
                </div>

                <div className="rounded-xl bg-black/20 p-5">
                    🟡 Meridian SaaS SLA below recommended.
                </div>

                <div className="rounded-xl bg-black/20 p-5">
                    🟢 Halcyon NDA looks safe.
                </div>

            </div>

        </div>
    );
}