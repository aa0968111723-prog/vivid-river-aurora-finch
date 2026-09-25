export type EventCategoryId =
  | "tea"
  | "lecture"
  | "class"
  | "zen"
  | "outdoor"
  | "gathering"
  | "recruit"
  | "other";

export type EventStatus = "upcoming" | "open" | "filling" | "full" | "ended";
export type PublishStatus = "draft" | "published" | "archived";
export type RegistrationMode =
  | "google_form"
  | "internal"
  | "external"
  | "instagram_dm"
  | "closed";
export type StaffRole = "admin" | "editor" | "viewer";

export type FaqItem = { q: string; a: string };

export type EventRecord = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  coverImage: string | null;
  categoryId: EventCategoryId;
  categoryName: string;
  startsAt: string;
  endsAt: string;
  timezone: string;
  locationName: string;
  locationDetail: string | null;
  mapUrl: string | null;
  summary: string;
  body: string;
  audience: string | null;
  registrationMode: RegistrationMode;
  registrationUrl: string | null;
  registrationNote: string | null;
  capacity: number | null;
  registeredCount: number | null;
  statusOverride: EventStatus | null;
  computedStatus: EventStatus;
  igUrl: string | null;
  canvaUrl: string | null;
  faq: FaqItem[];
  publishedAt: string | null;
  status: PublishStatus;
  isDemo: boolean;
  featured: boolean;
};

export type EventAsset = {
  id: string;
  eventId: string;
  kind: string;
  url: string;
  previewUrl: string | null;
  caption: string | null;
  sortOrder: number;
};

export type StoryRecord = {
  id: string;
  slug: string;
  quote: string;
  body: string;
  displayName: string;
  roleLabel: string | null;
  photoUrl: string | null;
  joinedLabel: string | null;
  relatedEventId: string | null;
  instagramUrl: string | null;
  isDemo: boolean;
};

export type FaqRecord = {
  id: string;
  question: string;
  answer: string;
  icon: string | null;
  sortOrder: number;
};

export type InstagramPost = {
  id: string;
  postUrl: string;
  thumbnailUrl: string | null;
  caption: string | null;
  postType: string;
  publishedOn: string | null;
  featured: boolean;
};

export type AssetRecord = {
  id: string;
  title: string | null;
  url: string;
  previewUrl: string | null;
  assetType: string;
  canvaUrl: string | null;
  driveUrl: string | null;
  eventId: string | null;
  tags: string | null;
};

export type SiteClubSettings = {
  name: string;
  nameEn: string;
  instagram: string;
  campus: string;
  note: string;
};

export type Announcement = {
  title: string;
  body: string;
  href: string;
  visible: boolean;
};
