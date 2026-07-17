export default function StatsCard({
    title,
    value,
    subtitle,
}) {
    return (
        <div className="rounded-3xl bg-white/5 backdrop-blur-xl p-6 border border-white/10">

            <p className="text-gray-400">
                {title}
            </p>

            <h2 className="text-5xl font-bold mt-5">
                {value}
            </h2>

            <p className="mt-4 text-sm text-gray-500">
                {subtitle}
            </p>

        </div>
    );
}