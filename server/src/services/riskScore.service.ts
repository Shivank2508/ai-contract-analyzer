export function calculateRiskScore(
    risks: any[],
    missingClauses: any[]
): number {
    const SEVERITY_WEIGHTS: Record<string, number> = {
        high: 15,
        medium: 8,
        low: 3,
    };

    const IMPORTANCE_WEIGHTS: Record<string, number> = {
        critical: 10,
        important: 5,
        optional: 2,
    };

    let score = 0;

    for (const risk of risks) {
        const severity = String(risk.severity ?? "").toLowerCase();
        score += SEVERITY_WEIGHTS[severity] ?? 0;
    }

    for (const clause of missingClauses) {
        const importance = String(clause.importance ?? "").toLowerCase();
        score += IMPORTANCE_WEIGHTS[importance] ?? 0;
    }

    return Math.min(100, score);
}