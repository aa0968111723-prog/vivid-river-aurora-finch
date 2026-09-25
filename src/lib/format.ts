import type { EventStatus, RegistrationMode } from "./types";

const TAIPEI = "Asia/Taipei";

export function computeEventStatus(input: {
  startsAt: string;
  endsAt: string;
  capacity: number | null;
  registeredCount: number | null;
  statusOverride: EventStatus | null;
  registrationMode: RegistrationMode;
}): EventStatus {
  if (input.statusOverride) return input.statusOverride;
  const now = Date.now();
  const ends = Date.parse(input.endsAt);
  const starts = Date.parse(input.startsAt);
  if (Number.isFinite(ends) && now > ends) return "ended";
  if (input.capacity != null && input.registeredCount != null) {
    if (input.registeredCount >= input.capacity) return "full";
    if (input.capacity - input.registeredCount <= 3) return "filling";
  }
  if (input.registrationMode !== "closed" && (!Number.isFinite(starts) || now < starts)) {
    return "open";
  }
  return "upcoming";
}

function taipeiParts(iso: string) {
  const date = new Date(iso);
  const fmt = new Intl.DateTimeFormat("zh-TW", {
    timeZone: TAIPEI,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const bag: Record<string, string> = {};
  for (const p of fmt.formatToParts(date)) {
    if (p.type !== "literal") bag[p.type] = p.value;
  }
  return bag;
}

export function formatEventDate(iso: string) {
  const p = taipeiParts(iso);
  const weekday = (p.weekday ?? "").replace("週", "");
  return `${p.month}/${p.day}（${weekday}）`;
}

export function formatEventTime(iso: string) {
  const p = taipeiParts(iso);
  return `${p.hour}:${p.minute}`;
}

export function formatEventRange(startsAt: string, endsAt: string) {
  const start = formatEventTime(startsAt);
  const end = formatEventTime(endsAt);
  if (start === "00:00" && (end === "23:59" || end === "00:00")) {
    return formatEventDate(startsAt);
  }
  return `${formatEventDate(startsAt)} ${start}–${end}`;
}

export function formatRemaining(capacity: number | null, registered: number | null) {
  if (capacity == null || registered == null) return null;
  const left = Math.max(0, capacity - registered);
  return left;
}
