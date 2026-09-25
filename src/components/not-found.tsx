import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
  return (
    <section className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <img
        src="/images/turtle.jpg"
        alt=""
        className="mb-6 size-32 rounded-full object-cover shadow-soft"
      />
      <h1 className="font-display text-3xl font-semibold tracking-tight">
        好像走到花園外面了
      </h1>
      <p className="mt-3 text-mist">這頁不存在。回首頁，或直接去看看最近的活動。</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Button asChild>
          <Link to="/">回首頁</Link>
        </Button>
        <Button asChild variant="outline">
          <Link to="/events">最近活動</Link>
        </Button>
      </div>
    </section>
  );
}
