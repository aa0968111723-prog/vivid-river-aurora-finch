import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/faq-list";
import { SITE, withUtm } from "@/lib/site";
import type { Announcement, EventRecord, FaqRecord, InstagramPost, StoryRecord } from "@/lib/types";
import type { HomeBlock } from "@/lib/site-layout";

const BRAND_PHOTOS = [
  { src: "/images/tricolor-light.jpg", alt: "三色光" },
  { src: "/images/hero-garden.jpg", alt: "覺軒花園" },
];

function InLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  if (href.startsWith("https://")) {
    return (
      <a href={href} className={className} target="_blank" rel="noreferrer">
        {children}
      </a>
    );
  }
  return (
    <Link to={href as "/"} className={className}>
      {children}
    </Link>
  );
}

export function HomeLead({
  hero,
}: {
  hero: {
    title: string;
    subtitle: string;
    ctaPrimary: string;
    ctaPrimaryHref: string;
    ctaSecondary: string;
    ctaSecondaryHref: string;
    image: string;
  };
}) {
  return (
    <section className="relative isolate overflow-hidden">
      <img src={hero.image} alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/35 to-canvas" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 md:py-28">
        <h2 className="font-display text-4xl font-semibold tracking-tight text-raised">{hero.title}</h2>
        <p className="mt-4 max-w-lg text-raised/90">{hero.subtitle}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <InLink href={hero.ctaPrimaryHref}>{hero.ctaPrimary}</InLink>
          </Button>
          <Button asChild variant="outline" className="bg-raised/90">
            <InLink href={hero.ctaSecondaryHref}>{hero.ctaSecondary}</InLink>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function AnnouncementBar({
  block,
  announcement,
}: {
  block: HomeBlock;
  announcement: Announcement;
}) {
  if (!block.visible) return null;
  const fromSettings = announcement.visible && announcement.title.trim().length > 0;
  const text = fromSettings ? announcement.title : block.title;
  if (!text) return null;
  const href = fromSettings ? announcement.href : "";
  return (
    <div className="bg-leaf text-leaf-fg">
      <p className="mx-auto max-w-6xl px-5 py-2.5 text-sm md:px-6">
        {href ? (
          <a href={href} className="underline-offset-2 hover:underline">
            {text}
          </a>
        ) : (
          text
        )}
        {!fromSettings && block.subtitle ? <span className="ml-2 opacity-80">{block.subtitle}</span> : null}
      </p>
    </div>
  );
}

export function UpcomingStrip({
  events,
  title,
  subtitle,
}: {
  events: EventRecord[];
  title: string;
  subtitle: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-6 md:py-20">
      {subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p> : null}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
      {events.length ? (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-line bg-paper p-6 text-mist">
          最近的場次還在排，先追{" "}
          <a href={SITE.instagramUrl} className="text-leaf underline-offset-2 hover:underline" target="_blank" rel="noreferrer">
            IG {SITE.instagramHandle}
          </a>
          。
        </p>
      )}
    </section>
  );
}

const ACTIVITIES = [
  { title: "每週社課", body: "學期間常在週三晚上。約 19:00–21:30，18:50 報到。地點會變，以當週 IG 為準。" },
  { title: "茶會", body: "期初常有茶會，也會有像浮游禪光這樣的體驗。這一學期的日期還沒排上網站。" },
  { title: "演講", body: "大型演講曾在工學大樓 E310。已結束的場次回顧在活動頁，不開放報名。" },
  { title: "期末社大", body: "學期結束前後會辦。今年日期還沒公告，以 IG 為準。" },
  { title: "寒假禪訓營", body: "寒假的密集練習。時程還沒公告，先不要當成已開放報名。" },
  { title: "暑期挑戰營", body: "暑假的營隊。看到 IG 再決定，現在沒有報名連結。" },
  { title: "戶外小聚會", body: "有時在覺軒花園走走。沒有固定表，看到 IG 再決定要不要來。" },
];

export function WhatWeDo({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        {subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p> : null}
        <h2 className="mt-2 max-w-xl font-display text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
        <p className="mt-3 max-w-xl text-mist">這些是社團平常會做的類型，不是本週課表。</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {ACTIVITIES.map((item) => (
            <div key={item.title} className="rounded-xl border border-line bg-raised p-5">
              <h3 className="font-display text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PhotoRibbon({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-6">
      {subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p> : null}
      {title ? <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{title}</h2> : null}
      <p className="mt-3 text-xs text-mist">三色光、覺軒花園是社團意象，不是活動現場照。</p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        {BRAND_PHOTOS.map((image) => (
          <figure key={image.src} className="overflow-hidden rounded-xl">
            <img src={image.src} alt={image.alt} className="aspect-[4/3] w-full object-cover" />
            <figcaption className="mt-2 text-xs text-mist">{image.alt}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function InstagramStrip({
  posts,
  ok,
  title,
  subtitle,
}: {
  posts: InstagramPost[];
  ok: boolean;
  title: string;
  subtitle: string;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-6">
      {subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p> : null}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
        <a href={withUtm(SITE.instagramUrl, { medium: "home", campaign: "instagram" })} className="no-underline" target="_blank" rel="noreferrer">
          {title || SITE.instagramHandle}
        </a>
      </h2>
      {ok && posts.length ? (
        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.postUrl}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-xl border border-line bg-paper no-underline"
            >
              {post.thumbnailUrl ? (
                <img src={post.thumbnailUrl} alt="" className="aspect-square w-full object-cover" />
              ) : (
                <div className="grid aspect-square place-items-center text-sm text-mist">貼文</div>
              )}
              {post.caption ? <p className="line-clamp-2 p-3 text-sm text-ink">{post.caption}</p> : null}
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-6 text-mist">最近的貼文正在路上。</p>
      )}
    </section>
  );
}

export function StoriesStrip({
  stories,
  title,
  subtitle,
}: {
  stories: StoryRecord[];
  title: string;
  subtitle: string;
}) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        {subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p> : null}
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{title}</h2>
        {stories.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {stories.map((story) => (
              <Link
                key={story.id}
                to="/stories/$slug"
                params={{ slug: story.slug }}
                className="rounded-xl border border-line bg-raised p-5 no-underline"
              >
                <p className="font-display text-xl font-semibold leading-snug">「{story.quote}」</p>
                <p className="mt-3 text-sm text-mist">{story.displayName}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="mt-6 text-mist">真實社員故事籌備中。</p>
        )}
      </div>
    </section>
  );
}

export function FaqTeaser({
  items,
  title,
  subtitle,
}: {
  items: FaqRecord[];
  title: string;
  subtitle: string;
}) {
  if (!items.length) return null;
  return (
    <section className="mx-auto max-w-3xl px-5 py-16 md:px-6 md:py-20">
      {subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{subtitle}</p> : null}
      <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">{title}</h2>
      <div className="mt-6">
        <FaqList items={items} />
      </div>
    </section>
  );
}

export function JoinBand({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-6">
      <div className="rounded-2xl bg-night px-6 py-12 text-center text-raised md:px-12">
        <h2 className="font-display text-3xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mx-auto mt-3 max-w-lg text-raised/80">{subtitle}</p> : null}
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild variant="coral">
            <a href={withUtm(SITE.instagramDmUrl, { medium: "home", campaign: "dm" })} target="_blank" rel="noreferrer">
              私訊「想參加」
            </a>
          </Button>
          <Button asChild variant="outline" className="bg-transparent text-raised">
            <Link to="/join">加入方式</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
