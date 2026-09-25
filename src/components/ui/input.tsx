import * as React from "react";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "flex h-11 w-full rounded-md border border-line bg-raised px-3 text-sm text-ink placeholder:text-mist/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/40",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "flex min-h-32 w-full rounded-md border border-line bg-raised px-3 py-2 text-sm text-ink placeholder:text-mist/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-leaf/40",
        className,
      )}
      {...props}
    />
  );
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      className={cn("text-sm font-medium text-ink", className)}
      {...props}
    />
  );
}
