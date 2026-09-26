import { Link, createFileRoute } from "@tanstack/react-router";
import { getGalleryData } from "@/lib/server/public";
import { REAL_PHOTOS, REAL_POSTERS } from "@/lib/real-media";
import { SITE } from "@/lib/site";
import { formatEventDate } from "@/lib/format";

export const Route = createFileRoute("/gallery")({
  loader: () => getGalleryData(),
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: `活動回顧｜${SITE.name}` },
      { name: "description", content: "社團自己的照片，和已經公開過的文宣。不是生成圖。" },
    ],
  }),
});

function GalleryPage() {
  const { eventAssets, pastEvents } = Route.useLoaderData();
  const seen = new Set<string>([...REAL_PHOTOS, ...REAL_POSTERS].map((item) => item.src));
  const extra = eventAssets.filter((asset) => !seen.has(asset.url) && !asset.url.startsWith("/images/ig/"));
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <p className="text-sm font-medium tracking-wide text-leaf">活動回顧</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">活動回顧</h1>
      <p className="mt-3 max-w-xl text-mist">
        下面是社團自己的照片，和已經公開的文宣。不是生成圖，也不是這一週的課表。
      </p>

      <section className="mt-10">
        <h2 className="font-display text-2xl font-semibold">現場</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {REAL_PHOTOS.map((image) => (
            <figure key={image.src} className="overflow-hidden rounded-xl">
              <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" loading="lazy" />
              <figcaption className="mt-2 text-sm text-mist">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold">文宣</h2>
        <p className="mt-2 text-sm text-mist">114 學年已公開的海報。日期寫在圖上，都已經結束。</p>
        <div className="mt-4 columns-2 gap-3 md:columns-3">
          {REAL_POSTERS.map((image) => (
            <figure key={image.src} className="mb-3 break-inside-avoid">
              <img src={image.src} alt={image.alt} className="w-full rounded-lg border border-line" loading="lazy" />
              <figcaption className="mt-2 text-xs text-mist">{image.caption}</figcaption>
            </figure>
          ))}
          {extra.map((asset) => (
            <Link
              key={asset.id}
              to="/events/$slug"
              params={{ slug: asset.event_slug }}
              className="mb-3 block break-inside-avoid no-underline"
            >
              <img src={asset.url} alt={asset.caption ?? asset.event_title} className="w-full rounded-lg border border-line" loading="lazy" />
              <p className="mt-2 text-xs text-mist">{asset.caption ?? asset.event_title}</p>
            </Link>
          ))}
        </div>
      </section>

      {pastEvents.length ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl font-semibold">依活動</h2>
          <ul className="mt-4 space-y-3">
            {pastEvents.map((event) => (
              <li key={event.id}>
                <Link to="/events/$slug" params={{ slug: event.slug }} className="text-ink no-underline hover:text-leaf">
                  {event.title}
                  <span className="ml-2 text-sm text-mist">{formatEventDate(event.startsAt)}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </main>
  );
}
