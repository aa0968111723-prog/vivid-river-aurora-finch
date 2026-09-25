import { Link, createFileRoute } from "@tanstack/react-router";
import { getGalleryData } from "@/lib/server/public";
import { SITE } from "@/lib/site";
import { formatEventDate } from "@/lib/format";

export const Route = createFileRoute("/gallery")({
  loader: () => getGalleryData(),
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: `活動回顧｜${SITE.name}` },
      { name: "description", content: "已結束的活動。真實照片還在整理。" },
    ],
  }),
});

function GalleryPage() {
  const { eventAssets, pastEvents } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <p className="text-sm font-medium tracking-wide text-leaf">活動回顧</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">活動回顧</h1>
      <p className="mt-3 max-w-xl text-mist">
        {eventAssets.length
          ? "下面是已核對過的活動。照片不會用生成圖充數。"
          : "真實活動照片還在整理。可以先看已經結束的場次，或追 IG。"}
      </p>
      <div className="mt-10 columns-2 gap-3 md:columns-3">
        {eventAssets.map((a) => (
          <Link
            key={a.id}
            to="/events/$slug"
            params={{ slug: a.event_slug }}
            className="mb-3 block break-inside-avoid overflow-hidden rounded-lg"
          >
            <img src={a.url} alt={a.caption ?? a.event_title} className="w-full object-cover" loading="lazy" />
          </Link>
        ))}
      </div>
      {pastEvents.length ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">依活動</h2>
          <ul className="mt-4 space-y-3">
            {pastEvents.map((e) => (
              <li key={e.id}>
                <Link to="/events/$slug" params={{ slug: e.slug }} className="text-ink no-underline hover:text-leaf">
                  {e.title}
                  <span className="ml-2 text-sm text-mist">{formatEventDate(e.startsAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
