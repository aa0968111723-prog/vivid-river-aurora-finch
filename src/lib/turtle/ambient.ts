export type AmbientHandle = { stop: () => void };

/** One live source. Turning the sound off stops that source; turning it on does not stack another. */
export function nextAmbient(current: AmbientHandle | null, create: () => AmbientHandle): AmbientHandle | null {
  if (current) {
    current.stop();
    return null;
  }
  return create();
}
