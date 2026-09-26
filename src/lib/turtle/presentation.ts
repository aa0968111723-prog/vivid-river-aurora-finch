export type TurtlePresentation = "full" | "simple" | "static";

export function resolveTurtlePresentation(input: {
  reducedMotion: boolean;
  webgl: boolean;
  lowPower: boolean;
  disable3dOnMobile: boolean;
  mobile: boolean;
}): TurtlePresentation {
  if (input.reducedMotion || !input.webgl) return "static";
  if (input.lowPower || (input.mobile && input.disable3dOnMobile)) return "simple";
  return "full";
}
