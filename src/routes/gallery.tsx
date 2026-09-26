import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { getPublishedPage, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/gallery")({
  loader: async () => {
    const [catalog, page] = await Promise.all([loadPublicCatalog(), getPublishedPage({ data: { pageKey: "gallery" } })]);
    return { catalog, page: page.page };
  },
  component: GalleryPage,
  head: () => ({
    meta: [
      { title: `活動回顧｜${SITE.name}` },
      { name: "description", content: "社團自己的照片，和已經公開過的文宣。不是生成圖。" },
    ],
  }),
});

function GalleryPage() {
  const { catalog, page } = Route.useLoaderData();
  return <PageView document={page} catalog={catalog} />;
}
