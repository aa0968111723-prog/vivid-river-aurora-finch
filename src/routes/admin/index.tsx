import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminDashboard } from "@/lib/server/admin";
import { EventStatusBadge } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { formatEventDate } from "@/lib/format";
import type { EventRecord } from "@/lib/types";

export const Route = createFileRoute("/admin/")({
  component: AdminHome,
});

function AdminHome() {
  const [data, setData] = useState<Awaited<ReturnType<typeof getAdminDashboard>> | null>(null);
  useEffect(() => {
    void getAdminDashboard().then(setData);
  }, []);
  if (!data) {
    return (
      <div className="grid gap-3 md:grid-cols-3">
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
        <Skeleton className="h-28" />
      </div>
    );
  }
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-2xl font-semibold">今天先看這些</h1>
        <p className="mt-1 text-sm text-mist">不塞圖表。有要更新的活動，會排在下面。</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="進行中" value={String(data.live.length)} />
        <Stat label="即將開始" value={String(data.upcoming.length)} />
        <Stat label="IG 精選" value={String(data.igCount)} />
      </div>
      <section>
        <div className="flex items-center justify-between">
          <h2 className="font-medium">即將開始</h2>
          <Button asChild size="sm" variant="outline">
            <Link to="/admin/events">管理活動</Link>
          </Button>
        </div>
        <EventMiniList events={data.upcoming} empty="最近沒有即將開始的活動。" />
      </section>
      <section>
        <h2 className="font-medium">需要更新</h2>
        <EventMiniList events={data.needsUpdate} empty="看起來都齊了。" />
      </section>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-line bg-raised p-5">
      <p className="text-sm text-mist">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold">{value}</p>
    </div>
  );
}

function EventMiniList({ events, empty }: { events: EventRecord[]; empty: string }) {
  if (!events.length) return <p className="mt-3 text-sm text-mist">{empty}</p>;
  return (
    <ul className="mt-3 divide-y divide-line rounded-xl border border-line bg-raised">
      {events.map((e) => (
        <li key={e.id} className="flex items-center justify-between gap-3 px-4 py-3">
          <div>
            <p className="font-medium">{e.title}</p>
            <p className="text-xs text-mist">{formatEventDate(e.startsAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <EventStatusBadge status={e.computedStatus} />
            <Link to="/admin/event/$id" params={{ id: e.id }} className="text-sm text-leaf">
              編輯
            </Link>
          </div>
        </li>
      ))}
    </ul>
  );
}
