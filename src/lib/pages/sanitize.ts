const MARKUP =
  /<\s*\/?\s*script\b|<\s*\/?\s*iframe\b|\bon[a-z]+\s*=|javascript\s*:|<\s*\/?\s*[a-z!]/i;

export function markupViolation(value: string): string | null {
  if (/<\s*\/?\s*script\b/i.test(value)) return "script";
  if (/<\s*\/?\s*iframe\b/i.test(value)) return "iframe";
  if (/\bon[a-z]+\s*=/i.test(value)) return "handler";
  if (/javascript\s*:/i.test(value)) return "javascript";
  if (/<\s*\/?\s*[a-z!]/i.test(value)) return "html";
  return null;
}

export function findMarkup(value: unknown): string | null {
  if (typeof value === "string") return markupViolation(value);
  if (Array.isArray(value)) {
    for (const item of value) {
      const found = findMarkup(item);
      if (found) return found;
    }
    return null;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      const found = findMarkup(item);
      if (found) return found;
    }
  }
  return null;
}

export class PageValidationError extends Error {
  constructor(reason: string) {
    super(`頁面資料含有不允許的內容：${reason}`);
    this.name = "PageValidationError";
  }
}

export function assertClean(value: unknown): void {
  const found = findMarkup(value);
  if (found) throw new PageValidationError(found);
  if (typeof value === "string" && MARKUP.test(value)) throw new PageValidationError("html");
}

export function safeUrl(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  if (!trimmed || markupViolation(trimmed)) return "";
  if (trimmed.startsWith("/") && !trimmed.startsWith("//") && !trimmed.includes("\\") && !trimmed.includes("..")) {
    return trimmed.slice(0, 300);
  }
  try {
    const url = new URL(trimmed);
    if (url.protocol === "http:" || url.protocol === "https:") return trimmed.slice(0, 500);
  } catch {
    return "";
  }
  return "";
}

export function safeColor(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return /^#(?:[0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/.test(trimmed) ? trimmed : "";
}

export function safeAnchor(value: unknown): string {
  if (typeof value !== "string") return "";
  const trimmed = value.trim();
  return /^[A-Za-z][A-Za-z0-9_-]{0,40}$/.test(trimmed) ? trimmed : "";
}

export function clipText(value: unknown, max: number, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  if (!trimmed) return fallback;
  if (markupViolation(trimmed)) return fallback;
  return trimmed.slice(0, max);
}
