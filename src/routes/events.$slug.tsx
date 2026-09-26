import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { CalendarDays, MapPin } from "lucide-react";
import { EventCard, EventStatusBadge } from "@/components/events/event-card";
import { RegisterCta } from "@/components/events/register-cta";
import { ShareBar } from "@/components/events/share-bar";
import { FaqList } from "@/components/faq-list";
import { Button } from "@/components/ui/button";
import { getEventBySlug } from "@/lib/server/public";
import { CATEGORY_LABELS, SITE } from "@/lib/site";
import { formatEventRange } from "@/lib/format";
import { NotFoundPage } from "@/components/not-found";

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ params }) => {
    const data = await getEventBySlug({ data: { slug: params.slug } });
    if (!data) throw notFound();
    return data;
  },
  notFoundComponent: NotFoundPage,
  component: EventDetail,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.event.title ?? "活動"}｜${SITE.name}` },
      { name: "description", content: loaderData?.event.summary ?? SITE.description },
    ],
  }),
});

function EventDetail() {
  const { event, assets, related } = Route.useLoaderData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus:
      event.computedStatus === "ended"
        ? "https://schema.org/EventScheduled"
        : "https://schema.org/EventScheduled",
    location: {
      "@type": "Place",
      name: event.locationName,
      address: event.locationDetail ?? SITE.campus,
    },
    organizer: { "@type": "Organization", name: SITE.name },
    image: event.coverImage ? [event.coverImage] : undefined,
  };
  const photos = assets.filter((a) => a.kind === "photo" || a.kind === "poster");
  return (
    <article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {event.coverImage ? (
        <div className="bg-paper">
          <img src={event.coverImage} alt="" className="mx-auto max-h-[52vh] w-full object-contain" />
        </div>
      ) : null}
      <div
        className={`mx-auto grid max-w-6xl gap-8 px-5 pb-16 md:grid-cols-[1.2fr_0.8fr] md:px-6 ${event.coverImage ? "md:-mt-8" : "pt-10"}`}
      >
        <div className="relative rounded-xl border border-line bg-raised p-5 shadow-soft md:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <EventStatusBadge status={event.computedStatus} />
            <span className="text-sm text-leaf">
              {CATEGORY_LABELS[event.categoryId] ?? event.categoryName}
            </span>
          </div>
          <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
            {event.title}
          </h1>
          {event.subtitle ? <p className="mt-2 text-mist">{event.subtitle}</p> : null}
          <ul className="mt-5 space-y-2 text-sm">
            <li className="flex gap-2">
              <CalendarDays className="mt-0.5 size-4 text-leaf" />
              {formatEventRange(event.startsAt, event.endsAt)}
            </li>
            <li className="flex gap-2">
              <MapPin className="mt-0.5 size-4 text-leaf" />
              <span>
                {event.locationName}
                {event.locationDetail ? ` · ${event.locationDetail}` : ""}
                {event.mapUrl ? (
                  <>
                    {" "}
                    <a href={event.mapUrl} className="text-leaf underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
                      地圖
                    </a>
                  </>
                ) : null}
              </span>
            </li>
          </ul>
          <p className="mt-6 text-lg leading-relaxed">{event.summary}</p>
          <div className="mt-6 space-y-4 whitespace-pre-line text-[15px] leading-relaxed text-ink/90">
            {event.body}
          </div>
          {event.audience ? (
            <div className="mt-8 rounded-lg bg-paper p-4">
              <p className="text-sm font-medium">適合誰</p>
              <p className="mt-1 text-sm text-mist">{event.audience}</p>
            </div>
          ) : null}
          {event.faq.length ? (
            <div className="mt-8">
              <h2 className="mb-3 font-display text-xl font-semibold">這一場常見問題</h2>
              <FaqList
                items={event.faq.map((f, i) => ({
                  id: `${event.id}-faq-${i}`,
                  question: f.q,
                  answer: f.a,
                  icon: null,
                  sortOrder: i,
                }))}
              />
            </div>
          ) : null}
          {photos.length ? (
            <div className="mt-8 grid grid-cols-2 gap-3">
              {photos.map((p) => (
                <img key={p.id} src={p.url} alt={p.caption ?? ""} className="rounded-lg object-cover" />
              ))}
            </div>
          ) : null}
          {event.igUrl || event.canvaUrl ? (
            <div className="mt-6 flex flex-wrap gap-3">
              {event.igUrl ? (
                <Button asChild variant="outline" size="sm">
                  <a href={event.igUrl} target="_blank" rel="noreferrer">
                    IG 活動貼文
                  </a>
                </Button>
              ) : null}
              {event.canvaUrl ? (
                <Button asChild variant="outline" size="sm">
                  <a href={event.canvaUrl} target="_blank" rel="noreferrer">
                    活動文宣
                  </a>
                </Button>
              ) : null}
            </div>
          ) : null}
          <div className="mt-8">
            <ShareBar title={event.title} path={`/events/${event.slug}`} />
          </div>
        </div>
        <aside className="space-y-4 md:sticky md:top-24 md:self-start">
          <RegisterCta event={event} />
          <Link to="/first-time" className="block rounded-xl border border-line bg-paper p-5 no-underline">
            <p className="font-medium text-ink">第一次來？</p>
            <p className="mt-1 text-sm text-mist">一個人來可以。不會打坐也可以。</p>
          </Link>
        </aside>
      </div>
      {related.length ? (
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
          <h2 className="font-display text-2xl font-semibold tracking-tight">
            {event.computedStatus === "ended" ? "其他已結束的場次" : "下一場可以去"}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <EventCard key={item.id} event={item} />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
