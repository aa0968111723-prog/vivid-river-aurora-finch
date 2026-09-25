import { useEffect, useLayoutEffect, useMemo, useRef, useState, type MouseEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";
import type { SiteLayout } from "@/lib/site-layout";

const SEEN_KEY = "tku-zen-seen";

type IntroSettings = SiteLayout["intro"];

function seen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function markSeen() {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* private mode */
  }
}

export function replayZen() {
  try {
    sessionStorage.removeItem(SEEN_KEY);
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
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const [inIntro, setInIntro] = useState(onHome);
  const [epoch, setEpoch] = useState(0);

  useEffect(() => {
    const onReplay = () => setEpoch((n) => n + 1);
    window.addEventListener("zen-replay", onReplay);
    return () => window.removeEventListener("zen-replay", onReplay);
  }, []);

  useLayoutEffect(() => {
    if (!onHome) {
      setInIntro(false);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const skipped = document.documentElement.dataset.zenSkip === "1" || seen();
    const intro = document.getElementById("zen-intro");
    if (reduced || skipped || !intro) {
      setInIntro(false);
      return;
    }
    const update = () => {
      const el = document.getElementById("zen-intro");
      const next = !!el && el.getBoundingClientRect().bottom > 24;
      setInIntro((prev) => (prev === next ? prev : next));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome, epoch]);

  return inIntro;
}

export function ZenIntro({ intro }: { intro: IntroSettings }) {
  const [open, setOpen] = useState(intro.mode === "on");
  const beats = useMemo(
    () => intro.lines.map((line, index) => ({ ...line, at: index / intro.lines.length })),
    [intro.lines],
  );

  useLayoutEffect(() => {
    if (intro.mode === "off") {
      setOpen(false);
      return;
    }
    const params = new URLSearchParams(window.location.search);
    if (params.get("zen") === "1") {
      try {
        sessionStorage.removeItem(SEEN_KEY);
      } catch {
        /* ignore */
      }
      delete document.documentElement.dataset.zenSkip;
      setOpen(true);
      window.history.replaceState({}, "", "/");
      return;
    }
    if (intro.mode === "skip" || seen()) setOpen(false);
  }, [intro.mode]);

  useEffect(() => {
    const onReplay = () => {
      try {
        sessionStorage.removeItem(SEEN_KEY);
      } catch {
        /* ignore */
      }
      delete document.documentElement.dataset.zenSkip;
      setOpen(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("zen-replay", onReplay);
    return () => window.removeEventListener("zen-replay", onReplay);
  }, []);

  if (intro.mode === "off" || !open) return null;
  return <ZenStage beats={beats} showTurtle={intro.showTurtle} onDone={() => setOpen(false)} />;
}

function ZenStage({
  beats,
  showTurtle,
  onDone,
}: {
  beats: { text: string; sub: string; at: number }[];
  showTurtle: boolean;
  onDone: () => void;
}) {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef(0);
  const targetRef = useRef(0);
  const seekingRef = useRef(false);
  const [line, setLine] = useState(0);
  const last = beats.length - 1;

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      stage.style.setProperty("--dawn", "1");
      document.documentElement.style.setProperty("--dawn", "1");
      return;
    }
    let frame = 0;
    const update = () => {
      const total = track.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-track.getBoundingClientRect().top, 0), Math.max(total, 0));
      const progress = total > 0 ? scrolled / total : 1;
      stage.style.setProperty("--dawn", progress.toFixed(4));
      document.documentElement.style.setProperty("--dawn", progress.toFixed(4));
      let next = 0;
      for (let i = 0; i < beats.length; i++) {
        if (progress >= beats[i].at - 0.001) next = i;
      }
      if (seekingRef.current && next < targetRef.current) {
        if (progress >= 0.995) markSeen();
        return;
      }
      seekingRef.current = false;
      if (next !== lineRef.current) {
        lineRef.current = next;
        targetRef.current = next;
        setLine(next);
      }
      if (progress >= 0.995) markSeen();
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [beats]);

  const scrollToProgress = (progress: number) => {
    const track = trackRef.current;
    if (!track) return;
    const total = Math.max(track.offsetHeight - window.innerHeight, 0);
    const top = window.scrollY + track.getBoundingClientRect().top + total * progress;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const leave = () => {
    markSeen();
    document.documentElement.dataset.zenSkip = "1";
    onDone();
    const root = document.documentElement;
    const prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = prev;
    });
  };

  const finish = () => {
    markSeen();
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().bottom - window.innerHeight + 8;
    window.scrollTo({ top: Math.max(top, 0), behavior: "smooth" });
  };

  const advance = () => {
    const current = Math.max(lineRef.current, targetRef.current);
    if (current >= last) {
      finish();
      return;
    }
    const next = current + 1;
    targetRef.current = next;
    seekingRef.current = true;
    lineRef.current = next;
    setLine(next);
    scrollToProgress(Math.min((beats[next]?.at ?? 1) + 0.02, 0.98));
  };

  const onStageClick = (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (target.closest("a, button")) return;
    advance();
  };

  return (
    <section id="zen-intro" ref={trackRef} className="zen-track" aria-label="龜龜開場">
      <div ref={stageRef} className="zen-stage" onClick={onStageClick}>
        <div className="zen-sky" />
        <div className="zen-stars" />
        <div className="zen-moon" />
        <div className="zen-sun" />
        <div className="zen-bloom" />
        <div className="zen-hill zen-hill-back" />
        <div className="zen-hill" />
        <div className="zen-meter" />

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-end px-5 pb-[max(1rem,env(safe-area-inset-bottom))] md:pb-8">
          <button type="button" onClick={leave} className="zen-skip">
            跳過介紹
          </button>

          {showTurtle ? (
            <div className="zen-figure">
              <div className="zen-shadow" />
              <img src="/images/turtle-zen.png" alt="閉著眼睛、盤腿禪定的龜龜" className="zen-still" draggable={false} />
              <img src="/images/turtle-zen-open.png" alt="" className="zen-awake" draggable={false} />
            </div>
          ) : null}

          <div className="zen-card motion-reduce:hidden">
            <p className="text-xs font-medium tracking-widest text-leaf">龜龜</p>
            <div className="zen-copy mt-1" aria-live="polite">
              {beats.map((item, index) => (
                <p
                  key={`${index}-${item.text}`}
                  className={index === line ? "zen-line is-on" : "zen-line"}
                  aria-hidden={index !== line}
                >
                  {item.text}
                </p>
              ))}
            </div>
            <p
              className={line === 0 && beats[0]?.sub ? "mt-2 min-h-5 text-sm text-mist" : "mt-2 min-h-5 text-sm text-transparent"}
              aria-hidden={line !== 0}
            >
              {beats[0]?.sub || "往下滑，或點一下"}
            </p>
            <div className={line === last ? "zen-cta is-on" : "zen-cta"}>
              <IntroActions />
            </div>
          </div>

          <div className="zen-card hidden motion-reduce:block">
            <p className="text-xs font-medium tracking-widest text-leaf">龜龜</p>
            <div className="mt-3 space-y-3 text-left">
              {beats.map((item, index) => (
                <p key={`${index}-${item.text}`} className="whitespace-pre-line font-display text-lg font-semibold leading-snug">
                  {item.text}
                </p>
              ))}
            </div>
            <IntroActions />
          </div>

          {line < last ? (
            <button type="button" className="zen-chevron" onClick={advance}>
              <ChevronDown className="size-5" />
              <span>往下滑，或點一下</span>
            </button>
          ) : (
            <div className="h-7" />
          )}
        </div>
      </div>
    </section>
  );
}

function IntroActions() {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      <Button asChild>
        <Link
          to="/events"
          onClick={() => {
            markSeen();
            track("hero_events_cta");
          }}
        >
          看看最近活動
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link
          to="/first-time"
          onClick={() => {
            markSeen();
            track("hero_first_time_cta");
          }}
        >
          第一次來？
        </Link>
      </Button>
    </div>
  );
}
