export const TURTLE_SEEN_KEY = "tku-zen-seen";

export function readTurtleSeen(storage: { getItem(key: string): string | null }): boolean {
  return storage.getItem(TURTLE_SEEN_KEY) === "1";
}

export function writeTurtleSeen(storage: { setItem(key: string, value: string): void }) {
  storage.setItem(TURTLE_SEEN_KEY, "1");
}

export function clearTurtleSeen(storage: { removeItem(key: string): void }) {
  storage.removeItem(TURTLE_SEEN_KEY);
}
