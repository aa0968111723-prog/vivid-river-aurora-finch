import { Link } from "@tanstack/react-router";
import { TurtleMark } from "./turtle-mark";
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
      <TurtleMark className="size-8 shrink-0" />
      <span className="leading-tight">
        <span className="block font-display text-[15px] font-semibold tracking-tight">
          淡江禪學社
        </span>
        {compact ? null : (
          <span className="block text-[11px] tracking-[0.12em] text-mist uppercase">
            TKU Zen Club
          </span>
        )}
      </span>
    </Link>
  );
}
