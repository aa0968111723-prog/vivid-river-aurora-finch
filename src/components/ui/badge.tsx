import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      tone: {
        open: "bg-chip-open text-leaf",
        filling: "bg-chip-fill text-ink",
        upcoming: "bg-paper text-mist border border-line",
        full: "bg-chip-end text-mist",
        ended: "bg-chip-end text-mist",
        leaf: "bg-leaf/10 text-leaf",
        coral: "bg-coral/10 text-coral",
        sky: "bg-sky/10 text-sky",
      },
    },
    defaultVariants: { tone: "upcoming" },
  },
);

export function Badge({
  className,
  tone,
  ...props
}: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span className={cn(badgeVariants({ tone }), className)} {...props} />;
}
