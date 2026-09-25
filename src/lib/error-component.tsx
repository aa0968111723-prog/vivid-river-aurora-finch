import type { ErrorComponentProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

const FALLBACK_MESSAGE = "出了一點狀況。重新整理看看。";

function errorMessage(error: unknown): string {
  if (error instanceof Error && error.message) return error.message;
  if (typeof error === "string" && error) return error;
  return FALLBACK_MESSAGE;
}

export function AppErrorComponent({ error }: ErrorComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-3 bg-canvas px-6 text-center text-ink">
      <img src="/images/turtle.jpg" alt="" className="size-24 rounded-full object-cover" />
      <h1 className="font-display text-xl font-semibold">這一頁先坐一下</h1>
      <p className="max-w-md text-sm break-words text-mist">{errorMessage(error)}</p>
      <Link to="/" className="mt-2 text-sm text-leaf">
        回首頁
      </Link>
    </main>
  );
}
