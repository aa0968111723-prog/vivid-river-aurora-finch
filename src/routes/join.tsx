import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { getPublishedPage, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/join")({
  loader: async () => {
    const [catalog, page] = await Promise.all([loadPublicCatalog(), getPublishedPage({ data: { pageKey: "join" } })]);
    return { catalog, page: page.page };
  },
  component: JoinPage,
  head: () => ({
    meta: [
      { title: `加入我們｜${SITE.name}` },
      { name: "description", content: "想加入，先來一場就好。追 IG @tku_zc，或私訊「想參加」。" },
    ],
  }),
});

function JoinPage() {
  const { catalog, page } = Route.useLoaderData();
  return <PageView document={page} catalog={catalog} />;
}
