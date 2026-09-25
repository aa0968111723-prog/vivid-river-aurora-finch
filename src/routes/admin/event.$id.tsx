import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { getAdminEvent, saveEvent } from "@/lib/server/admin";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { CATEGORY_LABELS, REGISTRATION_LABELS } from "@/lib/site";
import type { EventRecord } from "@/lib/types";

export const Route = createFileRoute("/admin/event/$id")({
  component: EventEditor,
});

type Form = {
  slug: string;
  title: string;
  subtitle: string;
  coverImage: string;
  categoryId: string;
  startsAt: string;
  endsAt: string;
  locationName: string;
  locationDetail: string;
  mapUrl: string;
  summary: string;
  body: string;
  audience: string;
  registrationMode: EventRecord["registrationMode"];
  registrationUrl: string;
  registrationNote: string;
  capacity: string;
  registeredCount: string;
  statusOverride: string;
  igUrl: string;
  canvaUrl: string;
  status: EventRecord["status"];
  featured: boolean;
};

const empty: Form = {
  slug: "",
  title: "",
  subtitle: "",
  coverImage: "",
  categoryId: "tea",
  startsAt: "",
  endsAt: "",
  locationName: "",
  locationDetail: "",
  mapUrl: "",
  summary: "",
  body: "",
  audience: "",
  registrationMode: "google_form",
  registrationUrl: "",
  registrationNote: "",
  capacity: "",
  registeredCount: "",
  statusOverride: "",
  igUrl: "",
  canvaUrl: "",
  status: "draft",
  featured: false,
};

