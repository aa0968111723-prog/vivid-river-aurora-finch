import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { getPublishedPage, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/events/")({
  loader: async () => {
    const [catalog, page] = await Promise.all([loadPublicCatalog(), getPublishedPage({ data: { pageKey: "events" } })]);
    return { catalog, page: page.page };
  },
  component: EventsPage,
  head: () => ({
    meta: [
      { title: `活動｜${SITE.name}` },
      { name: "description", content: "看已結束的回顧，或追 IG @tku_zc 等下一場。" },
    ],
  }),
});

export function EventsPage() {
  const { catalog, page } = Route.useLoaderData();
  return (
    <main>
      <PageView document={page} catalog={catalog} />
    </main>
  );
}
