import { Logo } from "@/components/brand/logo";
import { replayZen } from "@/components/home/zen-intro";
import { DEFAULT_LAYOUT } from "@/lib/site-layout";
import type { PageDocument } from "@/lib/pages/types";
import { SITE } from "@/lib/site";
import { ChromeBlocks } from "./chrome-blocks";

export function SiteFooter({
  note = DEFAULT_LAYOUT.pages.footer.note,
  showReplay = true,
  footer,
}: {
  note?: string;
  showReplay?: boolean;
  footer?: PageDocument;
}) {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:px-6">
        <div>
          <Logo />
          {footer ? null : <p className="mt-3 max-w-md text-sm leading-relaxed text-mist">{note}</p>}
          {showReplay ? (
            <button type="button" onClick={replayZen} className="mt-4 min-h-11 text-sm text-leaf">
              再次看看龜龜
            </button>
          ) : null}
        </div>
        <div className="grid gap-6 sm:grid-cols-2">
          <ChromeBlocks document={footer} />
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-4 text-xs text-mist md:px-6">
          © {new Date().getFullYear()} {SITE.name} · {SITE.nameEn}
        </p>
      </div>
    </footer>
  );
}
