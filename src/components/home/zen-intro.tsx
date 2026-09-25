import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

const LINES = [
  { at: 0, text: "先坐一下。", sub: "往下滑，天會慢慢亮。" },
  { at: 0.14, text: "嗨，我是龜龜。" },
  { at: 0.32, text: "我們是淡江大學禪學社。" },
  { at: 0.5, text: "不是寺廟，也不用先變成什麼樣的人。" },
  { at: 0.68, text: "在很忙的大學裡，留一點時間認識自己，也認識旁邊的人。" },
  { at: 0.84, text: "喝茶、社課、坐一下子、去覺軒走走。\n第一次來，也沒關係。" },
] as const;

const STORY = LINES.filter((line) => line.at > 0);

export function useZenChrome() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const onHome = pathname === "/";
  const [inIntro, setInIntro] = useState(onHome);

  useEffect(() => {
    if (!onHome) {
      setInIntro(false);
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setInIntro(false);
      return;
    }
    const update = () => {
      const intro = document.getElementById("zen-intro");
      const next = !!intro && intro.getBoundingClientRect().bottom > 72;
      setInIntro((prev) => (prev === next ? prev : next));
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [onHome]);

  return inIntro;
}

export function ZenIntro() {
  const trackRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef(0);
  const ctaRef = useRef(false);
  const [line, setLine] = useState(0);
  const [showCta, setShowCta] = useState(false);

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
      for (let i = 0; i < LINES.length; i++) {
        if (progress >= LINES[i].at) next = i;
      }
      if (next !== lineRef.current) {
        lineRef.current = next;
        setLine(next);
      }
      const cta = progress >= 0.92;
      if (cta !== ctaRef.current) {
        ctaRef.current = cta;
        setShowCta(cta);
      }
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
  }, []);

  const skip = () => {
    const track = trackRef.current;
    if (!track) return;
    const top = window.scrollY + track.getBoundingClientRect().bottom - window.innerHeight + 4;
    window.scrollTo({ top, behavior: "smooth" });
  };

  const current = LINES[line] ?? LINES[0];

  return (
    <section id="zen-intro" ref={trackRef} className="zen-track" aria-label="龜龜開場">
      <div ref={stageRef} className="zen-stage">
        <div className="zen-sky" />
        <div className="zen-stars" />
        <div className="zen-moon" />
        <div className="zen-sun" />
        <div className="zen-bloom" />
        <div className="zen-hill zen-hill-back" />
        <div className="zen-hill" />
        <div className="zen-meter" />

        <div className="relative z-10 flex h-full min-h-0 flex-col items-center justify-end px-5 pb-5 md:pb-8">
          <button type="button" onClick={skip} className={showCta ? "zen-skip hidden" : "zen-skip"}>
            跳過介紹
          </button>

          <div className="zen-figure">
            <div className="zen-shadow" />
            <img
              src="/images/turtle-zen.png"
              alt="閉著眼睛、盤腿禪定的龜龜"
              className="zen-still"
              draggable={false}
            />
            <img
              src="/images/turtle-zen-open.png"
              alt=""
              className="zen-awake"
              draggable={false}
            />
          </div>

          <div className="zen-card motion-reduce:hidden">
            <p className="text-xs font-medium tracking-widest text-leaf uppercase">龜龜</p>
            <p key={current.text} aria-live="polite" className="zen-line mt-1 whitespace-pre-line font-display text-2xl font-semibold leading-snug md:text-3xl">
              {current.text}
            </p>
            { "sub" in current && current.sub ? (
              <p className="mt-2 text-sm text-mist">{current.sub}</p>
            ) : null}
            {showCta ? <IntroActions /> : null}
          </div>

          <div className="zen-card hidden motion-reduce:block">
            <p className="text-xs font-medium tracking-widest text-leaf uppercase">龜龜</p>
            <div className="mt-3 space-y-3 text-left">
              {STORY.map((item) => (
                <p key={item.text} className="font-display text-lg font-semibold leading-snug">
                  {item.text}
                </p>
              ))}
            </div>
            <IntroActions />
          </div>

          <div className="zen-chevron" aria-hidden="true">
            <ChevronDown className="size-5" />
          </div>
        </div>
      </div>
    </section>
  );
}

function IntroActions() {
  return (
    <div className="mt-4 flex flex-wrap justify-center gap-3">
      <Button asChild>
        <Link to="/events" onClick={() => track("hero_events_cta")}>
          看看最近活動
        </Link>
      </Button>
      <Button asChild variant="outline">
        <Link to="/first-time" onClick={() => track("hero_first_time_cta")}>
          第一次來？
        </Link>
      </Button>
    </div>
  );
}
