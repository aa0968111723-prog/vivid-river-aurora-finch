import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, withUtm } from "@/lib/site";
import { formatRemaining } from "@/lib/format";
import { track } from "@/lib/analytics";
import type { EventRecord } from "@/lib/types";

export function RegisterCta({ event }: { event: EventRecord }) {
  const remaining = formatRemaining(event.capacity, event.registeredCount);
  const ended = event.computedStatus === "ended" || event.computedStatus === "full";
  const closed = event.registrationMode === "closed";

  if (ended) {
    return (
      <div className="rounded-xl border border-line bg-paper p-5">
        <p className="font-medium">這一場已經結束或額滿了</p>
        <p className="mt-1 text-sm text-mist">可以看看別場，或去 IG 看下一波。</p>
        <Button asChild className="mt-4" variant="outline">
          <a href="/events">其他活動</a>
        </Button>
      </div>
    );
  }

  if (closed) {
    return (
      <div className="rounded-xl border border-line bg-paper p-5">
        <p className="font-medium">不需報名</p>
        <p className="mt-1 text-sm text-mist">
          {event.registrationNote ?? "到現場就好。"}
        </p>
      </div>
    );
  }

  const href =
    event.registrationMode === "instagram_dm"
      ? withUtm(event.registrationUrl || SITE.instagramDmUrl, {
          medium: "event",
          campaign: event.slug,
        })
      : event.registrationUrl
        ? withUtm(event.registrationUrl, { medium: "event", campaign: event.slug })
        : withUtm(SITE.instagramUrl, { medium: "event", campaign: event.slug });

  const label =
    event.registrationMode === "instagram_dm"
      ? "IG 私訊我要參加"
      : "我要參加";

  return (
    <div className="rounded-xl border border-line bg-raised p-5 shadow-lift">
      <p className="font-display text-xl font-semibold tracking-tight">想去的話</p>
      {remaining != null ? (
        <p className="mt-1 text-sm text-mist">還有大約 {remaining} 個位子（社員回報，非即時）</p>
      ) : (
        <p className="mt-1 text-sm text-mist">報名狀態由社團更新，不會假裝即時人數。</p>
      )}
      {event.registrationNote ? (
        <p className="mt-2 text-sm text-mist">{event.registrationNote}</p>
      ) : null}
      <Button asChild className="mt-4 w-full" size="lg">
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          onClick={() => track("event_register_cta", { eventId: event.id })}
        >
          {event.registrationMode === "instagram_dm" ? <Instagram className="size-4" /> : null}
          {label}
        </a>
      </Button>
    </div>
  );
}
