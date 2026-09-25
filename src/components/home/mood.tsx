import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { EventCard } from "@/components/events/event-card";
import { MOODS, SITE } from "@/lib/site";
import { track } from "@/lib/analytics";
import type { EventRecord } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function MoodPicker({
  events,
  title = "最近的你，是哪一種狀態？",
  subtitle = "第一次認識禪學社",
}: {
  events: EventRecord[];
  title?: string;
  subtitle?: string;
}) {
  const [mood, setMood] = useState<string | null>(null);
  const selected = MOODS.find((m) => m.id === mood);
  const recs = useMemo(() => {
    if (!selected) return [];
    const now = Date.now();
    return events
      .filter(
        (e) =>
          (selected.categories as readonly string[]).includes(e.categoryId) &&
          Date.parse(e.endsAt) >= now &&
          e.computedStatus !== "ended",
      )
      .slice(0, 3);
  }, [events, selected]);

  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p>
        <h2 className="mt-2 max-w-lg font-display text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <p className="mt-3 max-w-lg text-mist">
          不是測驗，也不是診斷。選一個最接近的，我們帶你去看看適合的活動。
        </p>
        <div className="mt-8 flex flex-wrap gap-2">
          {MOODS.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setMood(item.id);
                track("mood_select", { eventId: item.id });
              }}
              className={cn(
                "min-h-11 rounded-full border px-4 text-sm transition-colors",
                mood === item.id
                  ? "border-leaf bg-leaf text-leaf-fg"
                  : "border-line bg-raised text-ink hover:bg-canvas",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
        {selected ? (
          <div className="mt-8">
            <p className="text-ink">{selected.lead}</p>
            {recs.length ? (
              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {recs.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="mt-6 rounded-xl border border-line bg-raised p-6">
                <p className="text-mist">
                  最近的場次還在排，先追{" "}
                  <a href={SITE.instagramUrl} className="text-leaf" target="_blank" rel="noreferrer">
                    IG {SITE.instagramHandle}
                  </a>
                  。
                </p>
                <Button asChild className="mt-4" variant="outline">
                  <Link to="/first-time">第一次來專區</Link>
                </Button>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
