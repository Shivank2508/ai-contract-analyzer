export const extractionPrompt = `
You are an expert legal AI.

Extract the important information from the contract below.
Return valid JSON only with this exact shape:
{"contractTitle":null,"employer":null,"employee":null,"client":null,"vendor":null,"effectiveDate":null,"endDate":null,"duration":null,"payment":null,"currency":null,"noticePeriod":null,"jurisdiction":null,"governingLaw":null,"confidentiality":false,"nonCompete":null,"termination":null,"intellectualProperty":null,"liability":null,"disputeResolution":null}

Rules:
- Return only JSON.
- If a value is missing, use null.
- Do not invent information.
- Dates should remain exactly as written.
- Boolean values should be true or false.
`;