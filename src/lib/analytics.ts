import { trackAnalytics } from "@/lib/server/public";

export function track(eventName: string, extra?: { eventId?: string; path?: string }) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  void trackAnalytics({
    data: {
      eventName,
      path: extra?.path ?? window.location.pathname,
      referrer: document.referrer || undefined,
      utmSource: params.get("utm_source") ?? undefined,
      utmMedium: params.get("utm_medium") ?? undefined,
      utmCampaign: params.get("utm_campaign") ?? undefined,
      landingPage: window.location.pathname,
      eventId: extra?.eventId,
    },
  });
}
