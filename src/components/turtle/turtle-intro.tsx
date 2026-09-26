import { lazy, Suspense, useEffect, useId, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import type { BlockProps } from "@/lib/pages/types";
import { nextAmbient, type AmbientHandle } from "@/lib/turtle/ambient";
import { resolveTurtlePresentation, type TurtlePresentation } from "@/lib/turtle/presentation";
import { clearTurtleSeen, readTurtleSeen, writeTurtleSeen } from "@/lib/turtle/seen";
import { createTurtleMachine, nextSpokenStep, tickTurtle, transitionTurtle, type TurtlePhase } from "@/lib/turtle/state-machine";

const TurtleCanvas = lazy(() => import("./turtle-canvas").then((mod) => ({ default: mod.TurtleCanvas })));

function seen() {
  try {
    return readTurtleSeen(localStorage);
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    writeTurtleSeen(localStorage);
  } catch {
    /* private mode */
  }
}

export function replayZen() {
  try {
    clearTurtleSeen(localStorage);
  } catch {
    /* ignore */
  }
  delete document.documentElement.dataset.zenSkip;
  if (window.location.pathname === "/") {
    window.dispatchEvent(new Event("zen-replay"));
    return;
  }
  window.location.assign("/?zen=1");
}

export function useZenChrome() {
  return false;
}

function lowPower() {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (navigator.hardwareConcurrency || 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
}

function hasWebGL() {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function TurtleIntro({ props, editing = false }: { props: BlockProps; editing?: boolean }) {
  const labelId = useId();
  const sectionRef = useRef<HTMLElement>(null);
  const [presentation, setPresentation] = useState<TurtlePresentation>("static");
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<TurtlePhase>("enter");
  const [line, setLine] = useState(0);
  const [paused, setPaused] = useState(false);
  const [look, setLook] = useState({ x: 0, y: 0 });
  const [tiltReady, setTiltReady] = useState(false);
  const [audioOn, setAudioOn] = useState(false);
  const [failed, setFailed] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const machine = useRef(createTurtleMachine());
  const poseRef = useRef(machine.current.pose);
  const audioRef = useRef<AmbientHandle | null>(null);
  const lineRef = useRef(0);
  const phaseRef = useRef<TurtlePhase>("enter");
  const advanceRef = useRef<() => void>(() => {});

  const replay = props.introMode === "on" && (editing || !props.firstVisitOnly || !seen());
  const active = props.introMode !== "off" && (props.introMode === "on" ? replay || editing : true);
  const showModel = props.showTurtle && active;

  useEffect(() => {
    const onReplay = () => {
      machine.current = createTurtleMachine();
      setPhase("enter");
      setLine(0);
      setEpoch((value) => value + 1);
    };
    window.addEventListener("zen-replay", onReplay);
    return () => window.removeEventListener("zen-replay", onReplay);
  }, []);

  useLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.matchMedia("(max-width: 767px)").matches;
    const next = resolveTurtlePresentation({
      reducedMotion: reduced || props.introMode === "skip",
      webgl: hasWebGL(),
      lowPower: lowPower(),
      disable3dOnMobile: props.disable3dOnMobile,
      mobile,
    });
    setPresentation(next);
    setMounted(true);
    if (props.introMode === "skip" || reduced || (props.firstVisitOnly && seen() && !editing)) {
      machine.current = transitionTurtle(createTurtleMachine(), "idle");
      setPhase("idle");
    }
  }, [editing, epoch, props.disable3dOnMobile, props.firstVisitOnly, props.introMode]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setPaused(!entry?.isIntersecting || document.hidden), { threshold: 0.05 });
    observer.observe(node);
    const onHide = () => setPaused(document.hidden || !node.getBoundingClientRect().height);
    document.addEventListener("visibilitychange", onHide);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onHide);
    };
  }, []);

  function commit(nextPhase: TurtlePhase, nextLine = lineRef.current) {
    machine.current = transitionTurtle(machine.current, nextPhase, nextLine);
    phaseRef.current = nextPhase;
    lineRef.current = nextLine;
    setPhase(nextPhase);
    setLine(nextLine);
  }

  function advance() {
    const step = nextSpokenStep(phaseRef.current, lineRef.current, props.lines.length);
    if (step.kind === "meditate") {
      commit("meditate", step.line);
      window.setTimeout(() => {
        commit("wake", step.line);
        window.setTimeout(() => {
          commit("idle", step.line);
          markSeen();
        }, 1300);
      }, 2200);
      return;
    }
    commit(step.phase, step.line);
  }
  advanceRef.current = advance;

  useEffect(() => {
    if (!mounted || presentation === "static" || props.introMode === "off") return;
    let frame = 0;
    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (!paused) machine.current = tickTurtle(machine.current, dt);
      poseRef.current = machine.current.pose;
      if (machine.current.phase === "enter" && machine.current.elapsed >= 2) advanceRef.current();
      if (props.advance === "auto" && machine.current.phase === "talk") {
        const dwell = (props.dwellMs[lineRef.current] ?? 1800) / 1000;
        if (machine.current.elapsed > dwell) advanceRef.current();
      }
      frame = window.requestAnimationFrame(loop);
    };
    frame = window.requestAnimationFrame(loop);
    return () => window.cancelAnimationFrame(frame);
  }, [mounted, paused, presentation, props.advance, props.dwellMs, props.introMode]);

  function interact() {
    const currentLine = lineRef.current;
    const resume = phaseRef.current === "enter" ? "talk" : "idle";
    machine.current = transitionTurtle(machine.current, "wake", currentLine);
    phaseRef.current = "wake";
    setPhase("wake");
    window.setTimeout(() => {
      machine.current = transitionTurtle(machine.current, resume, currentLine);
      phaseRef.current = resume;
      setPhase(resume);
      setLine(currentLine);
    }, 700);
  }

  async function enableTilt() {
    const orientation = DeviceOrientationEvent as typeof DeviceOrientationEvent & {
      requestPermission?: () => Promise<string>;
    };
    try {
      if (orientation.requestPermission) {
        const result = await orientation.requestPermission();
        if (result !== "granted") return;
      }
      setTiltReady(true);
    } catch {
      setTiltReady(false);
    }
  }

  useEffect(() => {
    if (!tiltReady) return;
    const onTilt = (event: DeviceOrientationEvent) => {
      const x = Math.max(-0.35, Math.min(0.35, (event.gamma ?? 0) / 90));
      const y = Math.max(-0.25, Math.min(0.25, (event.beta ?? 0) / 180));
      setLook({ x, y });
    };
    window.addEventListener("deviceorientation", onTilt);
    return () => window.removeEventListener("deviceorientation", onTilt);
  }, [tiltReady]);

  function toggleAudio() {
    if (!props.ambientAudio) return;
    try {
    const next = nextAmbient(audioRef.current, () => {
      const context = new AudioContext();
      const buffer = context.createBuffer(1, context.sampleRate, context.sampleRate);
      const data = buffer.getChannelData(0);
      for (let index = 0; index < data.length; index += 1) data[index] = (Math.random() * 2 - 1) * 0.015;
      const source = context.createBufferSource();
      source.buffer = buffer;
      source.loop = true;
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 420;
      source.connect(filter).connect(context.destination);
      source.start();
      return {
        stop: () => {
          source.stop();
          void context.close();
        },
      };
    });
    audioRef.current = next;
      setAudioOn(Boolean(next));
    } catch {
      audioRef.current = null;
      setAudioOn(false);
    }
  }

  useEffect(() => {
    return () => {
      audioRef.current?.stop();
      audioRef.current = null;
    };
  }, []);

  if (props.introMode === "off") return null;
  const text = props.lines[line] ?? props.lines[0];
  const staticOnly = !mounted || presentation === "static" || failed || !showModel;
  const size = props.size === "sm" ? "min-h-64" : props.size === "lg" ? "min-h-[28rem]" : "min-h-80";
  const place = props.position === "left" ? "justify-start" : props.position === "right" ? "justify-end" : props.position === "bottom" ? "items-end" : "justify-center";

  return (
    <section
      ref={sectionRef}
      id="zen-intro"
      aria-labelledby={labelId}
      data-turtle-mode={staticOnly ? "static" : presentation}
      data-turtle-phase={phase}
      className={`relative isolate overflow-hidden bg-[#f6f1e6] ${size}`}
      style={{ "--zen-mask": String(props.backdropOpacity) } as CSSProperties}
      onPointerMove={(event) => {
        if (tiltReady) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        setLook({
          x: Math.max(-0.35, Math.min(0.35, (event.clientX - bounds.left) / bounds.width - 0.5)),
          y: Math.max(-0.25, Math.min(0.25, (event.clientY - bounds.top) / bounds.height - 0.5)),
        });
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,244,228,0.9),transparent_55%)]" />
      <div className={`relative mx-auto flex h-full max-w-6xl flex-col gap-4 px-5 py-8 md:flex-row md:items-center ${place}`}>
        <div className={`relative w-full max-w-sm ${size}`}>
          <img src="/images/turtle.jpg" alt="" className="absolute inset-0 m-auto h-48 w-48 object-contain" />
          {showModel && mounted && !staticOnly ? (
            <Suspense fallback={null}>
              <div className="absolute inset-0">
                <TurtleCanvas
                  phase={phase}
                  presentation={presentation}
                  look={look}
                  poseRef={poseRef}
                  particles={phase === "meditate" ? props.particleStrength : props.particleStrength * 0.15}
                  paused={paused}
                  onInteract={interact}
                  onUnavailable={() => setFailed(true)}
                />
              </div>
            </Suspense>
          ) : null}
        </div>
        <div className="max-w-md rounded-2xl bg-raised/90 p-5 shadow-soft">
          <p id={labelId} className="font-display text-2xl font-semibold">
            {text?.text}
          </p>
          {text?.sub ? <p className="mt-2 text-sm text-mist">{text.sub}</p> : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="min-h-11 rounded-full bg-leaf px-4 text-sm text-leaf-fg" onClick={advance}>
              下一句
            </button>
            <button type="button" className="min-h-11 rounded-full border border-line px-4 text-sm" onClick={interact} aria-label="和龜龜打個招呼">
              點一下龜龜
            </button>
            <button type="button" className="min-h-11 rounded-full px-4 text-sm text-mist" onClick={() => void enableTilt()}>
              允許裝置方向
            </button>
            {props.ambientAudio ? (
              <button type="button" className="min-h-11 rounded-full px-4 text-sm text-mist" onClick={toggleAudio} aria-pressed={audioOn}>
                {audioOn ? "關閉環境音" : "播放環境音"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
