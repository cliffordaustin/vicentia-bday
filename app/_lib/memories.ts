// Memory Lane data. Each "year" is a memory card the user can unlock.
// Mix and match content types — leave fields empty/undefined if not used.
// TODO: replace every placeholder with real content.

export type MemoryChip =
  | { type: "photo"; src: string | null; caption: string }
  | { type: "quote"; text: string; speaker?: string }
  | { type: "song"; title: string; artist: string; url?: string }
  | { type: "joke"; text: string }
  | { type: "story"; title?: string; body: string }
  | { type: "voice"; src: string; label: string };

export type MemoryYear = {
  id: string; // unique key, used in localStorage
  year: string; // displayed label, e.g. "2010" or "Year One"
  era: string; // short tagline, e.g. "the beginning"
  accent: "pink" | "purple" | "cyan" | "gold"; // color theme for this year
  teaser: string; // shown while locked — keep cryptic / inviting
  chips: MemoryChip[];
};

export const memories: MemoryYear[] = [
  {
    id: "y1",
    year: "2010",
    era: "the beginning",
    accent: "pink",
    teaser: "Two strangers. One ordinary day. Tap to remember.",
    chips: [
      {
        type: "story",
        title: "How it really went",
        body: "TODO — the actual first day. The walk home. The text you sent your mom about her.",
      },
      { type: "quote", text: "Wait, you actually showed up?", speaker: "her" },
      {
        type: "song",
        title: "TODO song",
        artist: "TODO artist",
      },
      { type: "joke", text: "the green hoodie incident" },
      { type: "photo", src: null, caption: "first ever" },
    ],
  },
  {
    id: "y2",
    year: "2011",
    era: "becoming inseparable",
    accent: "purple",
    teaser: "The year you stopped being optional.",
    chips: [
      {
        type: "story",
        body: "TODO — the trip / sleepover / project that sealed it.",
      },
      { type: "quote", text: "TODO — something she said that you never forgot." },
      { type: "song", title: "TODO", artist: "TODO" },
      { type: "joke", text: "TODO inside joke #2" },
      { type: "photo", src: null, caption: "matching everything" },
    ],
  },
  {
    id: "y3",
    year: "2013",
    era: "growing up loud",
    accent: "gold",
    teaser: "Bigger feelings. Worse decisions. Better memories.",
    chips: [
      {
        type: "story",
        body: "TODO — a story about a hard year you got through together.",
      },
      { type: "quote", text: "TODO" },
      { type: "joke", text: "TODO" },
      { type: "photo", src: null, caption: "questionable era" },
      { type: "song", title: "TODO", artist: "TODO" },
    ],
  },
  {
    id: "y4",
    year: "2016",
    era: "the distance year",
    accent: "cyan",
    teaser: "Different cities, same person.",
    chips: [
      {
        type: "story",
        body: "TODO — long-distance, late-night calls, the visit.",
      },
      { type: "quote", text: "TODO" },
      { type: "joke", text: "TODO" },
      { type: "photo", src: null, caption: "the reunion" },
      { type: "song", title: "TODO", artist: "TODO" },
    ],
  },
  {
    id: "y5",
    year: "2020",
    era: "we made it",
    accent: "pink",
    teaser: "The world fell apart. We didn't.",
    chips: [
      {
        type: "story",
        body: "TODO — pandemic / a defining moment / something that proved it.",
      },
      { type: "quote", text: "TODO" },
      { type: "joke", text: "TODO" },
      { type: "photo", src: null, caption: "still us" },
      { type: "song", title: "TODO", artist: "TODO" },
    ],
  },
  {
    id: "y6",
    year: "now",
    era: "and here we are",
    accent: "gold",
    teaser: "Everything we are right now. Everything we'll be.",
    chips: [
      {
        type: "story",
        body: "TODO — where things stand. The version of her you love today.",
      },
      { type: "quote", text: "TODO" },
      { type: "joke", text: "TODO" },
      { type: "photo", src: null, caption: "today" },
      { type: "song", title: "TODO", artist: "TODO" },
    ],
  },
];

export const accentColors = {
  pink: { hex: "#FF3EA5", glow: "rgba(255,62,165,0.5)" },
  purple: { hex: "#9B5DE5", glow: "rgba(155,93,229,0.5)" },
  cyan: { hex: "#00F5D4", glow: "rgba(0,245,212,0.5)" },
  gold: { hex: "#FFD23F", glow: "rgba(255,210,63,0.5)" },
} as const;
