import { createFileRoute } from "@tanstack/react-router";
import { ZenIntro } from "@/components/home/zen-intro";
import { MoodPicker } from "@/components/home/mood";
import {
  AnnouncementBar,
  FaqTeaser,
  HomeLead,
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
import type { HomeBlock } from "@/lib/site-layout";

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
    sameAs: [SITE.instagramUrl, SITE.facebookUrl],
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ZenIntro intro={data.layout.intro} />
      {data.layout.blocks.map((block) => (
        <HomeBlockView key={block.id} block={block} data={data} />
      ))}
    </>
  );
}

function HomeBlockView({
  block,
  data,
}: {
  block: HomeBlock;
  data: ReturnType<typeof Route.useLoaderData>;
}) {
  if (!block.visible) return null;
  switch (block.id) {
    case "hero":
      return <HomeLead hero={data.layout.hero} />;
    case "announcement":
      return <AnnouncementBar block={block} announcement={data.meta.announcement} />;
    case "upcoming":
      return <UpcomingStrip events={data.upcoming} title={block.title} subtitle={block.subtitle} />;
    case "mood":
      return <MoodPicker events={data.events} title={block.title} subtitle={block.subtitle} />;
    case "what":
      return <WhatWeDo title={block.title} subtitle={block.subtitle} />;
    case "photos":
      return <PhotoRibbon title={block.title} subtitle={block.subtitle} />;
    case "ig":
      return (
        <InstagramStrip posts={data.ig.posts} ok={data.ig.ok} title={block.title} subtitle={block.subtitle} />
      );
    case "stories":
      return <StoriesStrip stories={data.stories} title={block.title} subtitle={block.subtitle} />;
    case "faq":
      return <FaqTeaser items={data.faq} title={block.title} subtitle={block.subtitle} />;
    case "join":
      return <JoinBand title={block.title} subtitle={block.subtitle} />;
    default:
      return null;
  }
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
