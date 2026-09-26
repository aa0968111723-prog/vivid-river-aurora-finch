import { Link } from "@tanstack/react-router";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CATEGORY_LABELS, STATUS_LABELS } from "@/lib/site";
import { formatEventRange } from "@/lib/format";
import type { EventRecord, EventStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

const toneMap: Record<EventStatus, "open" | "filling" | "upcoming" | "full" | "ended"> = {
  open: "open",
  filling: "filling",
  upcoming: "upcoming",
  full: "full",
  ended: "ended",
};

export function EventCard({
  event,
  featured = false,
}: {
  event: EventRecord;
  featured?: boolean;
}) {
  return (
    <Link
      to="/events/$slug"
      params={{ slug: event.slug }}
      className={cn(
        "group flex flex-col overflow-hidden rounded-xl bg-raised shadow-lift border border-line/80 no-underline text-ink",
        featured ? "min-w-[280px]" : "",
      )}
    >
      {event.coverImage ? (
        <div className="relative aspect-[4/3] overflow-hidden bg-paper">
          <img
            src={event.coverImage}
            alt=""
            className="size-full object-contain"
            loading="lazy"
          />
          <div className="absolute left-3 top-3 flex gap-1.5">
            <Badge tone={toneMap[event.computedStatus]}>{STATUS_LABELS[event.computedStatus]}</Badge>
          </div>
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {event.coverImage ? null : (
          <Badge tone={toneMap[event.computedStatus]}>{STATUS_LABELS[event.computedStatus]}</Badge>
        )}
        <p className="text-xs font-medium tracking-wide text-leaf">
          {CATEGORY_LABELS[event.categoryId] ?? event.categoryName}
        </p>
        <h3 className="font-display text-lg font-semibold leading-snug tracking-tight">
          {event.title}
        </h3>
        <p className="text-sm text-mist">{formatEventRange(event.startsAt, event.endsAt)}</p>
        <p className="flex items-center gap-1.5 text-sm text-mist">
          <MapPin className="size-3.5 shrink-0" aria-hidden />
          <span className="truncate">{event.locationName}</span>
        </p>
        <p className="mt-auto pt-1 text-sm leading-relaxed text-ink/80 line-clamp-2">
          {event.summary}
        </p>
      </div>
    </Link>
  );
}

export function EventStatusBadge({ status }: { status: EventStatus }) {
  return <Badge tone={toneMap[status]}>{STATUS_LABELS[status]}</Badge>;
}
