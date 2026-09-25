import { Link } from "@tanstack/react-router";
import { Instagram } from "lucide-react";
import { EventCard } from "@/components/events/event-card";
import { Button } from "@/components/ui/button";
import { FaqList } from "@/components/faq-list";
import { SITE, withUtm } from "@/lib/site";
import { track } from "@/lib/analytics";
import type { EventRecord, FaqRecord, InstagramPost, StoryRecord } from "@/lib/types";

export function UpcomingStrip({ events }: { events: EventRecord[] }) {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-leaf">最近有什麼活動？</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              想參加，選一場就好
            </h2>
          </div>
          <Button asChild variant="ghost" className="hidden md:inline-flex">
            <Link to="/events">看全部</Link>
          </Button>
        </div>
      </div>
      {events.length ? (
        <div className="mt-8 flex gap-4 overflow-x-auto px-5 pb-2 hide-scrollbar md:mx-auto md:max-w-6xl md:grid md:grid-cols-3 md:overflow-visible md:px-6">
          {events.map((event) => (
            <div key={event.id} className="w-[78vw] max-w-sm shrink-0 md:w-auto md:max-w-none">
              <EventCard event={event} featured />
            </div>
          ))}
        </div>
      ) : (
        <p className="mx-auto mt-8 max-w-6xl px-5 text-mist md:px-6">
          最近還沒有新場次。可以先追 IG，或來看第一次來專區。
        </p>
      )}
      <div className="mt-6 px-5 md:hidden">
        <Button asChild variant="outline" className="w-full">
          <Link to="/events">看全部活動</Link>
        </Button>
      </div>
    </section>
  );
}

const WHAT = [
  { title: "茶會", text: "花園、杯子、隨便聊。最容易踏進來的一種。", image: "/images/tea-gathering.jpg", to: "/events" },
  { title: "社課", text: "週三晚上。有人帶，不用每次都來。", image: "/images/club-class.jpg", to: "/events" },
  { title: "禪修體驗", text: "先來坐坐看。坐不住也沒關係。", image: "/images/sit-quiet.jpg", to: "/first-time" },
  { title: "戶外走走", text: "覺軒花園、校園、淡水的風。", image: "/images/garden-path.jpg", to: "/gallery" },
  { title: "期初演講", text: "給第一次來的人聽的。帶耳朵就好。", image: "/images/lecture-hall.jpg", to: "/events" },
  { title: "小聚會", text: "一群很好相處的人。沒有點名。", image: "/images/grass-circle.jpg", to: "/join" },
] as const;

export function WhatWeDo() {
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <p className="text-sm font-medium tracking-wide text-leaf">我們平常都在做什麼？</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">不是課堂，比較像生活</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {WHAT.map((item, i) => (
            <Link
              key={item.title}
              to={item.to}
              className={cnBento(i)}
            >
              <img src={item.image} alt="" className="absolute inset-0 size-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/20 to-transparent" />
              <div className="relative mt-auto p-5 text-raised">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-1 text-sm text-raised/85">{item.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function cnBento(i: number) {
  const tall = i === 0 || i === 3;
  return `relative flex min-h-56 overflow-hidden rounded-xl no-underline ${tall ? "sm:min-h-80" : ""}`;
}

