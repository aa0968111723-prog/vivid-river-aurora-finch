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
      { name: "description", content: "茶會、花園、社課現場。不是相簿清單，是走過去的感覺。" },
    ],
  }),
});

function GalleryPage() {
  const { eventAssets, pastEvents } = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <p className="text-sm font-medium tracking-wide text-leaf">活動回顧</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">那幾天的光</h1>
      <p className="mt-3 max-w-xl text-mist">照片來自社團活動。想參加下一場，從活動頁開始。</p>
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
