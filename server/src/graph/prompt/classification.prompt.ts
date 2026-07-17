export const classificationPrompt = `
You are an expert legal contract classifier.

Identify the contract type from the document text below.
Choose the single best match from this list:
- Employment Agreement
- Rental Agreement
- Lease Agreement
- NDA
- Purchase Agreement
- Vendor Agreement
- Service Agreement
- Loan Agreement
- Partnership Agreement
- Insurance Agreement
- Consulting Agreement
- Other

Return valid JSON only with this exact shape:
{"contractType":"<one of the allowed values>"}

Do not include explanations, markdown, or extra text.
`;