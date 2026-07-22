export default function StatsCard({
    title,
    value,
    subtitle,
    icon,
}) {
    return (
        <div className="rounded-2xl bg-slate-900/70 border border-white/10 p-4 backdrop-blur-md">

            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs uppercase tracking-wide text-slate-400">
                        {title}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold">
                        {value}
                    </h2>

                    <p className="mt-1 text-xs text-slate-500">
                        {subtitle}
                    </p>
                </div>

                <div className="h-10 w-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-400 text-xl">
                    <i className={icon}></i>
                </div>
            </div>

        </div>
    );
}