import { createFileRoute, Navigate } from "@tanstack/react-router";
import { GROK_PROVIDERS, authEnabled, signIn } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { Logo } from "@/components/brand/logo";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/login")({
  component: Login,
  head: () => ({
    meta: [{ title: `後台登入｜${SITE.name}` }],
  }),
});

function Login() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="grid min-h-dvh place-items-center bg-canvas text-mist">載入中</div>;
  }
  if (user) return <Navigate to="/admin" />;
  return (
    <main className="grid min-h-dvh place-items-center bg-canvas px-5">
      <div className="w-full max-w-sm rounded-xl border border-line bg-raised p-8 shadow-soft">
        <Logo />
        <h1 className="mt-6 font-display text-2xl font-semibold">社員後台</h1>
        <p className="mt-2 text-sm text-mist">給負責更新活動的人。訪客不用登入。</p>
        <div className="mt-6 space-y-2">
          {authEnabled ? (
            GROK_PROVIDERS.map((p) => (
              <Button
                key={p.providerId}
                type="button"
                variant={p.idp === "google" ? "default" : "outline"}
                className="w-full"
                onClick={() => signIn(p.providerId, { callbackURL: "/admin" })}
              >
                使用 {p.label} 登入
              </Button>
            ))
          ) : (
            <p className="text-sm text-mist">登入尚未開啟。</p>
          )}
        </div>
      </div>
    </main>
  );
}
