/**
 * Integration adapters. Live Instagram / Canva / Drive APIs are not wired
 * in v1 — the site reads curated rows from the database instead.
 *
 * To connect later:
 * - Instagram Graph: implement LiveInstagramAdapter and switch in getFeaturedInstagram
 * - Canva: store canva_url on events/assets; do not treat Canva as the CMS
 * - Google Drive: admin picks file URLs; never expose OAuth secrets to the client
 */

export type InstagramAdapter = {
  name: "curated" | "graph";
  ready: boolean;
};

export type DriveAdapter = {
  name: "manual" | "google";
  ready: boolean;
};

export type CanvaAdapter = {
  name: "url-only" | "api";
  ready: boolean;
};

export const instagramAdapter: InstagramAdapter = {
  name: "curated",
  ready: true,
};

export const driveAdapter: DriveAdapter = {
  name: "manual",
  ready: false,
};

export const canvaAdapter: CanvaAdapter = {
  name: "url-only",
  ready: true,
};
