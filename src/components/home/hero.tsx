import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { track } from "@/lib/analytics";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[calc(100svh-3.5rem)] overflow-hidden md:min-h-[calc(100svh-4rem)]">
      <img
        src="/images/hero-garden.jpg"
        alt="淡水校園花園，陽光從樹葉間灑落"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 via-ink/25 to-canvas" />
      <div className="relative mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-6xl flex-col justify-end px-5 pb-28 pt-20 md:min-h-[calc(100svh-4rem)] md:px-6 md:pb-24">
        <p className="mb-3 text-sm font-medium tracking-[0.18em] text-raised/90 uppercase">
          TKU Zen Club
        </p>
        <h1 className="max-w-xl font-display text-[2.15rem] font-semibold leading-[1.18] tracking-tight text-raised md:text-5xl">
          在很忙的大學生活裡，
          <br />
          留一點時間，認識自己。
        </h1>
        <p className="mt-4 max-w-md text-base text-raised/90">第一次來也沒關係</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild size="lg">
            <Link to="/events" onClick={() => track("hero_events_cta")}>
              看看最近活動
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-raised/40 bg-raised/90">
            <Link to="/first-time" onClick={() => track("hero_first_time_cta")}>
              第一次來？
            </Link>
          </Button>
        </div>
      </div>
      <img
        src="/images/turtle.jpg"
        alt=""
        className="turtle-float pointer-events-none absolute bottom-20 right-3 size-24 rounded-full object-cover shadow-soft ring-4 ring-canvas/80 md:bottom-10 md:right-8 md:size-36"
      />
    </section>
  );
}
