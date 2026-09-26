export type TurtlePhase = "idle" | "enter" | "talk" | "meditate" | "wake";

export type TurtlePose = {
  breath: number;
  headPitch: number;
  blink: number;
  eyeOpen: number;
  enter: number;
  nod: number;
  particle: number;
  wave: number;
};

export type TurtleMachine = {
  phase: TurtlePhase;
  elapsed: number;
  pose: TurtlePose;
  line: number;
};

const POSE_KEYS: (keyof TurtlePose)[] = ["breath", "headPitch", "blink", "eyeOpen", "enter", "nod", "particle", "wave"];

function pose(partial: Partial<TurtlePose>): TurtlePose {
  return {
    breath: 0,
    headPitch: 0,
    blink: 0,
    eyeOpen: 1,
    enter: 1,
    nod: 0,
    particle: 0,
    wave: 0,
    ...partial,
  };
}

function smooth(t: number): number {
  const x = Math.min(1, Math.max(0, t));
  return x * x * (3 - 2 * x);
}

function wave(elapsed: number, speed: number, amount: number): number {
  return Math.sin(elapsed * speed) * amount;
}

export function targetPose(phase: TurtlePhase, elapsed: number): TurtlePose {
  if (phase === "enter") {
    const t = smooth(elapsed / 2);
    return pose({
      enter: t,
      breath: wave(elapsed, 1.2, 0.03),
      headPitch: (t - 1) * 0.08,
      eyeOpen: 1,
    });
  }
  if (phase === "talk") {
    return pose({
      enter: 1,
      breath: wave(elapsed, 1.4, 0.025),
      nod: Math.sin(elapsed * 2.2) * 0.08,
      headPitch: Math.sin(elapsed * 1.3) * 0.04,
      blink: elapsed % 3.4 > 3.15 ? 1 : 0,
      eyeOpen: elapsed % 3.4 > 3.15 ? 0.15 : 1,
    });
  }
  if (phase === "meditate") {
    return pose({
      enter: 1,
      breath: wave(elapsed, 0.7, 0.04),
      eyeOpen: 0.08,
      blink: 1,
      particle: 0.45 + wave(elapsed, 0.5, 0.08),
      headPitch: -0.04,
    });
  }
  if (phase === "wake") {
    const t = smooth(elapsed / 1.2);
    return pose({
      enter: 1,
      eyeOpen: 0.08 + t * 0.92,
      blink: t > 0.35 ? 0 : 1,
      wave: Math.sin(t * Math.PI) * 0.7,
      headPitch: -0.04 + t * 0.08,
      breath: wave(elapsed, 1.1, 0.02),
      particle: (1 - t) * 0.2,
    });
  }
  return pose({
    enter: 1,
    breath: wave(elapsed, 1.15, 0.035),
    headPitch: wave(elapsed, 0.45, 0.03),
    blink: elapsed % 4.8 > 4.55 ? 1 : 0,
    eyeOpen: elapsed % 4.8 > 4.55 ? 0.12 : 1,
  });
}

export type SpokenStep = { kind: "line"; phase: "talk"; line: number } | { kind: "meditate"; line: number };

/** Next sentence for the 「下一句」control. Enter already shows line 0, so the first click must leave it. */
export function nextSpokenStep(phase: TurtlePhase, line: number, lineCount: number): SpokenStep {
  const last = Math.max(0, Math.min(5, lineCount - 1));
  const safeLine = Math.max(0, Math.min(last, line));
  if (phase === "enter") return { kind: "line", phase: "talk", line: last > 0 ? 1 : 0 };
  if (phase === "talk" && safeLine < last) return { kind: "line", phase: "talk", line: safeLine + 1 };
  if (phase === "talk") return { kind: "meditate", line: safeLine };
  const next = safeLine >= last ? 0 : safeLine + 1;
  return { kind: "line", phase: "talk", line: next };
}

export function createTurtleMachine(): TurtleMachine {
  return { phase: "enter", elapsed: 0, pose: targetPose("enter", 0), line: 0 };
}

export function transitionTurtle(machine: TurtleMachine, phase: TurtlePhase, line = machine.line): TurtleMachine {
  return { phase, elapsed: 0, pose: { ...machine.pose }, line };
}

export function tickTurtle(machine: TurtleMachine, dt: number): TurtleMachine {
  const step = Math.max(0, Math.min(dt, 0.05));
  const elapsed = machine.elapsed + step;
  const target = targetPose(machine.phase, elapsed);
  const blend = 1 - Math.exp(-step * 6);
  const next = { ...machine.pose };
  for (const key of POSE_KEYS) next[key] = machine.pose[key] + (target[key] - machine.pose[key]) * blend;
  return { ...machine, elapsed, pose: next };
}

export function poseDelta(a: TurtlePose, b: TurtlePose): number {
  return Math.max(...POSE_KEYS.map((key) => Math.abs(a[key] - b[key])));
}

export type RestRotation = { x: number; y: number; z: number };

/** Absolute head rotation for this frame. Callers must assign it, never add it to the previous frame. */
export function applyHeadRotation(rest: RestRotation, pose: TurtlePose, look: { x: number; y: number }): RestRotation {
  return {
    x: rest.x + pose.headPitch + look.y * 0.06,
    y: rest.y + look.x * 0.12 + pose.nod,
    z: rest.z,
  };
}

/** Eye height from the bind scale. A blink replaces the open height; it does not multiply the last frame. */
export function applyBlinkScale(restScaleY: number, pose: TurtlePose): number {
  const open = pose.blink > 0.5 ? Math.min(pose.eyeOpen, 0.15) : pose.eyeOpen;
  return restScaleY * Math.max(0.08, open);
}

/** Shell height from the bind scale plus the current breath. */
export function applyBreathScale(restScaleY: number, pose: TurtlePose): number {
  return restScaleY * (1 + pose.breath);
}

/** Limb angle from the bind rotation. `side` flips left and right; repeated calls with the same pose stay put. */
export function applyLimbRotation(restZ: number, pose: TurtlePose, side: number): number {
  return restZ + pose.breath * 1.6 * side + pose.wave * 0.35 * Math.max(0, side);
}
