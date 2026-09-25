import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
  useRouterState,
} from "@tanstack/react-router";
import { AuthProvider } from "@/lib/auth/provider";
import { PreviewHostBridge } from "@/components/preview-host-bridge";
import { SiteShell } from "@/components/layout/site-shell";
import { NotFoundPage } from "@/components/not-found";
import { SITE } from "@/lib/site";
import appCss from "../styles.css?url";

const FONT =
  "https://fonts.googleapis.com/css2?family=Figtree:wght@500;600;700&family=Noto+Sans+TC:wght@400;500;600;700&display=swap";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: SITE.name },
      { name: "description", content: SITE.description },
      { name: "theme-color", content: "#F3EEE4" },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "stylesheet", href: appCss },
      { rel: "stylesheet", href: FONT },
      { rel: "manifest", href: "/__grok/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/__grok/icon-180.png" },
      { rel: "canonical", href: "/" },
    ],
  }),
  notFoundComponent: () => (
    <SiteShell>
      <NotFoundPage />
    </SiteShell>
  ),
  component: RootDocument,
});

function RootDocument() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const bare = pathname.startsWith("/admin") || pathname.startsWith("/login");
  return (
    <html lang="zh-Hant-TW" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <PreviewHostBridge />
        <AuthProvider>
          {bare ? <Outlet /> : (
            <SiteShell>
              <Outlet />
            </SiteShell>
          )}
        </AuthProvider>
        <Scripts />
      </body>
    </html>
  );
}
