import type { ContentCatalog, CatalogRecord } from "./resolve.ts";

export type PublicLists = {
  events: CatalogRecord[];
  stories: CatalogRecord[];
  faq: CatalogRecord[];
  instagram: CatalogRecord[];
  photos: CatalogRecord[];
  posters: CatalogRecord[];
};

/** Copies the six published lists. It does not invent an empty list for a caller that omitted one. */
export function publicCatalog(
  lists: PublicLists,
  overlay?: Pick<ContentCatalog, "currentEvent" | "related" | "announcement">,
): ContentCatalog {
  return {
    events: lists.events,
    stories: lists.stories,
    faq: lists.faq,
    instagram: lists.instagram,
    photos: lists.photos,
    posters: lists.posters,
    currentEvent: overlay?.currentEvent,
    related: overlay?.related,
    announcement: overlay?.announcement,
  };
}