function toLocalInput(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function fromEvent(e: EventRecord): Form {
  return {
    slug: e.slug,
    title: e.title,
    subtitle: e.subtitle ?? "",
    coverImage: e.coverImage ?? "",
    categoryId: e.categoryId,
    startsAt: toLocalInput(e.startsAt),
    endsAt: toLocalInput(e.endsAt),
    locationName: e.locationName,
    locationDetail: e.locationDetail ?? "",
    mapUrl: e.mapUrl ?? "",
    summary: e.summary,
    body: e.body,
    audience: e.audience ?? "",
    registrationMode: e.registrationMode,
    registrationUrl: e.registrationUrl ?? "",
    registrationNote: e.registrationNote ?? "",
    capacity: e.capacity == null ? "" : String(e.capacity),
    registeredCount: e.registeredCount == null ? "" : String(e.registeredCount),
    statusOverride: e.statusOverride ?? "",
    igUrl: e.igUrl ?? "",
    canvaUrl: e.canvaUrl ?? "",
    status: e.status,
    featured: e.featured,
  };
}

function EventEditor() {
  const { id } = Route.useParams();
  const isNew = id === "new";
  const navigate = useNavigate();
  const [form, setForm] = useState<Form>(empty);
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (isNew) return;
    void getAdminEvent({ data: { id } }).then((e) => {
      if (e) setForm(fromEvent(e));
    });
  }, [id, isNew]);

  function set<K extends keyof Form>(key: K, value: Form[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg("");
    try {
      const slug =
        form.slug.trim() ||
        form.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") ||
        `event-${Date.now().toString(36)}`;
      const saved = await saveEvent({
        data: {
          id: isNew ? undefined : id,
          slug,
          title: form.title,
          subtitle: form.subtitle || null,
          coverImage: form.coverImage || null,
          categoryId: form.categoryId,
          startsAt: new Date(form.startsAt).toISOString(),
          endsAt: new Date(form.endsAt).toISOString(),
          locationName: form.locationName,
          locationDetail: form.locationDetail || null,
          mapUrl: form.mapUrl || null,
          summary: form.summary,
          body: form.body,
          audience: form.audience || null,
          registrationMode: form.registrationMode,
          registrationUrl: form.registrationUrl || null,
          registrationNote: form.registrationNote || null,
          capacity: form.capacity ? Number(form.capacity) : null,
          registeredCount: form.registeredCount ? Number(form.registeredCount) : null,
          statusOverride: (form.statusOverride || null) as EventRecord["statusOverride"],
          igUrl: form.igUrl || null,
          canvaUrl: form.canvaUrl || null,
          status: form.status,
          featured: form.featured,
        },
      });
      setMsg("已儲存");
      if (isNew) void navigate({ to: "/admin/event/$id", params: { id: saved.id } });
    } catch (err) {
      setMsg(err instanceof Error ? err.message : "儲存失敗");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="mx-auto max-w-3xl space-y-5">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">{isNew ? "新增活動" : "編輯活動"}</h1>
        <Link to="/admin/events" className="text-sm text-mist">
          回到列表
        </Link>
      </div>
      <Field label="活動名稱">
        <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="網址代稱 slug">
          <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="fuyou-chan-guang" />
        </Field>
        <Field label="副標">
          <Input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="分類">
          <select
            className="h-11 w-full rounded-md border border-line bg-raised px-3 text-sm"
            value={form.categoryId}
            onChange={(e) => set("categoryId", e.target.value)}
          >
            {Object.entries(CATEGORY_LABELS).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="封面圖片網址">
          <Input value={form.coverImage} onChange={(e) => set("coverImage", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="開始">
          <Input type="datetime-local" value={form.startsAt} onChange={(e) => set("startsAt", e.target.value)} required />
        </Field>
        <Field label="結束">
          <Input type="datetime-local" value={form.endsAt} onChange={(e) => set("endsAt", e.target.value)} required />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="地點">
          <Input value={form.locationName} onChange={(e) => set("locationName", e.target.value)} required />
        </Field>
        <Field label="教室 / 補充">
          <Input value={form.locationDetail} onChange={(e) => set("locationDetail", e.target.value)} />
        </Field>
      </div>
      <Field label="地圖連結">
        <Input value={form.mapUrl} onChange={(e) => set("mapUrl", e.target.value)} />
      </Field>
      <Field label="一句話介紹">
        <Input value={form.summary} onChange={(e) => set("summary", e.target.value)} required />
      </Field>
      <Field label="活動介紹">
        <Textarea value={form.body} onChange={(e) => set("body", e.target.value)} required />
      </Field>
      <Field label="適合誰">
        <Input value={form.audience} onChange={(e) => set("audience", e.target.value)} />
      </Field>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="報名方式">
          <select
            className="h-11 w-full rounded-md border border-line bg-raised px-3 text-sm"
            value={form.registrationMode}
            onChange={(e) => set("registrationMode", e.target.value as Form["registrationMode"])}
          >
            {Object.entries(REGISTRATION_LABELS).map(([id, name]) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="報名網址">
          <Input value={form.registrationUrl} onChange={(e) => set("registrationUrl", e.target.value)} />
        </Field>
      </div>
      <Field label="報名備註">
        <Input value={form.registrationNote} onChange={(e) => set("registrationNote", e.target.value)} />
      </Field>
      <div className="grid gap-4 md:grid-cols-3">
        <Field label="名額（可空）">
          <Input value={form.capacity} onChange={(e) => set("capacity", e.target.value)} />
        </Field>
        <Field label="已報名（手填，勿假裝即時）">
          <Input value={form.registeredCount} onChange={(e) => set("registeredCount", e.target.value)} />
        </Field>
        <Field label="狀態覆寫">
          <select
            className="h-11 w-full rounded-md border border-line bg-raised px-3 text-sm"
            value={form.statusOverride}
            onChange={(e) => set("statusOverride", e.target.value)}
          >
            <option value="">自動</option>
            <option value="upcoming">即將開始</option>
            <option value="open">報名中</option>
            <option value="filling">名額將滿</option>
            <option value="full">已額滿</option>
            <option value="ended">活動結束</option>
          </select>
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="IG 貼文">
          <Input value={form.igUrl} onChange={(e) => set("igUrl", e.target.value)} />
        </Field>
        <Field label="Canva 文宣">
          <Input value={form.canvaUrl} onChange={(e) => set("canvaUrl", e.target.value)} />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="發布狀態">
          <select
            className="h-11 w-full rounded-md border border-line bg-raised px-3 text-sm"
            value={form.status}
            onChange={(e) => set("status", e.target.value as Form["status"])}
          >
            <option value="draft">草稿</option>
            <option value="published">已發布</option>
            <option value="archived">封存</option>
          </select>
        </Field>
        <label className="flex items-center gap-2 pt-7 text-sm">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(e) => set("featured", e.target.checked)}
          />
          首頁精選
        </label>
      </div>
      {msg ? <p className="text-sm text-leaf">{msg}</p> : null}
      <Button type="submit" disabled={busy}>
        {busy ? "儲存中…" : "儲存"}
      </Button>
    </form>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      {children}
    </label>
  );
}
