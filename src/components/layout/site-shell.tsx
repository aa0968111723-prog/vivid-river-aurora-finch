import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";
import type { PublicChrome } from "@/lib/pages/chrome";

export function SiteShell({
  children,
  chrome,
}: {
  children: ReactNode;
  chrome?: PublicChrome;
}) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-raised focus:px-4 focus:py-2"
      >
        跳到主要內容
      </a>
      <SiteHeader showReplay={chrome?.showReplay !== false} header={chrome?.header} />
      <div id="main" className="pb-24 md:pb-0">
        {children}
      </div>
      <SiteFooter note={chrome?.footerNote} showReplay={chrome?.showReplay !== false} footer={chrome?.footer} />
      <BottomNav />
    </div>
  );
}
