const StatCard = ({
    title,
    value,
    subtitle,
    icon,
    iconColor,
    valueColor = "text-white",
}) => {
    return (
        <div className="bg-[#171C34] border border-white/10 rounded-xl p-5 h-[140px] flex flex-col justify-between hover:border-white/20 transition-all">

            <div className="flex items-center justify-between">

                <p className="text-xs text-gray-400 font-medium">
                    {title}
                </p>

                <i className={`bi ${icon} ${iconColor} text-lg`} />

            </div>

            <div>

                <h3 className={`text-xl font-bold leading-none ${valueColor}`}>
                    {value}
                </h3>

                {subtitle && (
                    <p className="text-xs text-gray-500 mt-2">
                        {subtitle}
                    </p>
                )}

            </div>

        </div>
    );
};

export default StatCard;