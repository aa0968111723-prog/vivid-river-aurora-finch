export type ClubMedia = {
  src: string;
  alt: string;
  caption: string;
  kind: "photo" | "poster";
};

/** Club-owned photos from their Drive. No names, phones, or member sheets. */
export const REAL_PHOTOS: ClubMedia[] = [
  {
    src: "/images/photos/final-gathering.jpg",
    alt: "期末社大，社員在教室合照",
    caption: "期末社大合照",
    kind: "photo",
  },
  {
    src: "/images/photos/floating-flowers.jpg",
    alt: "浮花禪光體驗，社員在教室合照",
    caption: "浮花禪光體驗合照",
    kind: "photo",
  },
  {
    src: "/images/photos/lecture-numbers.jpg",
    alt: "期初演講現場，講者站在投影幕前",
    caption: "期初演講現場",
    kind: "photo",
  },
];

/** Posters already published on the club Instagram. Retrospective, not open signup. */
export const REAL_POSTERS: ClubMedia[] = [
  {
    src: "/images/posters/opening-tea.jpg",
    alt: "期初茶會文宣：浮花禪光",
    caption: "期初茶會文宣｜浮花禪光",
    kind: "poster",
  },
  {
    src: "/images/posters/opening-talk.jpg",
    alt: "期初演講文宣：與自己有約",
    caption: "期初演講文宣｜與自己有約",
    kind: "poster",
  },
  {
    src: "/images/posters/class-1.jpg",
    alt: "社課一文宣：靜定的力量",
    caption: "社課一文宣｜靜定的力量",
    kind: "poster",
  },
  {
    src: "/images/posters/class-2.jpg",
    alt: "社課二文宣：禪定重啟大腦潛能",
    caption: "社課二文宣｜禪定重啟大腦潛能",
    kind: "poster",
  },
  {
    src: "/images/posters/class-3.jpg",
    alt: "社課三文宣：生命的真相",
    caption: "社課三文宣｜生命的真相",
    kind: "poster",
  },
  {
    src: "/images/posters/class-4.jpg",
    alt: "社課四文宣：期中考大補帖",
    caption: "社課四文宣｜期中考大補帖",
    kind: "poster",
  },
  {
    src: "/images/posters/class-5.jpg",
    alt: "社課五文宣：天下第一禪",
    caption: "社課五文宣｜天下第一禪",
    kind: "poster",
  },
];
