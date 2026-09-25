import { createFileRoute } from "@tanstack/react-router";
import { getPublishedEvents, getPublishedStories } from "@/lib/server/public";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const origin = "https://tku-zen.grok.app";
        const [events, stories] = await Promise.all([
          getPublishedEvents(),
          getPublishedStories(),
        ]);
        const urls = [
          "/",
          "/events",
          "/first-time",
          "/about",
          "/stories",
          "/gallery",
          "/join",
          ...events.map((e) => `/events/${e.slug}`),
          ...stories.map((s) => `/stories/${s.slug}`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${origin}${u}</loc></url>`).join("\n")}
</urlset>`;
        return new Response(xml, {
          headers: { "content-type": "application/xml; charset=utf-8" },
        });
      },
    },
  },
});
