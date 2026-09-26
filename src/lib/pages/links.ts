/** A new tab is only the explicit blank target. An https link with target self stays in this tab. */
export function anchorMode(href: string, target?: string): "blank" | "same" | "route" {
  if (!href) return "route";
  if (target === "blank") return "blank";
  if (href.startsWith("http://") || href.startsWith("https://")) return "same";
  return "route";
}