import { Link, createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/about")({
  component: About,
  head: () => ({
    meta: [
      { title: `認識我們｜${SITE.name}` },
      { name: "description", content: "淡江禪學社是一群很好相處的人。認識自己、慢下來、交朋友。" },
    ],
  }),
});

function About() {
  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src="/images/tricolor-light.jpg" alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/30 to-canvas" />
        <div className="relative mx-auto max-w-3xl px-5 py-24">
          <p className="text-sm font-medium tracking-wide text-raised/90">認識我們</p>
          <h1 className="mt-3 font-display text-4xl font-semibold tracking-tight text-raised">
            一群很好相處的人
          </h1>
        </div>
      </section>
      <section className="mx-auto max-w-3xl space-y-6 px-5 py-12 text-[17px] leading-relaxed md:px-6">
        <p>
          淡江大學禪學社在淡水校園。我們不是寺廟，也不會要你先成為什麼樣的人。
        </p>
        <p>
          比較常做的事：喝茶、聽一場演講、週三晚上社課、偶爾在覺軒花園走走、有時候一起坐一下子。
        </p>
        <p>
          如果你正在找一個可以慢下來、認識自己、也認識朋友的地方，先來一場就好。
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-4 px-5 pb-16 sm:grid-cols-3 md:px-6">
        {[
          { t: "認識自己", d: "不是自我改善課。就是把注意力拉回來一下。" },
          { t: "陪伴", d: "大學很趕。這裡可以不用趕。" },
          { t: "連結", d: "茶會上認識的人，常常比自我介紹記得更久。" },
        ].map((x) => (
          <div key={x.t} className="rounded-xl bg-paper p-6">
            <h2 className="font-display text-xl font-semibold">{x.t}</h2>
            <p className="mt-2 text-sm text-mist">{x.d}</p>
          </div>
        ))}
      </section>
      <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6">
        <div className="overflow-hidden rounded-xl">
          <img src="/images/turtle.jpg" alt="龜龜，禪學社的帶路角色" className="mx-auto max-w-xs" />
        </div>
        <p className="mt-4 text-center text-sm text-mist">龜龜會在網站裡帶路。牠也不趕。</p>
        <div className="mt-8 flex justify-center gap-3">
          <Button asChild>
            <Link to="/stories">社員故事</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/join">加入我們</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
