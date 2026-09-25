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

const CARDS = [
  { title: "一個人來可以嗎？", body: "可以，而且很常見。" },
  { title: "一定要會打坐嗎？", body: "不用。不會才是正常的。" },
  { title: "需要宗教信仰嗎？", body: "不需要。這是大學社團。" },
  { title: "可以只來一次嗎？", body: "可以。先來坐坐看。" },
];

function FirstTime() {
  const data = Route.useLoaderData();
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src="/images/garden-path.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/40 to-canvas" />
        <div className="relative mx-auto max-w-3xl px-5 py-24 md:py-32">
          <p className="text-sm font-medium tracking-wide text-raised/90">第一次來</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-raised md:text-5xl">
            不用懂禪，也不用會打坐
          </h1>
          <p className="mt-4 max-w-lg text-raised/90">
            先來坐坐看。一個人來完全 OK。活動不會很嚴肅，也沒有人會點名。
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/events">看看最近活動</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-raised/90">
              <Link to="/join">想加入的話</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 py-12 sm:grid-cols-2 md:px-6">
        {CARDS.map((c) => (
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
