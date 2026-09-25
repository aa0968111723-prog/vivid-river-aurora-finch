import { Instagram } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Logo } from "@/components/brand/logo";
import { replayZen, useZenChrome } from "@/components/home/zen-intro";
import { NAV, SITE, withUtm } from "@/lib/site";
import { cn } from "@/lib/utils";

function isActive(pathname: string, to: string, match: "exact" | "prefix") {
  if (match === "exact") return pathname === to;
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function SiteHeader({ showReplay = false }: { showReplay?: boolean }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inIntro = useZenChrome();
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b backdrop-blur-md transition-colors duration-300",
        inIntro ? "zen-header border-transparent bg-transparent" : "border-line/70 bg-canvas/92 backdrop-blur-md",
      )}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 md:h-16 md:px-6">
        <Logo compact className={inIntro ? "text-raised" : undefined} />
        <nav className="hidden items-center gap-1 md:flex" aria-label="主要">
          {NAV.filter((item) => item.to !== "/").map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium no-underline transition-colors",
                inIntro ? "text-raised/85 hover:text-raised" : "text-mist hover:text-ink",
                isActive(pathname, item.to, item.match) &&
                  (inIntro ? "bg-raised/15 text-raised" : "bg-paper text-ink"),
              )}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={withUtm(SITE.instagramUrl, { medium: "header", campaign: "instagram" })}
            target="_blank"
            rel="noreferrer"
            className={cn(
              "ml-1 inline-flex size-10 items-center justify-center rounded-full hover:bg-paper",
              inIntro ? "text-raised hover:bg-raised/10" : "text-ink",
            )}
            aria-label="Instagram @tku_zc"
          >
            <Instagram className="size-4" />
          </a>
        </nav>
        {showReplay && !inIntro ? (
          <button
            type="button"
            onClick={replayZen}
            className="min-h-11 rounded-full px-3 text-sm text-mist hover:text-ink"
          >
            再看一次龜龜
          </button>
        ) : (
          <span className="md:hidden" />
        )}
      </div>
    </header>
  );
}
