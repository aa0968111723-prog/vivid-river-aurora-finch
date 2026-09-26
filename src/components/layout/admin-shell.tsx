import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { Logo } from "@/components/brand/logo";
import { cn } from "@/lib/utils";

const LINKS = [
  { to: "/admin", label: "總覽", exact: true },
  { to: "/admin/events", label: "活動" },
  { to: "/admin/content", label: "內容" },
  { to: "/admin/assets", label: "圖片" },
  { to: "/admin/layout", label: "排版" },
  { to: "/admin/settings", label: "設定" },
];

export function AdminShell({
  children,
  role,
}: {
  children: ReactNode;
  role?: string;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-canvas text-ink">
      <header className="border-b border-line bg-raised">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-4">
            <Logo compact />
            <span className="text-xs text-mist">後台{role ? ` · ${role}` : ""}</span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-mist no-underline hover:text-ink">
              回前台
            </Link>
            <UserButton />
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2 hide-scrollbar">
          {LINKS.map((item) => {
            const active = item.exact
              ? pathname === item.to
              : pathname === item.to || pathname.startsWith(`${item.to}/`);
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-3 py-2 text-sm no-underline",
                  active ? "bg-leaf text-leaf-fg" : "text-mist hover:text-ink",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <div className={pathname.startsWith("/admin/layout") ? "h-[calc(100dvh-7.5rem)]" : "mx-auto max-w-6xl px-4 py-6"}>{children}</div>
    </div>
  );
}
