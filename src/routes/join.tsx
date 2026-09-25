import { Link, createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedEvents } from "@/lib/server/public";
import { EventCard } from "@/components/events/event-card";
import { SITE, withUtm } from "@/lib/site";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/join")({
  loader: () => getPublishedEvents(),
  component: JoinPage,
  head: () => ({
    meta: [
      { title: `加入我們｜${SITE.name}` },
      { name: "description", content: "想加入，先來一場就好。也可以先追 IG。" },
    ],
  }),
});

function JoinPage() {
  const events = Route.useLoaderData().filter((e) => e.computedStatus !== "ended").slice(0, 3);
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src="/images/campus-dusk.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-raised">
            想加入，先來一場就好
          </h1>
          <p className="mt-4 text-raised/90">不用先填一堆表。選一場活動，或直接去 IG 跟我們說你好。</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:px-6">
        {[
          { n: "1", t: "來看一場", d: "茶會最輕。演講也歡迎旁聽。" },
          { n: "2", t: "追 IG", d: "時間、地點、臨時取消，都會貼。" },
          { n: "3", t: "想加入再講", d: "招生期會開表單。現在也可以私訊。" },
        ].map((s) => (
          <div key={s.n} className="rounded-xl border border-line bg-raised p-6">
            <p className="text-sm text-leaf">{s.n}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">{s.t}</h2>
            <p className="mt-2 text-sm text-mist">{s.d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-8 md:px-6">
        <div className="flex flex-wrap justify-center gap-3">
          <Button asChild size="lg" variant="coral">
            <a
              href={withUtm(SITE.instagramUrl, { medium: "join", campaign: "instagram" })}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("join_ig_cta")}
            >
              <Instagram className="size-4" />
              追 {SITE.instagramHandle}
            </a>
          </Button>
          <Button asChild size="lg">
            <a
              href={withUtm(SITE.instagramDmUrl, { medium: "join", campaign: "dm" })}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("join_dm_cta")}
            >
              IG 私訊我們
            </a>
          </Button>
        </div>
      </section>
      {events.length ? (
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-6">
          <h2 className="font-display text-2xl font-semibold">最近可以先去的</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {events.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          <div className="mt-6">
            <Button asChild variant="ghost">
              <Link to="/events">看全部活動</Link>
            </Button>
          </div>
        </section>
      ) : null}
    </main>
  );
}
