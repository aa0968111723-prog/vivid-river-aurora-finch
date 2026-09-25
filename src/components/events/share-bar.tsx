import { useState } from "react";
import { Link2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function ShareBar({ title, path }: { title: string; path: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window === "undefined" ? path : `${window.location.origin}${path}`;
  const line = `https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(url)}`;

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      track("share_copy");
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm">
        <a href={line} target="_blank" rel="noreferrer" onClick={() => track("share_line")}>
          分享到 LINE
        </a>
      </Button>
      <Button type="button" variant="outline" size="sm" onClick={copy}>
        <Link2 className="size-4" />
        {copied ? "已複製連結" : "複製連結"}
      </Button>
      <p className="w-full text-xs text-mist">
        IG 沒有直接分享活動頁。可以複製連結，貼到限時動態或私訊。想貼 {title} 的時候，預覽會帶社團主視覺。
      </p>
    </div>
  );
}
