import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { getPublishedPage, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/stories/")({
  loader: async () => {
    const [catalog, page] = await Promise.all([loadPublicCatalog(), getPublishedPage({ data: { pageKey: "stories" } })]);
    return { catalog, page: page.page };
  },
  component: StoriesPage,
  head: () => ({
    meta: [
      { title: `社員故事｜${SITE.name}` },
      { name: "description", content: "真實社員故事籌備中。" },
    ],
  }),
});

function StoriesPage() {
  const { catalog, page } = Route.useLoaderData();
  return <PageView document={page} catalog={catalog} />;
}
