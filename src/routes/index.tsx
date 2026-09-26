import { createFileRoute } from "@tanstack/react-router";
import { PageView } from "@/components/blocks/block-view";
import { Skeleton } from "@/components/ui/skeleton";
import { publicCatalog } from "@/lib/pages/catalog";
import { getPublishedPage, getSiteMeta, loadPublicCatalog } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [catalog, page, meta] = await Promise.all([
      loadPublicCatalog(),
      getPublishedPage({ data: { pageKey: "home" } }),
      getSiteMeta(),
    ]);
    return { catalog, page: page.page, announcement: meta.announcement };
  },
  pendingComponent: HomeSkeleton,
  component: Home,
  head: () => ({
    meta: [
      { title: `${SITE.name}｜${SITE.nameEn}` },
      { name: "description", content: SITE.description },
    ],
  }),
});

function Home() {
  const data = Route.useLoaderData();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    alternateName: SITE.nameEn,
    description: SITE.description,
    sameAs: [SITE.instagramUrl, SITE.facebookUrl],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <PageView document={data.page} catalog={publicCatalog(data.catalog, { announcement: data.announcement })} />
    </>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-8 p-5">
      <Skeleton className="h-80 w-full rounded-xl" />
      <Skeleton className="h-[70vh] w-full rounded-xl" />
    </div>
  );
}
