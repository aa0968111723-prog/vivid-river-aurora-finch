import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { EventCard, EventStatusBadge } from "@/components/events/event-card";
import { RegisterCta } from "@/components/events/register-cta";
import { FaqList } from "@/components/faq-list";
import { MoodPicker } from "@/components/home/mood";
import { HomeLead, InstagramStrip, JoinBand, PhotoRibbon, StoriesStrip, UpcomingStrip } from "@/components/home/sections";
import { TurtleIntro } from "@/components/turtle/turtle-intro";
import { Button } from "@/components/ui/button";
import { formatEventRange } from "@/lib/format";
import type { PageDocument } from "@/lib/pages/types";
import { resolvePage, type ContentCatalog, type ResolvedBlock } from "@/lib/pages/resolve";
import type { Announcement, EventRecord, FaqRecord, InstagramPost, StoryRecord } from "@/lib/types";
import { photoWallMedia, mediaRecord, REAL_POSTERS, type ClubMedia, type MediaSource } from "@/lib/real-media";
import { anchorMode } from "@/lib/pages/links";
import { CATEGORY_LABELS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

export type RenderCatalog = {
  events: EventRecord[];
  stories: StoryRecord[];
  faq: FaqRecord[];
  instagram: InstagramPost[];
  photos: ClubMedia[];
  posters: ClubMedia[];
  announcement?: Announcement;
  currentEvent?: EventRecord | null;
  related?: EventRecord[];
};

function cssImage(src: string) {
  if (!src || /["'()]/.test(src)) return undefined;
  return `url("${src}")`;
}

function frameClass(block: ResolvedBlock, tone: "page" | "chrome") {
  const props = block.props;
  return cn(
    "relative",
    tone === "page" && props.paddingY === "sm" && "py-6",
    tone === "page" && props.paddingY === "md" && "py-12",
    tone === "page" && props.paddingY === "lg" && "py-20",
    props.align === "center" && "text-center",
    props.align === "end" && "text-right",
    !props.showMobile && "max-md:hidden",
    !props.showTablet && "md:max-lg:hidden",
    !props.showDesktop && "lg:hidden",
    props.animate && "zen-rise",
    props.hidden && "opacity-60",
  );
}

function Shell({
  block,
  editing,
  tone,
  children,
}: {
  block: ResolvedBlock;
  editing?: boolean;
  tone: "page" | "chrome";
  children: ReactNode;
}) {
  if (block.props.hidden && !editing) return null;
  const image = cssImage(block.props.backgroundImage);
  return (
    <section
      id={block.props.anchor || undefined}
      data-section={block.props.sectionName}
      data-block-type={block.type}
      className={frameClass(block, tone)}
      style={{
        backgroundColor: block.props.backgroundColor || undefined,
        color: block.props.textColor || undefined,
        backgroundImage: image,
        backgroundSize: "cover",
      }}
    >
      {image ? (
        <div className="absolute inset-0" style={{ background: `rgb(42 39 35 / ${block.props.backgroundMask})` }} />
      ) : null}
      <div className="relative">{children}</div>
    </section>
  );
}

function InLink({ href, className, children, blank }: { href: string; className?: string; children: ReactNode; blank?: boolean }) {
  if (!href) return <span className={className}>{children}</span>;
  const mode = anchorMode(href, blank ? "blank" : "self");
  if (mode === "route") {
    return (
      <Link to={href as "/"} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className} target={mode === "blank" ? "_blank" : undefined} rel={mode === "blank" ? "noreferrer" : undefined}>
      {children}
    </a>
  );
}

function Buttons({ block, catalog }: { block: ResolvedBlock; catalog: RenderCatalog }) {
  if (block.props.source === "currentEvent" && catalog.currentEvent) {
    return (
      <div className="mx-auto max-w-xl px-5">
        <RegisterCta event={catalog.currentEvent} />
      </div>
    );
  }
  return (
    <div className={cn("mx-auto flex max-w-6xl flex-wrap gap-3 px-5", block.props.align === "center" && "justify-center")}>
      {block.props.buttons.map((button) => (
        <Button key={`${button.label}-${button.href}`} asChild variant={button.style === "primary" ? "default" : button.style}>
          <InLink href={button.href} blank={button.target === "blank"}>
            {button.label}
          </InLink>
        </Button>
      ))}
    </div>
  );
}

function EventDirectory({ events }: { events: EventRecord[] }) {
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const filtered = useMemo(
    () => events.filter((event) => (cat === "all" || event.categoryId === cat) && (status === "all" || event.computedStatus === status)),
    [cat, events, status],
  );
  const cats = ["all", "tea", "lecture", "class", "zen", "outdoor", "gathering"];
  const statuses = ["all", "open", "filling", "upcoming", "ended"];
  return (
    <div className="mx-auto max-w-6xl px-5">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {cats.map((id) => (
          <button key={id} type="button" className={cn("min-h-11 rounded-full px-3 text-sm", cat === id ? "bg-leaf text-leaf-fg" : "bg-paper")} onClick={() => setCat(id)}>
            {id === "all" ? "全部" : CATEGORY_LABELS[id]}
          </button>
        ))}
      </div>
      <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
        {statuses.map((id) => (
          <button key={id} type="button" className={cn("min-h-11 rounded-full px-3 text-sm", status === id ? "bg-ink text-raised" : "bg-paper")} onClick={() => setStatus(id)}>
            {id === "all" ? "所有狀態" : id}
          </button>
        ))}
      </div>
      {filtered.length ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="mt-6 rounded-xl border border-line bg-paper p-6 text-mist">最近的場次還在排，先追 IG {SITE.instagramHandle}。</p>
      )}
    </div>
  );
}

function asMedia(items: MediaSource[]): ClubMedia[] {
  return items.flatMap((item) => {
    const media = mediaRecord(item);
    return media ? [media] : [];
  });
}

function ratioClass(ratio: ResolvedBlock["props"]["imageRatio"]) {
  if (ratio === "square") return "aspect-square";
  if (ratio === "4/3") return "aspect-[4/3]";
  if (ratio === "3/4") return "aspect-[3/4]";
  if (ratio === "16/9") return "aspect-video";
  return "";
}

export function BlockView({
  block,
  catalog,
  editing = false,
  tone = "page",
}: {
  block: ResolvedBlock;
  catalog: RenderCatalog;
  editing?: boolean;
  tone?: "page" | "chrome";
}) {
  const events = block.items as EventRecord[];
  const width = block.props.maxWidth === "narrow" ? "max-w-3xl" : block.props.maxWidth === "wide" ? "max-w-7xl" : "max-w-6xl";
  let body: ReactNode = null;
  if (block.type === "turtle") body = <TurtleIntro props={block.props} editing={editing} />;
  else if (block.type === "hero") {
    body = (
      <HomeLead
        hero={{
          title: block.props.title,
          subtitle: block.props.subtitle || block.props.body,
          ctaPrimary: block.props.buttons[0]?.label || "看看最近活動",
          ctaPrimaryHref: block.props.buttons[0]?.href || "/events",
          ctaPrimaryTarget: block.props.buttons[0]?.target,
          ctaSecondary: block.props.buttons[1]?.label || "第一次來？",
          ctaSecondaryHref: block.props.buttons[1]?.href || "/first-time",
          ctaSecondaryTarget: block.props.buttons[1]?.target,
          image: block.props.imageSrc || "/images/hero-garden.jpg",
        }}
      />
    );
  } else if (block.type === "announcement") {
    const live = catalog.announcement?.visible ? catalog.announcement : null;
    const text = live?.title || block.props.title;
    if (!text && !editing) return null;
    body = (
      <div className="bg-leaf text-leaf-fg">
        <p className="mx-auto max-w-6xl px-5 py-2.5 text-sm">
          {live?.href ? <a href={live.href}>{text}</a> : text}
          {!live && block.props.subtitle ? <span className="ml-2 opacity-80">{block.props.subtitle}</span> : null}
        </p>
      </div>
    );
  } else if (block.type === "eventList" && block.props.showFilters) body = <EventDirectory events={events.length ? events : catalog.events} />;
  else if (block.type === "eventList") body = <UpcomingStrip events={events} title={block.props.title} subtitle={block.props.subtitle} />;
  else if (block.type === "featuredEvents") {
    body = (
      <div className={`mx-auto ${width} px-5`}>
        <h2 className="font-display text-3xl font-semibold">{block.props.title}</h2>
        <div className="mt-6 flex gap-4 overflow-x-auto">
          {(events.length ? events : catalog.events.filter((event) => event.featured)).map((event) => (
            <div key={event.id} className="w-72 shrink-0">
              <EventCard event={event} featured />
            </div>
          ))}
        </div>
      </div>
    );
  } else if (block.type === "eventTimeline") {
    body = (
      <div className={`mx-auto ${width} px-5`}>
        <p className="text-sm text-leaf">{block.props.subtitle}</p>
        <h2 className="font-display text-3xl font-semibold">{block.props.title}</h2>
        <ol className="mt-6 space-y-4 border-l border-line pl-5">
          {(events.length ? events : catalog.events.filter((event) => event.computedStatus === "ended")).map((event) => (
            <li key={event.id}>
              <Link to="/events/$slug" params={{ slug: event.slug }} className="no-underline">
                <p className="text-sm text-mist">{formatEventRange(event.startsAt, event.endsAt)}</p>
                <p className="font-display text-xl font-semibold">{event.title}</p>
                <p className="text-sm text-mist">{event.locationName}</p>
              </Link>
            </li>
          ))}
        </ol>
      </div>
    );
  } else if (block.type === "mood") body = <MoodPicker events={events.length ? events : catalog.events} title={block.props.title} subtitle={block.props.subtitle} />;
  else if (block.type === "stories") body = <StoriesStrip stories={(block.items as StoryRecord[]).length ? (block.items as StoryRecord[]) : catalog.stories} title={block.props.title} subtitle={block.props.subtitle} />;
  else if (block.type === "faq") {
    const items = (block.props.source === "currentEvent" ? catalog.currentEvent?.faq ?? [] : (block.items as FaqRecord[])).map((item, index) =>
      "question" in item ? (item as FaqRecord) : { id: `faq-${index}`, question: item.q, answer: item.a, icon: null, sortOrder: index },
    );
    body = (
      <section className={`mx-auto ${width} px-5`}>
        <h2 className="font-display text-3xl font-semibold">{block.props.title}</h2>
        <div className="mt-6">
          <FaqList items={items} />
        </div>
      </section>
    );
  } else if (block.type === "instagram") {
    body = (
      <InstagramStrip
        posts={(block.items as InstagramPost[]).length ? (block.items as InstagramPost[]) : catalog.instagram}
        ok
        title={block.props.title}
        subtitle={block.props.subtitle}
      />
    );
  } else if (block.type === "photoWall") {
    const wall = photoWallMedia(asMedia(block.items), block.props.source);
    body = <PhotoRibbon title={block.props.title} subtitle={block.props.subtitle} photos={wall.photos} posters={wall.posters} />;
  } else if (block.type === "posterWall") {
    const selected = asMedia(block.items);
    const posters = block.props.source === "manual" ? selected : selected.length ? selected : REAL_POSTERS;
    body = (
      <div className={`mx-auto ${width} px-5`}>
        <h2 className="font-display text-3xl font-semibold">{block.props.title}</h2>
        {block.props.body ? <p className="mt-2 text-sm text-mist">{block.props.body}</p> : null}
        <div className="mt-4 columns-2 gap-3 md:columns-3">
          {posters.map((image) => (
            <figure key={image.src} className="mb-3 break-inside-avoid">
              <img src={image.src} alt={image.alt} className={cn("w-full rounded-lg border border-line object-cover", ratioClass(block.props.imageRatio), block.props.imageCrop === "contain" && "object-contain")} />
              <figcaption className="mt-2 text-xs text-mist">{image.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    );
  } else if (block.type === "joinCta") body = <JoinBand title={block.props.title} subtitle={block.props.subtitle} buttons={block.props.buttons} />;
  else if (block.type === "heading" && block.props.source === "currentEvent" && catalog.currentEvent) {
    const event = catalog.currentEvent;
    body = (
      <div className={`mx-auto grid ${width} gap-6 px-5 md:grid-cols-[1.2fr_0.8fr]`}>
        <div>
          <EventStatusBadge status={event.computedStatus} />
          <h1 className="mt-3 font-display text-4xl font-semibold">{event.title}</h1>
          {event.subtitle ? <p className="mt-2 text-mist">{event.subtitle}</p> : null}
          <p className="mt-4 text-sm">{formatEventRange(event.startsAt, event.endsAt)}</p>
          <p className="text-sm text-mist">{event.locationName}</p>
          <p className="mt-4 whitespace-pre-wrap">{event.summary}</p>
          <p className="mt-4 whitespace-pre-wrap text-[17px] leading-relaxed">{event.body}</p>
        </div>
        <RegisterCta event={event} />
      </div>
    );
  } else if (block.type === "heading" || block.type === "firstTimeFlow" || block.type === "contact") {
    const columns = block.props.columns === 3 || block.props.columnCount === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2";
    body = (
      <div className={`mx-auto ${width} px-5`}>
        {block.props.subtitle ? <p className="text-sm font-medium tracking-wide text-leaf">{block.props.subtitle}</p> : null}
        {block.props.title ? <h2 className="mt-2 font-display text-3xl font-semibold md:text-4xl">{block.props.title}</h2> : null}
        {block.props.body ? <p className="mt-3 max-w-xl whitespace-pre-wrap text-mist">{block.props.body}</p> : null}
        {block.props.items.length ? (
          <div className={cn("mt-8 grid gap-4", columns)}>
            {block.props.items.map((item) => (
              <div key={item.title} className="rounded-xl border border-line bg-raised p-5">
                <h3 className="font-display text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-mist">{item.body}</p>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    );
  } else if (block.type === "image" || block.type === "imageText") {
    const src = block.props.source === "currentEvent" ? catalog.currentEvent?.coverImage || "" : block.props.imageSrc;
    body = (
      <div className={cn(`mx-auto ${width} items-center gap-6 px-5`, block.type === "imageText" && "md:grid md:grid-cols-2")}>
        {src ? (
          <img src={src} alt={block.props.imageAlt} className={cn("w-full rounded-xl", ratioClass(block.props.imageRatio), block.props.imageCrop === "contain" ? "object-contain" : "object-cover")} />
        ) : null}
        {block.type === "imageText" ? (
          <div>
            <h2 className="font-display text-3xl font-semibold">{block.props.title}</h2>
            <p className="mt-3 whitespace-pre-wrap text-mist">{block.props.body}</p>
          </div>
        ) : null}
      </div>
    );
  } else if (block.type === "buttons") body = <Buttons block={block} catalog={catalog} />;
  else if (block.type === "divider") body = <hr className="mx-auto max-w-6xl border-line" />;
  else if (block.type === "spacer") body = <div className="h-8" aria-hidden="true" />;
  else if (block.type === "columns") {
    const count = block.props.columnCount === 3 ? "md:grid-cols-3" : "md:grid-cols-2";
    body = (
      <div className={`mx-auto grid ${width} gap-4 px-5 ${count}`}>
        {block.slots.map((column, index) => (
          <div key={index}>
            {column.map((child) => (
              <BlockView key={child.id} block={child} catalog={catalog} editing={editing} tone={tone} />
            ))}
          </div>
        ))}
      </div>
    );
  }
  if (!body) return null;
  return (
    <Shell block={block} editing={editing} tone={tone}>
      {editing ? <p className="px-5 text-xs text-mist">{block.props.sectionName || block.type}</p> : null}
      {body}
    </Shell>
  );
}

export function PageView({
  document,
  catalog,
  editing = false,
  tone = "page",
}: {
  document: PageDocument;
  catalog: ContentCatalog;
  editing?: boolean;
  tone?: "page" | "chrome";
}) {
  const blocks = resolvePage(document, catalog, Date.now(), { includeHidden: editing });
  return (
    <>
      {blocks.map((block) => (
        <BlockView key={block.id} block={block} catalog={catalog as RenderCatalog} editing={editing} tone={tone} />
      ))}
    </>
  );
}


