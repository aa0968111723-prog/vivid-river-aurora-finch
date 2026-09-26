import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { publicCatalog } from "@/lib/pages/catalog";
import { getPublishedPage, getSiteMeta, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/first-time")({
  loader: async () => {
    const [catalog, page, meta] = await Promise.all([
      loadPublicCatalog(),
      getPublishedPage({ data: { pageKey: "firstTime" } }),
      getSiteMeta(),
    ]);
    return { catalog, page: page.page, announcement: meta.announcement };
  },
  component: FirstTime,
  head: () => ({
    meta: [
      { title: `第一次來｜${SITE.name}` },
      { name: "description", content: "一個人來可以。不會打坐也可以。只來一次也可以。" },
    ],
  }),
});

function FirstTime() {
  const { catalog, page, announcement } = Route.useLoaderData();
  return <PageView document={page} catalog={publicCatalog(catalog, { announcement })} />;
}
