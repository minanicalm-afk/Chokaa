export function cn(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function paragraphs(text: string | null | undefined) {
  return (text ?? "")
    .split(/\n\n+/)
    .map((part) => part.trim())
    .filter(Boolean);
}

export function firstSentence(text: string) {
  const match = text.split(/\n\n+/)[0] ?? text;
  const end = match.indexOf(". ");
  return end === -1 ? match : match.slice(0, end + 1);
}

export function formatDate(value: Date | string) {
  const date = value instanceof Date ? value : new Date(value);
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function toMpesaPhone(input: string) {
  const compact = input.replace(/[\s-]/g, "");
  if (compact.startsWith("+")) return compact.slice(1);
  if (compact.startsWith("0")) return `254${compact.slice(1)}`;
  return compact;
}
