import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdownComponents = {
    h1: ({ children }) => (
        <h1 className="text-xl font-semibold text-white mb-3">{children}</h1>
    ),
    h2: ({ children }) => (
        <h2 className="text-lg font-semibold text-white mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
        <h3 className="text-base font-semibold text-white mb-2">{children}</h3>
    ),
    p: ({ children }) => (
        <p className="text-gray-300 leading-7 mb-3">{children}</p>
    ),
    ul: ({ children }) => (
        <ul className="space-y-2 pl-5 mb-4 list-disc">{children}</ul>
    ),
    li: ({ children }) => (
        <li className="text-gray-300">{children}</li>
    ),
    strong: ({ children }) => (
        <strong className="text-white font-semibold">{children}</strong>
    ),
};

const MarkdownColumn = ({ sections }) => (
    <div className="space-y-5">
        {sections.map((section, index) => (
            <div
                key={index}
                className="prose prose-invert max-w-none prose-p:text-gray-300 prose-li:text-gray-300 prose-strong:text-white"
            >
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={markdownComponents}
                >
                    {section}
                </ReactMarkdown>
            </div>
        ))}
    </div>
);

export default function ExecutiveSummary({ summary }) {
    const summarySections =
        summary
            ?.split("\n\n")
            .filter((section) => section.trim() !== "") || [];

    const middleIndex = Math.ceil(summarySections.length / 2) + 1;

    const leftSections = summarySections.slice(0, middleIndex);
    const rightSections = summarySections.slice(middleIndex);

    return (
        <div className="bg-[#171C34] border border-white/10 rounded-xl h-full">
            <div className="border-b border-white/10 px-5 py-4 flex items-center justify-between">
                <div>
                    <h2 className="font-semibold text-lg">
                        Executive Summary
                    </h2>
                    <p className="text-xs text-gray-400 mt-1">
                        AI generated contract overview
                    </p>
                </div>

                <div className="h-10 w-10 rounded-lg bg-violet-500/20 flex items-center justify-center">
                    <i className="bi bi-stars text-violet-400"></i>
                </div>
            </div>

            <div className="p-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <MarkdownColumn sections={leftSections} />
                    <MarkdownColumn sections={rightSections} />
                </div>
            </div>
        </div>
    );
}