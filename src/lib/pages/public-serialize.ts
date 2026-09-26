const PRIVATE_KEYS = new Set([
  "draft",
  "drafts",
  "canvaUrl",
  "canva_url",
  "driveUrl",
  "drive_url",
]);

function isPrivateUrl(value: string): boolean {
  return /canva\.com\/design/i.test(value) || /drive\.google\.com/i.test(value) || /docs\.google\.com\/.*\/edit/i.test(value);
}

function isUnpublished(value: Record<string, unknown>): boolean {
  if (value.published === false) return true;
  if (value.visibility === "private") return true;
  if (value.status === "draft" || value.status === "unpublished") return true;
  return false;
}

export function serializePublic(value: unknown): unknown {
  if (typeof value === "string") return isPrivateUrl(value) ? "" : value;
  if (Array.isArray(value)) {
    return value
      .filter((item) => !(item && typeof item === "object" && !Array.isArray(item) && isUnpublished(item as Record<string, unknown>)))
      .map((item) => serializePublic(item));
  }
  if (!value || typeof value !== "object") return value;
  const output: Record<string, unknown> = {};
  for (const [key, item] of Object.entries(value as Record<string, unknown>)) {
    if (PRIVATE_KEYS.has(key)) continue;
    const next = serializePublic(item);
    if (typeof next === "string" && isPrivateUrl(next)) continue;
    output[key] = next;
  }
  return output;
}
