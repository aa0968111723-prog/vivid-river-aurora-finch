import { Link, createFileRoute } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublicLayout, getPublishedEvents } from "@/lib/server/public";
import { EventCard } from "@/components/events/event-card";
import { SITE, withUtm } from "@/lib/site";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/join")({
  loader: async () => {
    const [events, layout] = await Promise.all([getPublishedEvents(), getPublicLayout()]);
    return { events, layout };
  },
  component: JoinPage,
  head: () => ({
    meta: [
      { title: `加入我們｜${SITE.name}` },
      { name: "description", content: "想加入，先來一場就好。追 IG @tku_zc，或私訊「想參加」。" },
    ],
  }),
});

function JoinPage() {
  const { events, layout } = Route.useLoaderData();
  const page = layout.pages.join;
  const upcoming = events.filter((e) => e.computedStatus !== "ended").slice(0, 3);
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src="/images/photos/final-gathering.jpg" alt="" className="absolute inset-0 size-full object-cover object-center" />
        <div className="absolute inset-0 bg-ink/45" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 text-center">
          <h1 className="font-display text-4xl font-semibold tracking-tight text-raised">{page.title}</h1>
          <p className="mt-4 text-raised/90">{page.lead}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 md:grid-cols-3 md:px-6">
        {page.steps.map((s, index) => (
          <div key={s.title} className="rounded-xl border border-line bg-raised p-6">
            <p className="text-sm text-leaf">{index + 1}</p>
            <h2 className="mt-2 font-display text-xl font-semibold">{s.title}</h2>
            <p className="mt-2 text-sm text-mist">{s.body}</p>
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
              私訊「想參加」
            </a>
          </Button>
        </div>
      </section>
      {upcoming.length ? (
        <section className="mx-auto max-w-6xl px-5 py-12 md:px-6">
          <h2 className="font-display text-2xl font-semibold">最近可以先去的</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {upcoming.map((e) => (
              <EventCard key={e.id} event={e} />
            ))}
          </div>
          <div className="mt-6">
            <Button asChild variant="ghost">
              <Link to="/events">看全部活動</Link>
            </Button>
          </div>
        </section>
      ) : (
        <p className="mx-auto max-w-6xl px-5 pb-16 text-center text-sm text-mist md:px-6">
          最近的場次還在排，先追 IG {SITE.instagramHandle}。
        </p>
      )}
    </main>
  );
}
