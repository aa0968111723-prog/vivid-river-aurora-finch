import { CalendarDays, Compass, Heart, Home } from "lucide-react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useZenChrome } from "@/components/home/zen-intro";
import { BOTTOM_NAV } from "@/lib/site";
import { cn } from "@/lib/utils";

const icons = {
  home: Home,
  calendar: CalendarDays,
  compass: Compass,
  heart: Heart,
};

export function BottomNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const inIntro = useZenChrome();
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-line bg-canvas/95 backdrop-blur-md transition-transform duration-300 md:hidden",
        inIntro && "translate-y-full",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="底部"
      aria-hidden={inIntro}
    >
      <ul className="grid grid-cols-4">
        {BOTTOM_NAV.map((item) => {
          const Icon = icons[item.icon];
          const active =
            item.match === "exact"
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium no-underline",
                  active ? "text-leaf" : "text-mist",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
