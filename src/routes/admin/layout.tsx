import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input, Label, Textarea } from "@/components/ui/input";
import { getAdminContext, saveLayout } from "@/lib/server/admin";
import { getPublicLayout } from "@/lib/server/public";
import { DEFAULT_LAYOUT, HOME_BLOCK_IDS, type HomeBlockId, type SiteLayout } from "@/lib/site-layout";

export const Route = createFileRoute("/admin/layout")({
  component: LayoutAdmin,
});

const BLOCK_LABEL: Record<HomeBlockId, string> = {
  hero: "Hero／開場後主視覺",
  announcement: "公告列",
  upcoming: "即將舉行",
  mood: "心情／第一次來引導",
  what: "我們在做什麼",
  photos: "照片帶",
  ig: "IG 精選",
  stories: "社員故事",
  faq: "FAQ",
  join: "加入我們",
};

function LayoutAdmin() {
  const [layout, setLayout] = useState<SiteLayout>(DEFAULT_LAYOUT);
  const [role, setRole] = useState("viewer");
  const [msg, setMsg] = useState("");
  const [ready, setReady] = useState(false);
  const locked = role === "viewer";

  useEffect(() => {
    void Promise.all([getPublicLayout(), getAdminContext()])
      .then(([next, staff]) => {
        setLayout(next);
        setRole(staff.role);
      })
      .finally(() => setReady(true));
  }, []);

  const move = (index: number, dir: -1 | 1) => {
    setLayout((prev) => {
      const blocks = [...prev.blocks];
      const next = index + dir;
      if (next < 0 || next >= blocks.length) return prev;
      const copy = blocks[index];
      blocks[index] = blocks[next];
      blocks[next] = copy;
      return { ...prev, blocks };
    });
  };

  if (!ready) return <p className="text-sm text-mist">讀取排版…</p>;

  return (
    <form
      className="mx-auto max-w-3xl space-y-10"
      onSubmit={async (event) => {
        event.preventDefault();
        if (locked) return;
        setMsg("");
        try {
          await saveLayout({ data: layout });
          setMsg("已儲存。前台會立刻用這份排版。");
        } catch {
          setMsg("沒有存成。請確認你是 editor 或 admin，而且欄位沒有超長。");
        }
      }}
    >
      <div>
        <h1 className="font-display text-2xl font-semibold">排版</h1>
        <p className="mt-2 text-sm text-mist">
          改完會立刻出現在公開網站。這裡不能改顏色、間距或字型。沒有內容的區塊會自己收起來，不會補假資料。
        </p>
        {locked ? <p className="mt-2 text-sm text-coral">你是 viewer，只能看，不能存。</p> : null}
      </div>

      <fieldset disabled={locked} className="space-y-4">
        <legend className="font-medium">龜龜開場</legend>
        <label className="block space-y-1.5">
          <Label>開場</Label>
          <select
            className="h-11 w-full rounded-md border border-line bg-raised px-3 text-sm"
            value={layout.intro.mode}
            onChange={(e) =>
              setLayout((prev) => ({
                ...prev,
                intro: { ...prev.intro, mode: e.target.value as SiteLayout["intro"]["mode"] },
              }))
            }
          >
            <option value="on">預設開啟（看過或跳過的人，下次不再擋）</option>
            <option value="skip">預設跳過</option>
            <option value="off">完全關閉</option>
          </select>
        </label>
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={layout.intro.showTurtle}
            onChange={(e) =>
              setLayout((prev) => ({
                ...prev,
                intro: { ...prev.intro, showTurtle: e.target.checked },
              }))
            }
          />
          顯示龜龜
        </label>
        {layout.intro.lines.map((line, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-2">
            <label className="block space-y-1.5">
              <Label>第 {index + 1} 句</Label>
              <Input
                value={line.text}
                maxLength={80}
                onChange={(e) =>
                  setLayout((prev) => {
                    const lines = prev.intro.lines.map((row, i) =>
                      i === index ? { ...row, text: e.target.value } : row,
                    );
                    return { ...prev, intro: { ...prev.intro, lines } };
                  })
                }
              />
            </label>
            {index === 0 ? (
              <label className="block space-y-1.5">
                <Label>第一句副標</Label>
                <Input
                  value={line.sub}
                  maxLength={80}
                  onChange={(e) =>
                    setLayout((prev) => {
                      const lines = prev.intro.lines.map((row, i) =>
                        i === index ? { ...row, sub: e.target.value } : row,
                      );
                      return { ...prev, intro: { ...prev.intro, lines } };
                    })
                  }
                />
              </label>
            ) : null}
          </div>
        ))}
      </fieldset>

      <fieldset disabled={locked} className="space-y-3">
        <legend className="font-medium">首頁區塊順序</legend>
        <p className="text-sm text-mist">公告的文字在「設定」頁。這裡只決定要不要出現、順序，以及各區標題。</p>
        {layout.blocks.map((block, index) => (
          <div key={block.id} className="rounded-xl border border-line bg-raised p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="font-medium">{BLOCK_LABEL[block.id]}</p>
              <div className="flex gap-2">
                <Button type="button" size="sm" variant="outline" onClick={() => move(index, -1)} disabled={index === 0}>
                  上移
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={() => move(index, 1)}
                  disabled={index === layout.blocks.length - 1}
                >
                  下移
                </Button>
              </div>
            </div>
            <label className="mt-3 flex min-h-11 items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={block.visible}
                onChange={(e) =>
                  setLayout((prev) => ({
                    ...prev,
                    blocks: prev.blocks.map((row, i) =>
                      i === index ? { ...row, visible: e.target.checked } : row,
                    ),
                  }))
                }
              />
              顯示
            </label>
            <div className="mt-2 grid gap-2 md:grid-cols-2">
              <label className="block space-y-1.5">
                <Label>標題</Label>
                <Input
                  value={block.title}
                  maxLength={80}
                  onChange={(e) =>
                    setLayout((prev) => ({
                      ...prev,
                      blocks: prev.blocks.map((row, i) =>
                        i === index ? { ...row, title: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </label>
              <label className="block space-y-1.5">
                <Label>副標</Label>
                <Input
                  value={block.subtitle}
                  maxLength={120}
                  onChange={(e) =>
                    setLayout((prev) => ({
                      ...prev,
                      blocks: prev.blocks.map((row, i) =>
                        i === index ? { ...row, subtitle: e.target.value } : row,
                      ),
                    }))
                  }
                />
              </label>
            </div>
          </div>
        ))}
      </fieldset>

      <fieldset disabled={locked} className="space-y-3">
        <legend className="font-medium">Hero（開場後主視覺，預設先藏起來）</legend>
        <label className="block space-y-1.5">
          <Label>主標</Label>
          <Input
            value={layout.hero.title}
            maxLength={80}
            onChange={(e) => setLayout((prev) => ({ ...prev, hero: { ...prev.hero, title: e.target.value } }))}
          />
        </label>
        <label className="block space-y-1.5">
          <Label>副標</Label>
          <Input
            value={layout.hero.subtitle}
            maxLength={120}
            onChange={(e) => setLayout((prev) => ({ ...prev, hero: { ...prev.hero, subtitle: e.target.value } }))}
          />
        </label>
        <div className="grid gap-2 md:grid-cols-2">
          <label className="block space-y-1.5">
            <Label>主按鈕文字</Label>
            <Input
              value={layout.hero.ctaPrimary}
              maxLength={24}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, hero: { ...prev.hero, ctaPrimary: e.target.value } }))
              }
            />
          </label>
          <label className="block space-y-1.5">
            <Label>主按鈕連結</Label>
            <Input
              value={layout.hero.ctaPrimaryHref}
              maxLength={200}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, hero: { ...prev.hero, ctaPrimaryHref: e.target.value } }))
              }
            />
          </label>
          <label className="block space-y-1.5">
            <Label>次按鈕文字</Label>
            <Input
              value={layout.hero.ctaSecondary}
              maxLength={24}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, hero: { ...prev.hero, ctaSecondary: e.target.value } }))
              }
            />
          </label>
          <label className="block space-y-1.5">
            <Label>次按鈕連結</Label>
            <Input
              value={layout.hero.ctaSecondaryHref}
              maxLength={200}
              onChange={(e) =>
                setLayout((prev) => ({ ...prev, hero: { ...prev.hero, ctaSecondaryHref: e.target.value } }))
              }
            />
          </label>
        </div>
        <label className="block space-y-1.5">
          <Label>背景圖（站內路徑或 https）</Label>
          <Input
            value={layout.hero.image}
            maxLength={200}
            onChange={(e) => setLayout((prev) => ({ ...prev, hero: { ...prev.hero, image: e.target.value } }))}
          />
        </label>
      </fieldset>

      <fieldset disabled={locked} className="space-y-3">
        <legend className="font-medium">認識我們</legend>
        <Field label="標題" value={layout.pages.about.title} max={40} onChange={(title) => setLayout((p) => ({ ...p, pages: { ...p.pages, about: { ...p.pages.about, title } } }))} />
        <Area label="第一段" value={layout.pages.about.p1} max={400} onChange={(p1) => setLayout((p) => ({ ...p, pages: { ...p.pages, about: { ...p.pages.about, p1 } } }))} />
        <Area label="第二段" value={layout.pages.about.p2} max={400} onChange={(p2) => setLayout((p) => ({ ...p, pages: { ...p.pages, about: { ...p.pages.about, p2 } } }))} />
        <Area label="第三段" value={layout.pages.about.p3} max={400} onChange={(p3) => setLayout((p) => ({ ...p, pages: { ...p.pages, about: { ...p.pages.about, p3 } } }))} />
        <Area label="正式全名那一行" value={layout.pages.about.official} max={240} onChange={(official) => setLayout((p) => ({ ...p, pages: { ...p.pages, about: { ...p.pages.about, official } } }))} />
      </fieldset>

      <fieldset disabled={locked} className="space-y-3">
        <legend className="font-medium">第一次來</legend>
        <Field label="標題" value={layout.pages.firstTime.title} max={40} onChange={(title) => setLayout((p) => ({ ...p, pages: { ...p.pages, firstTime: { ...p.pages.firstTime, title } } }))} />
        <Area label="導言" value={layout.pages.firstTime.lead} max={200} onChange={(lead) => setLayout((p) => ({ ...p, pages: { ...p.pages, firstTime: { ...p.pages.firstTime, lead } } }))} />
        {layout.pages.firstTime.cards.map((card, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-2">
            <Field
              label={`卡片 ${index + 1} 標題`}
              value={card.title}
              max={40}
              onChange={(title) =>
                setLayout((p) => ({
                  ...p,
                  pages: {
                    ...p.pages,
                    firstTime: {
                      ...p.pages.firstTime,
                      cards: p.pages.firstTime.cards.map((row, i) => (i === index ? { ...row, title } : row)),
                    },
                  },
                }))
              }
            />
            <Field
              label="內文"
              value={card.body}
              max={120}
              onChange={(body) =>
                setLayout((p) => ({
                  ...p,
                  pages: {
                    ...p.pages,
                    firstTime: {
                      ...p.pages.firstTime,
                      cards: p.pages.firstTime.cards.map((row, i) => (i === index ? { ...row, body } : row)),
                    },
                  },
                }))
              }
            />
          </div>
        ))}
      </fieldset>

      <fieldset disabled={locked} className="space-y-3">
        <legend className="font-medium">加入我們</legend>
        <Field label="標題" value={layout.pages.join.title} max={40} onChange={(title) => setLayout((p) => ({ ...p, pages: { ...p.pages, join: { ...p.pages.join, title } } }))} />
        <Area label="導言" value={layout.pages.join.lead} max={200} onChange={(lead) => setLayout((p) => ({ ...p, pages: { ...p.pages, join: { ...p.pages.join, lead } } }))} />
        {layout.pages.join.steps.map((step, index) => (
          <div key={index} className="grid gap-2 md:grid-cols-2">
            <Field
              label={`步驟 ${index + 1}`}
              value={step.title}
              max={40}
              onChange={(title) =>
                setLayout((p) => ({
                  ...p,
                  pages: {
                    ...p.pages,
                    join: {
                      ...p.pages.join,
                      steps: p.pages.join.steps.map((row, i) => (i === index ? { ...row, title } : row)),
                    },
                  },
                }))
              }
            />
            <Field
              label="說明"
              value={step.body}
              max={160}
              onChange={(body) =>
                setLayout((p) => ({
                  ...p,
                  pages: {
                    ...p.pages,
                    join: {
                      ...p.pages.join,
                      steps: p.pages.join.steps.map((row, i) => (i === index ? { ...row, body } : row)),
                    },
                  },
                }))
              }
            />
          </div>
        ))}
      </fieldset>

      <fieldset disabled={locked} className="space-y-3">
        <legend className="font-medium">Footer</legend>
        <Area
          label="聯絡說明"
          value={layout.pages.footer.note}
          max={300}
          onChange={(note) => setLayout((p) => ({ ...p, pages: { ...p.pages, footer: { note } } }))}
        />
      </fieldset>

      {msg ? <p className="text-sm text-leaf">{msg}</p> : null}
      <Button type="submit" disabled={locked}>
        儲存排版
      </Button>
      <p className="text-xs text-mist">區塊代號：{HOME_BLOCK_IDS.join("、")}</p>
    </form>
  );
}

function Field({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: string;
  max: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      <Input value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}

function Area({
  label,
  value,
  max,
  onChange,
}: {
  label: string;
  value: string;
  max: number;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block space-y-1.5">
      <Label>{label}</Label>
      <Textarea value={value} maxLength={max} onChange={(e) => onChange(e.target.value)} />
    </label>
  );
}
