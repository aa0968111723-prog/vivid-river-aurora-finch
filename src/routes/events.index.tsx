import { useMemo, useState, type ReactNode } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { EventCard } from "@/components/events/event-card";
import { getPublishedEvents } from "@/lib/server/public";
import { CATEGORY_LABELS, SITE, STATUS_LABELS } from "@/lib/site";
import type { EventRecord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/events/")({
  loader: () => getPublishedEvents(),
  pendingComponent: () => (
    <div className="mx-auto max-w-6xl space-y-4 px-5 py-10">
      <Skeleton className="h-10 w-48" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
        <Skeleton className="h-72" />
      </div>
    </div>
  ),
  component: EventsPage,
  head: () => ({
    meta: [
      { title: `活動｜${SITE.name}` },
      { name: "description", content: "茶會、社課、禪修體驗、期初演講。第一次來也沒關係。" },
    ],
  }),
});

const CATS = ["all", "tea", "lecture", "class", "zen", "outdoor", "gathering"] as const;
const STATUSES = ["all", "open", "filling", "upcoming", "ended"] as const;

export function EventsPage() {
  const events = Route.useLoaderData();
  const [cat, setCat] = useState<string>("all");
  const [status, setStatus] = useState<string>("all");
  const filtered = useMemo(() => {
    return events.filter((e: EventRecord) => {
      if (cat !== "all" && e.categoryId !== cat) return false;
      if (status !== "all" && e.computedStatus !== status) return false;
      return true;
    });
  }, [events, cat, status]);
  const upcoming = filtered.filter((e) => e.computedStatus !== "ended");
  const past = filtered.filter((e) => e.computedStatus === "ended");

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-6 md:py-16">
      <p className="text-sm font-medium tracking-wide text-leaf">活動</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">最近想去哪一場？</h1>
      <p className="mt-3 max-w-xl text-mist">一個人來完全 OK。選一場、到現場就好。</p>
      <div className="mt-6 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {CATS.map((id) => (
          <Chip key={id} active={cat === id} onClick={() => setCat(id)}>
            {id === "all" ? "全部" : CATEGORY_LABELS[id]}
          </Chip>
        ))}
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {STATUSES.map((id) => (
          <Chip key={id} active={status === id} onClick={() => setStatus(id)}>
            {id === "all" ? "所有狀態" : STATUS_LABELS[id]}
          </Chip>
        ))}
      </div>
      {upcoming.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {upcoming.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="mt-8 rounded-xl border border-line bg-paper p-6 text-mist">
          這個篩選目前沒有場次。換一個分類，或去 IG 看最新的。
        </p>
      )}
      {status === "all" && past.length ? (
        <div className="mt-14">
          <h2 className="font-display text-2xl font-semibold tracking-tight">已經辦過的</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {past.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ) : null}
    </main>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "min-h-10 shrink-0 rounded-full border px-4 text-sm",
        active ? "border-leaf bg-leaf text-leaf-fg" : "border-line bg-raised text-ink",
      )}
    >
      {children}
    </button>
  );
}
