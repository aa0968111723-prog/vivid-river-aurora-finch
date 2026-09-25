import { createFileRoute } from "@tanstack/react-router";
import { ZenIntro } from "@/components/home/zen-intro";
import { MoodPicker } from "@/components/home/mood";
import {
  FaqTeaser,
  InstagramStrip,
  JoinBand,
  PhotoRibbon,
  StoriesStrip,
  UpcomingStrip,
  WhatWeDo,
} from "@/components/home/sections";
import { Skeleton } from "@/components/ui/skeleton";
import { getHomeData } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/")({
  loader: () => getHomeData(),
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
    sameAs: [SITE.instagramUrl],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ZenIntro />
      {data.meta.announcement.visible && data.meta.announcement.title ? (
        <div className="bg-leaf text-leaf-fg">
          <p className="mx-auto max-w-6xl px-5 py-2.5 text-sm md:px-6">
            {data.meta.announcement.href ? (
              <a href={data.meta.announcement.href} className="underline-offset-2 hover:underline">
                {data.meta.announcement.title}
              </a>
            ) : (
              data.meta.announcement.title
            )}
          </p>
        </div>
      ) : null}
      <UpcomingStrip events={data.upcoming} />
      <MoodPicker events={data.events} />
      <WhatWeDo />
      <PhotoRibbon
        images={[
          { src: "/images/tea-gathering.jpg", alt: "茶會" },
          { src: "/images/garden-path.jpg", alt: "覺軒花園" },
          { src: "/images/tricolor-light.jpg", alt: "三色光" },
          { src: "/images/grass-circle.jpg", alt: "小聚會" },
        ]}
      />
      <InstagramStrip posts={data.ig.posts} ok={data.ig.ok} />
      <StoriesStrip stories={data.stories} />
      <FaqTeaser items={data.faq} />
      <JoinBand />
    </>
  );
}

function HomeSkeleton() {
  return (
    <div className="space-y-8 p-5">
      <Skeleton className="h-[70vh] w-full rounded-xl" />
      <div className="grid gap-4 md:grid-cols-3">
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
        <Skeleton className="h-72 rounded-xl" />
      </div>
    </div>
  );
}
