import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getPublicLayout } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  loader: () => getPublicLayout(),
  component: About,
  head: () => ({
    meta: [
      { title: `認識我們｜${SITE.name}` },
      { name: "description", content: "淡江大學禪學社。不是寺廟，第一次來也沒關係。" },
    ],
  }),
});

function About() {
  const { pages } = Route.useLoaderData();
  const about = pages.about;
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src="/images/tricolor-light.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-canvas" />
        <div className="relative mx-auto max-w-3xl px-5 py-24">
          <p className="text-sm font-medium tracking-wide text-raised/90">認識我們</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-raised">{about.title}</h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-6 px-5 py-12 text-[17px] leading-relaxed md:px-6">
        <p>{about.p1}</p>
        <p>{about.p2}</p>
        <p>{about.p3}</p>
        <p className="text-sm text-mist">{about.official}</p>
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <img src="/images/turtle.jpg" alt="龜龜，禪學社的帶路角色" className="mx-auto max-w-xs" />
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link to="/events">看看活動</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/join">加入我們</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
