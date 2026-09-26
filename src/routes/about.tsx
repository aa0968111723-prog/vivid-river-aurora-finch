import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { loadPublicCatalog, getPublishedPage } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  loader: async () => {
    const [page, catalog] = await Promise.all([getPublishedPage({ data: { pageKey: "about" } }), loadPublicCatalog()]);
    return { page: page.page, catalog };
  },
  component: About,
  head: () => ({
    meta: [
      { title: `認識我們｜${SITE.name}` },
      { name: "description", content: "淡江大學禪學社。不是寺廟，第一次來也沒關係。" },
    ],
  }),
});

function About() {
  const { page, catalog } = Route.useLoaderData();
  return <PageView document={page} catalog={catalog} />;
}
