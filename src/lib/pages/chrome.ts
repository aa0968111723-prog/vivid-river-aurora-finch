import { publicCatalog } from "./catalog.ts";
import { resolvePage, type ResolvedBlock } from "./resolve.ts";
import type { PageDocument, PageStore } from "./types.ts";

const CHROME_LISTS = publicCatalog({
  events: [],
  stories: [],
  faq: [],
  instagram: [],
  photos: [],
  posters: [],
});

export function chromeBlocks(document: PageDocument | undefined): ResolvedBlock[] {
  if (!document) return [];
  return resolvePage(document, CHROME_LISTS);
}

export type PublicChrome = {
  showReplay: boolean;
  footerNote: string;
  header: PageDocument;
  footer: PageDocument;
};

export function publicChrome(store: PageStore): PublicChrome {
  const footer = store.pages.footer.published;
  const header = store.pages.header.published;
  const contact = footer.blocks.find((block) => block.type === "contact");
  const turtle = store.pages.home.published.blocks.find((block) => block.type === "turtle");
  return {
    showReplay: Boolean(turtle && !turtle.props.hidden && turtle.props.showReplayInHeader && turtle.props.introMode !== "off"),
    footerNote: contact?.props.body || "",
    header,
    footer,
  };
}
