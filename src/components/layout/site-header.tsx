import { Logo } from "@/components/brand/logo";
import { replayZen, useZenChrome } from "@/components/home/zen-intro";
import type { PageDocument } from "@/lib/pages/types";
import { cn } from "@/lib/utils";
import { ChromeBlocks } from "./chrome-blocks";

export function SiteHeader({ showReplay = false, header }: { showReplay?: boolean; header?: PageDocument }) {
  const inIntro = useZenChrome();
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300",
        inIntro ? "zen-header border-transparent bg-transparent" : "border-line/70 bg-canvas/92 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-2 md:px-6">
        <Logo compact className={inIntro ? "text-raised" : undefined} />
        <div className="flex flex-wrap items-center justify-end gap-2">
          <nav className="flex flex-wrap items-center gap-1" aria-label="主要">
            <ChromeBlocks document={header} />
          </nav>
          {showReplay && !inIntro ? (
            <button type="button" onClick={replayZen} className="min-h-11 rounded-full px-3 text-sm text-mist hover:text-ink">
              再次看看龜龜
            </button>
          ) : null}
        </div>
      </div>
    </header>
  );
}
