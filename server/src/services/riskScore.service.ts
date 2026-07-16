export function calculateRiskScore(
     risks: any[],
    missingClauses: any[]
):number{
    const SEVERITY_WEIGHTS: Record<string, number> = { high: 15, medium: 8, low: 3 };
    const IMPORTANCE_WEIGHTS: Record<string, number> = { critical: 10, important: 5, optional: 2 };

    let totalPenalty = 0;

    // 3. Process risks safely with case-insensitivity
    for (const risk of risks) {
        const severityKey = (risk.severity || '').toLowerCase();
        totalPenalty += SEVERITY_WEIGHTS[severityKey] || 0;
    }

    // 4. Process missing clauses safely with case-insensitivity
    for (const clause of missingClauses) {
        const importanceKey = (clause.importance || '').toLowerCase();
        totalPenalty += IMPORTANCE_WEIGHTS[importanceKey] || 0;
    }

    // 5. Calculate final score out of 100
    return Math.max(0, 100 - totalPenalty);
}