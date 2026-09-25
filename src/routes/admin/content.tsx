import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { listAdminFaq, listAdminIg, listAdminStories, saveFaq, saveIgPost, saveStory } from "@/lib/server/admin";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import type { FaqRecord, InstagramPost, StoryRecord } from "@/lib/types";

export const Route = createFileRoute("/admin/content")({
  component: AdminContent,
});

function AdminContent() {
  const [stories, setStories] = useState<StoryRecord[]>([]);
  const [faq, setFaq] = useState<FaqRecord[]>([]);
  const [ig, setIg] = useState<InstagramPost[]>([]);
  const refresh = () => {
    void listAdminStories().then(setStories);
    void listAdminFaq().then(setFaq);
    void listAdminIg().then(setIg);
  };
  useEffect(() => {
    refresh();
  }, []);

  return (
    <div className="space-y-12">
      <h1 className="font-display text-2xl font-semibold">內容</h1>
      <section className="space-y-4">
        <h2 className="font-medium">社員故事</h2>
        {stories.map((s) => (
          <p key={s.id} className="text-sm text-mist">
            {s.displayName} · {s.quote}
          </p>
        ))}
        <StoryForm onSaved={refresh} />
      </section>
      <section className="space-y-4">
        <h2 className="font-medium">FAQ</h2>
        {faq.map((f) => (
          <p key={f.id} className="text-sm text-mist">
            {f.question}
          </p>
        ))}
        <FaqForm onSaved={refresh} />
      </section>
      <section className="space-y-4">
        <h2 className="font-medium">IG 精選（手動貼入，非即時 API）</h2>
        {ig.map((p) => (
          <p key={p.id} className="truncate text-sm text-mist">
            {p.caption || p.postUrl}
          </p>
        ))}
        <IgForm onSaved={refresh} />
      </section>
    </div>
  );
}

function StoryForm({ onSaved }: { onSaved: () => void }) {
  const [quote, setQuote] = useState("");
  const [body, setBody] = useState("");
  const [displayName, setDisplayName] = useState("");
  return (
    <form
      className="space-y-3 rounded-xl border border-line bg-raised p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveStory({
          data: {
            slug: `story-${Date.now().toString(36)}`,
            quote,
            body,
            displayName,
            consent: true,
            status: "published",
          },
        });
        setQuote("");
        setBody("");
        setDisplayName("");
        onSaved();
      }}
    >
      <p className="text-sm font-medium">新增故事</p>
      <Input placeholder="一句話" value={quote} onChange={(e) => setQuote(e.target.value)} required />
      <Input placeholder="怎麼稱呼" value={displayName} onChange={(e) => setDisplayName(e.target.value)} required />
      <Textarea placeholder="完整故事（需本人同意再公開）" value={body} onChange={(e) => setBody(e.target.value)} required />
      <Button type="submit" size="sm">
        新增
      </Button>
    </form>
  );
}

function FaqForm({ onSaved }: { onSaved: () => void }) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  return (
    <form
      className="space-y-3 rounded-xl border border-line bg-raised p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveFaq({ data: { question, answer } });
        setQuestion("");
        setAnswer("");
        onSaved();
      }}
    >
      <p className="text-sm font-medium">新增 FAQ</p>
      <Input placeholder="問題" value={question} onChange={(e) => setQuestion(e.target.value)} required />
      <Textarea placeholder="回答" value={answer} onChange={(e) => setAnswer(e.target.value)} required />
      <Button type="submit" size="sm">
        新增
      </Button>
    </form>
  );
}

function IgForm({ onSaved }: { onSaved: () => void }) {
  const [postUrl, setPostUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [caption, setCaption] = useState("");
  return (
    <form
      className="space-y-3 rounded-xl border border-line bg-raised p-4"
      onSubmit={async (e) => {
        e.preventDefault();
        await saveIgPost({
          data: {
            postUrl,
            thumbnailUrl: thumbnailUrl || null,
            caption: caption || null,
            postType: "image",
            featured: true,
          },
        });
        setPostUrl("");
        setThumbnailUrl("");
        setCaption("");
        onSaved();
      }}
    >
      <p className="text-sm font-medium">新增 IG 精選</p>
      <Label>貼文網址</Label>
      <Input value={postUrl} onChange={(e) => setPostUrl(e.target.value)} required />
      <Input placeholder="縮圖網址" value={thumbnailUrl} onChange={(e) => setThumbnailUrl(e.target.value)} />
      <Input placeholder="說明" value={caption} onChange={(e) => setCaption(e.target.value)} />
      <Button type="submit" size="sm">
        新增
      </Button>
    </form>
  );
}
