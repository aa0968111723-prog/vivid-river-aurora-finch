import type { ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-raised focus:px-4 focus:py-2"
      >
        跳到主要內容
      </a>
      <SiteHeader />
      <div id="main" className="pb-24 md:pb-0">
        {children}
      </div>
      <SiteFooter />
      <BottomNav />
    </div>
  );
}
