import { Link, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { archiveEvent, listAdminEvents } from "@/lib/server/admin";
import { EventStatusBadge } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { CATEGORY_LABELS } from "@/lib/site";
import { formatEventDate } from "@/lib/format";
import type { EventRecord } from "@/lib/types";

export const Route = createFileRoute("/admin/events")({
  component: AdminEvents,
});

function AdminEvents() {
  const [events, setEvents] = useState<EventRecord[] | null>(null);
  const refresh = () => void listAdminEvents().then(setEvents);
  useEffect(() => {
    refresh();
  }, []);
  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <h1 className="font-display text-2xl font-semibold">活動</h1>
        <Button asChild>
          <Link to="/admin/event/$id" params={{ id: "new" }}>
            新增活動
          </Link>
        </Button>
      </div>
      <div className="mt-6 overflow-x-auto rounded-xl border border-line bg-raised">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-line text-mist">
            <tr>
              <th className="px-4 py-3 font-medium">名稱</th>
              <th className="px-4 py-3 font-medium">日期</th>
              <th className="px-4 py-3 font-medium">分類</th>
              <th className="px-4 py-3 font-medium">狀態</th>
              <th className="px-4 py-3 font-medium" />
            </tr>
          </thead>
          <tbody>
            {(events ?? []).map((e) => (
              <tr key={e.id} className="border-b border-line/70">
                <td className="px-4 py-3">
                  <p className="font-medium">{e.title}</p>
                  <p className="text-xs text-mist">{e.status}</p>
                </td>
                <td className="px-4 py-3">{formatEventDate(e.startsAt)}</td>
                <td className="px-4 py-3">{CATEGORY_LABELS[e.categoryId]}</td>
                <td className="px-4 py-3">
                  <EventStatusBadge status={e.computedStatus} />
                </td>
                <td className="px-4 py-3 text-right">
                  <Link to="/admin/event/$id" params={{ id: e.id }} className="mr-3 text-leaf">
                    編輯
                  </Link>
                  <button
                    type="button"
                    className="text-danger"
                    onClick={async () => {
                      if (!confirm("確定封存這場活動？")) return;
                      await archiveEvent({ data: { id: e.id } });
                      refresh();
                    }}
                  >
                    封存
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events && events.length === 0 ? (
          <p className="p-6 text-sm text-mist">還沒有活動。先新增一場。</p>
        ) : null}
      </div>
    </div>
  );
}
