import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminAssets, saveAsset } from "@/lib/server/admin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { canvaAdapter, driveAdapter } from "@/lib/integrations/adapters";

export const Route = createFileRoute("/admin/assets")({
  component: AdminAssets,
});

function AdminAssets() {
  const [rows, setRows] = useState<Awaited<ReturnType<typeof listAdminAssets>>>([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [canvaUrl, setCanvaUrl] = useState("");
  const [driveUrl, setDriveUrl] = useState("");
  const refresh = () => void listAdminAssets().then(setRows);
  useEffect(() => {
    refresh();
  }, []);
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-semibold">圖片與素材</h1>
      <p className="text-sm text-mist">
        Canva：{canvaAdapter.ready ? "可用網址掛上" : "尚未連接"}。Google Drive：
        {driveAdapter.ready ? "已授權" : "尚未授權，先貼公開連結。"}不要把 OAuth Secret 放到瀏覽器。
      </p>
      <form
        className="grid gap-3 rounded-xl border border-line bg-raised p-4 md:grid-cols-2"
        onSubmit={async (e) => {
          e.preventDefault();
          await saveAsset({
            data: {
              title: title || null,
              url,
              assetType: canvaUrl ? "canva" : driveUrl ? "drive" : "image",
              canvaUrl: canvaUrl || null,
              driveUrl: driveUrl || null,
            },
          });
          setTitle("");
          setUrl("");
          setCanvaUrl("");
          setDriveUrl("");
          refresh();
        }}
      >
        <Input placeholder="名稱" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Input placeholder="圖片網址" value={url} onChange={(e) => setUrl(e.target.value)} required />
        <Input placeholder="Canva 連結（選填）" value={canvaUrl} onChange={(e) => setCanvaUrl(e.target.value)} />
        <Input placeholder="Drive 連結（選填）" value={driveUrl} onChange={(e) => setDriveUrl(e.target.value)} />
        <Button type="submit" className="md:col-span-2">
          新增素材
        </Button>
      </form>
      <ul className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        {rows.map((a) => (
          <li key={a.id} className="overflow-hidden rounded-xl border border-line bg-raised">
            {a.url.match(/\.(jpg|jpeg|png|webp|gif)(\?|$)/i) || a.url.startsWith("/images/") ? (
              <img src={a.url} alt="" className="aspect-[4/3] w-full object-cover" />
            ) : null}
            <div className="p-3">
              <p className="text-sm font-medium">{a.title || a.asset_type}</p>
              <p className="truncate text-xs text-mist">{a.url}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
