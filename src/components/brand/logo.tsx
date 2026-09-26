import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <Link
      to="/"
      className={cn("flex items-center gap-2.5 text-ink no-underline", className)}
      aria-label="淡江大學禪學社 首頁"
    >
      {compact ? (
        <>
          <img src="/images/club-mark.png" alt="" className="size-10 shrink-0" />
          <span className="font-display text-[15px] font-semibold tracking-tight">淡江禪學社</span>
        </>
      ) : (
        <img src="/images/club-logo.png" alt="淡大禪學社 TKU Zen Club" className="h-28 w-auto" />
      )}
    </Link>
  );
}
