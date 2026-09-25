import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { getStoryBySlug } from "@/lib/server/public";
import { SITE } from "@/lib/site";
import { Button } from "@/components/ui/button";
import { NotFoundPage } from "@/components/not-found";

export const Route = createFileRoute("/stories/$slug")({
  loader: async ({ params }) => {
    const story = await getStoryBySlug({ data: { slug: params.slug } });
    if (!story) throw notFound();
    return story;
  },
  notFoundComponent: NotFoundPage,
  component: StoryPage,
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.quote ?? "社員故事"}｜${SITE.name}` },
      { name: "description", content: loaderData?.quote ?? "" },
    ],
  }),
});

function StoryPage() {
  const story = Route.useLoaderData();
  return (
    <article className="mx-auto max-w-3xl px-5 py-12 md:px-6 md:py-16">
      {story.photoUrl ? (
        <img src={story.photoUrl} alt="" className="mb-8 aspect-[4/3] w-full rounded-xl object-cover" />
      ) : null}
      <p className="text-sm text-mist">
        {story.displayName}
        {story.roleLabel ? ` · ${story.roleLabel}` : ""}
        {story.joinedLabel ? ` · ${story.joinedLabel}` : ""}
      </p>
      <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight md:text-4xl">
        「{story.quote}」
      </h1>
      <div className="mt-8 whitespace-pre-line text-[17px] leading-relaxed">{story.body}</div>
      <div className="mt-10 flex gap-3">
        <Button asChild>
          <Link to="/events">去看活動</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/stories">其他故事</Link>
        </Button>
      </div>
    </article>
  );
}
