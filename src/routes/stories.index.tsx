import { Link, createFileRoute } from "@tanstack/react-router";
import { getPublishedStories } from "@/lib/server/public";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/stories/")({
  loader: () => getPublishedStories(),
  component: StoriesPage,
  head: () => ({
    meta: [
      { title: `社員故事｜${SITE.name}` },
      { name: "description", content: "真實社員故事籌備中。" },
    ],
  }),
});

function StoriesPage() {
  const stories = Route.useLoaderData();
  return (
    <main className="mx-auto max-w-6xl px-5 py-12 md:px-6 md:py-16">
      <p className="text-sm font-medium tracking-wide text-leaf">社員故事</p>
      <h1 className="mt-2 font-display text-4xl font-semibold tracking-tight">社員故事</h1>
      {stories.length === 0 ? (
        <p className="mt-6 text-mist">真實社員故事籌備中。</p>
      ) : (
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {stories.map((story) => (
            <Link
              key={story.id}
              to="/stories/$slug"
              params={{ slug: story.slug }}
              className="overflow-hidden rounded-xl border border-line bg-raised no-underline shadow-lift"
            >
              {story.photoUrl ? (
                <img src={story.photoUrl} alt="" className="aspect-[4/3] w-full object-cover" />
              ) : null}
              <div className="p-5">
                <p className="font-display text-xl font-semibold leading-snug">「{story.quote}」</p>
                <p className="mt-3 text-sm text-mist">
                  {story.displayName}
                  {story.joinedLabel ? ` · ${story.joinedLabel}` : ""}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