export function InstagramStrip({
  posts,
  ok,
}: {
  posts: InstagramPost[];
  ok: boolean;
}) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-medium tracking-wide text-coral">Instagram</p>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
              {SITE.instagramHandle}
            </h2>
          </div>
          <Button asChild variant="coral">
            <a
              href={withUtm(SITE.instagramUrl, { medium: "home", campaign: "instagram" })}
              target="_blank"
              rel="noreferrer"
              onClick={() => track("ig_profile_cta")}
            >
              <Instagram className="size-4" />
              去 IG 看看
            </a>
          </Button>
        </div>
        {posts.length ? (
          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-3">
            {posts.map((post) => (
              <a
                key={post.id}
                href={withUtm(post.postUrl, { medium: "home", campaign: "instagram_grid" })}
                target="_blank"
                rel="noreferrer"
                className="group relative aspect-square overflow-hidden rounded-lg bg-canvas"
                onClick={() => track("ig_post_click")}
              >
                {post.thumbnailUrl ? (
                  <img
                    src={post.thumbnailUrl}
                    alt=""
                    className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                ) : (
                  <div className="grid size-full place-items-center text-sm text-mist">貼文</div>
                )}
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-xl border border-line bg-raised p-8 text-center">
            <p className="text-ink">最近的 IG 貼文正在路上</p>
            <p className="mt-2 text-sm text-mist">
              {ok ? "還沒有精選貼文。" : "暫時連不到精選，直接去 Instagram 看最新的就好。"}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

export function StoriesStrip({ stories }: { stories: StoryRecord[] }) {
  if (!stories.length) return null;
  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-6">
        <p className="text-sm font-medium tracking-wide text-leaf">社員故事</p>
        <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
          大家一開始也只是路過
        </h2>
        <div className="mt-8 flex gap-4 overflow-x-auto pb-2 hide-scrollbar md:grid md:grid-cols-3 md:overflow-visible">
          {stories.map((story) => (
            <Link
              key={story.id}
              to="/stories/$slug"
              params={{ slug: story.slug }}
              className="w-[78vw] max-w-sm shrink-0 overflow-hidden rounded-xl border border-line bg-raised no-underline shadow-lift md:w-auto md:max-w-none"
            >
              {story.photoUrl ? (
                <img src={story.photoUrl} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : null}
              <div className="p-5">
                <p className="font-display text-xl font-semibold leading-snug tracking-tight text-ink">
                  「{story.quote}」
                </p>
                <p className="mt-3 text-sm text-mist">
                  {story.displayName}
                  {story.roleLabel ? ` · ${story.roleLabel}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-6">
          <Button asChild variant="ghost">
            <Link to="/stories">看更多故事</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function FaqTeaser({ items }: { items: FaqRecord[] }) {
  return (
    <section className="bg-paper py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:grid-cols-[0.9fr_1.1fr] md:px-6">
        <div>
          <p className="text-sm font-medium tracking-wide text-leaf">第一次來</p>
          <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight">
            你可能想先問的
          </h2>
          <p className="mt-3 text-mist">一個人來可以。不會打坐也可以。只來一次也可以。</p>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/first-time">第一次來專區</Link>
          </Button>
        </div>
        <FaqList items={items.slice(0, 6)} />
      </div>
    </section>
  );
}

export function JoinBand() {
  return (
    <section className="relative isolate overflow-hidden">
      <img src="/images/campus-dusk.jpg" alt="" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0 bg-ink/45" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center md:py-28">
        <h2 className="font-display text-3xl font-semibold tracking-tight text-raised md:text-4xl">
          想加入，先來一場就好
        </h2>
        <p className="mt-4 text-raised/90">
          不用先當社員。選一場活動、追 IG，或直接私訊我們。
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button asChild size="lg">
            <Link to="/join" onClick={() => track("join_band_cta")}>
              加入我們
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="border-raised/40 bg-raised/90">
            <a
              href={withUtm(SITE.instagramUrl, { medium: "home", campaign: "join" })}
              target="_blank"
              rel="noreferrer"
            >
              追 Instagram
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

export function PhotoRibbon({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <section className="py-8">
      <div className="flex gap-3 overflow-x-auto px-5 pb-2 hide-scrollbar md:grid md:grid-cols-4 md:px-6 md:overflow-visible mx-auto max-w-6xl">
        {images.map((img) => (
          <img
            key={img.src}
            src={img.src}
            alt={img.alt}
            className="h-48 w-[70vw] shrink-0 rounded-lg object-cover md:h-56 md:w-full"
            loading="lazy"
          />
        ))}
      </div>
    </section>
  );
}
