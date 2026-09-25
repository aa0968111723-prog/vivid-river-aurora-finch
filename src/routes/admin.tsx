import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/layout/admin-shell";
import { RedirectToSignIn } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { getAdminContext } from "@/lib/server/admin";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const { user, isPending } = useCurrentUserState();
  const [staff, setStaff] = useState<{ role: string } | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!user) return;
    let alive = true;
    getAdminContext()
      .then((s) => {
        if (alive) setStaff(s);
      })
      .catch(() => {
        if (alive) setDenied(true);
      });
    return () => {
      alive = false;
    };
  }, [user]);

  if (isPending) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-40" />
      </div>
    );
  }
  if (!user) return <RedirectToSignIn />;
  if (denied) {
    return (
      <main className="grid min-h-dvh place-items-center bg-canvas px-5 text-center">
        <div>
          <h1 className="font-display text-2xl font-semibold">還沒有後台權限</h1>
          <p className="mt-2 text-sm text-mist">請請管理者把你加進名單。</p>
        </div>
      </main>
    );
  }
  if (!staff) {
    return (
      <div className="p-8">
        <Skeleton className="h-10 w-40" />
      </div>
    );
  }
  return (
    <AdminShell role={staff.role}>
      <Outlet />
    </AdminShell>
  );
}
