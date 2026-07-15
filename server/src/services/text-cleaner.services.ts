export function cleanText(text: string): string {
    text = text.replace(/\r\n/g, "\n");

    text = text.replace(/\r/g, "\n");

    text = text.replace(/[ \t]+/g, " ");

    text = text.replace(/\n{3,}/g, "\n\n");

    text = text.trim();
    return text
}