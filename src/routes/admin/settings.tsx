import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { saveSettings } from "@/lib/server/admin";
import { getSiteMeta } from "@/lib/server/public";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";

export const Route = createFileRoute("/admin/settings")({
  component: AdminSettings,
});

function AdminSettings() {
  const [name, setName] = useState("淡江大學禪學社");
  const [nameEn, setNameEn] = useState("TKU Zen Club");
  const [instagram, setInstagram] = useState("https://www.instagram.com/tku_zc");
  const [campus, setCampus] = useState("淡江大學（淡水校園）");
  const [note, setNote] = useState("");
  const [announcementTitle, setAnnouncementTitle] = useState("");
  const [announcementBody, setAnnouncementBody] = useState("");
  const [announcementHref, setAnnouncementHref] = useState("");
  const [announcementVisible, setAnnouncementVisible] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    void getSiteMeta().then((m) => {
      setName(m.club.name);
      setNameEn(m.club.nameEn);
      setInstagram(m.club.instagram);
      setCampus(m.club.campus);
      setNote(m.club.note);
      setAnnouncementTitle(m.announcement.title);
      setAnnouncementBody(m.announcement.body);
      setAnnouncementHref(m.announcement.href);
      setAnnouncementVisible(m.announcement.visible);
    });
  }, []);

  return (
    <form
      className="mx-auto max-w-xl space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveSettings({
          data: {
            name,
            nameEn,
            instagram,
            campus,
            note,
            announcementTitle,
            announcementBody,
            announcementHref,
            announcementVisible,
          },
        });
        setMsg("已儲存");
      }}
    >
      <h1 className="font-display text-2xl font-semibold">社團設定</h1>
      <label className="block space-y-1.5">
        <Label>名稱</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <Label>英文</Label>
        <Input value={nameEn} onChange={(e) => setNameEn(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <Label>Instagram</Label>
        <Input value={instagram} onChange={(e) => setInstagram(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <Label>校園</Label>
        <Input value={campus} onChange={(e) => setCampus(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <Label>聯絡說明</Label>
        <Textarea value={note} onChange={(e) => setNote(e.target.value)} />
      </label>
      <h2 className="pt-4 font-medium">首頁公告</h2>
      <label className="block space-y-1.5">
        <Label>標題</Label>
        <Input value={announcementTitle} onChange={(e) => setAnnouncementTitle(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <Label>內容</Label>
        <Input value={announcementBody} onChange={(e) => setAnnouncementBody(e.target.value)} />
      </label>
      <label className="block space-y-1.5">
        <Label>連結</Label>
        <Input value={announcementHref} onChange={(e) => setAnnouncementHref(e.target.value)} />
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={announcementVisible}
          onChange={(e) => setAnnouncementVisible(e.target.checked)}
        />
        顯示公告
      </label>
      {msg ? <p className="text-sm text-leaf">{msg}</p> : null}
      <Button type="submit">儲存設定</Button>
    </form>
  );
}
