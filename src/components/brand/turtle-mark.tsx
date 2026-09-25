import { cn } from "@/lib/utils";

export function TurtleMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={cn("text-leaf", className)}
      aria-hidden="true"
    >
      <circle cx="8" cy="16.5" r="3" fill="currentColor" />
      <circle cx="24" cy="16.5" r="3" fill="currentColor" />
      <circle cx="10" cy="24" r="3" fill="currentColor" />
      <circle cx="22" cy="24" r="3" fill="currentColor" />
      <ellipse cx="16" cy="18.5" rx="10" ry="7.5" fill="currentColor" />
      <circle cx="16" cy="8.5" r="4.2" fill="currentColor" />
      <circle cx="16" cy="18.5" r="3.2" fill="#F4EFE4" />
    </svg>
  );
}
