import { Link, createFileRoute } from "@tanstack/react-router";
import { FaqList } from "@/components/faq-list";
import { MoodPicker } from "@/components/home/mood";
import { Button } from "@/components/ui/button";
import { getHomeData } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/first-time")({
  loader: () => getHomeData(),
  component: FirstTime,
  head: () => ({
    meta: [
      { title: `第一次來｜${SITE.name}` },
      { name: "description", content: "一個人來可以。不會打坐也可以。只來一次也可以。" },
    ],
  }),
});

function FirstTime() {
  const data = Route.useLoaderData();
  const page = data.layout.pages.firstTime;
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src="/images/garden-path.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-canvas" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 md:py-32">
          <p className="text-sm font-medium tracking-wide text-raised/90">第一次來</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-raised md:text-5xl">
            {page.title}
          </h1>
          <p className="mt-4 max-w-lg text-raised/90">{page.lead}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/events">看看最近活動</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-raised/90">
              <Link to="/join">我想要加入</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2 md:px-6">
        {page.cards.map((c) => (
          <div key={c.title} className="rounded-xl border border-line bg-raised p-6 shadow-lift">
            <h2 className="font-display text-xl font-semibold">{c.title}</h2>
            <p className="mt-2 text-mist">{c.body}</p>
          </div>
        ))}
      </section>
      <MoodPicker events={data.events} />
      <section className="mx-auto max-w-3xl px-5 py-16 md:px-6">
        <h2 className="font-display text-3xl font-semibold tracking-tight">你可能還想問</h2>
        <div className="mt-6">
          <FaqList items={data.faq} />
        </div>
      </section>
    </main>
  );
}
