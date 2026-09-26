import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { NotFoundPage } from "@/components/not-found";
import { publicCatalog } from "@/lib/pages/catalog";
import { getEventBySlug, getPublishedPage, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/events/$slug")({
  loader: async ({ params }) => {
    const [data, layout, catalog] = await Promise.all([
      getEventBySlug({ data: { slug: params.slug } }),
      getPublishedPage({ data: { pageKey: "eventDetail" } }),
      loadPublicCatalog(),
    ]);
    if (!data) throw notFound();
    return { ...data, page: layout.page, catalog };
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
  const { event, related, page, catalog } = Route.useLoaderData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.summary,
    startDate: event.startsAt,
    endDate: event.endsAt,
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    location: { "@type": "Place", name: event.locationName, address: event.locationDetail ?? SITE.campus },
    organizer: { "@type": "Organization", name: SITE.name },
    image: event.coverImage ? [event.coverImage] : undefined,
  };
  return (
    <article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageView
        document={page}
        catalog={publicCatalog(catalog, { currentEvent: event, related })}
      />
    </article>
  );
}
