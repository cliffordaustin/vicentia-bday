export type MediaItem = { src: string; kind: "image" | "video" };

export type MemoryChip =
  | { type: "story"; title?: string; body: string }
  | { type: "quote"; text: string; speaker?: string }
  | { type: "joke"; text: string }
  | { type: "media"; items: MediaItem[]; caption?: string }
  | { type: "voice"; src: string; label: string };

export type MemoryYear = {
  id: string;
  year: string;
  era: string;
  accent: "pink" | "purple" | "cyan" | "gold";
  teaser: string;
  chips: MemoryChip[];
};

export const memories: MemoryYear[] = [
  {
    id: "y2014",
    year: "2014",
    era: "The beginning",
    accent: "pink",
    teaser: "The friend group that slowly became just us two. Tap to remember.",
    chips: [
      {
        type: "story",
        title: "How it went",
        body: "It's a bit blurry - we were always in a friend group, and somehow only you and I remained. Despite the \"best friends\" we had then.",
      },
      {
        type: "story",
        body: "We're more than friends - we're family.",
      },
      { type: "joke", text: "mcvjj daoqt" },
      {
        type: "media",
        items: [{ src: "/images/2014.jpg", kind: "image" }],
        caption: "first and last",
      },
    ],
  },
  {
    id: "y2015",
    year: "2015",
    era: "Becoming inseparable",
    accent: "purple",
    teaser: "The year you stopped being optional. Tap to remember.",
    chips: [
      {
        type: "story",
        title: "The plan that never succeeded",
        body: "We planned to have our parents meet and agree on renting the apartment at your place so we could stay together.",
      },
      {
        type: "story",
        body: "It was around that same time that we found out we were long distant cousins - but who cares, we're sisters!",
      },
      { type: "joke", text: "obviously that didn't work out" },
      {
        type: "media",
        items: [
          { src: "/images/2015_1.jpg", kind: "image" },
          { src: "/images/2015_2.jpg", kind: "image" },
        ],
        caption: "wish it happened",
      },
    ],
  },
  {
    id: "y2017",
    year: "2017",
    era: "Feelings in the way",
    accent: "gold",
    teaser: "Bigger feelings. Worse decisions. Better memories. Tap to remember.",
    chips: [
      {
        type: "story",
        title: "The hardest question",
        body: "The year you asked me to choose between you and Richard, and I couldn't. It was a tough time for me - and I'm sure it was the same for you, having to watch me go through that.",
      },
      { type: "quote", text: "It's either me or Richard, choose one." },
      {
        type: "story",
        body: "Obviously I chose you in the end ;^",
      },
      {
        type: "media",
        items: [{ src: "/images/2017.jpg", kind: "image" }],
      },
    ],
  },
  {
    id: "y2019",
    year: "2019ish",
    era: "The distance year",
    accent: "cyan",
    teaser: "Different sentiments, same person. Tap to remember.",
    chips: [
      {
        type: "story",
        title: "How it really went",
        body: "This was one difficult year - we stopped talking to each other for some months over a simple misunderstanding.",
      },
      {
        type: "story",
        body: "But ofc you can't live without me though - you moved in with me briefly along the line.",
      },
      {
        type: "story",
        body: "We were the biggest jokesters thinking we could even try to hate each other.",
      },
      {
        type: "media",
        items: [
          { src: "/images/2019_1.MP4", kind: "video" },
          { src: "/images/2019_2.MP4", kind: "video" },
          { src: "/images/2019_3.MP4", kind: "video" },
        ],
      },
    ],
  },
  {
    id: "y2023",
    year: "2023",
    era: "We made it",
    accent: "pink",
    teaser: "The finish line. Messy, but real. Tap to remember.",
    chips: [
      {
        type: "story",
        body: "We made it through uni - the ending wasn't the smoothest, but we still made it.",
      },
      {
        type: "story",
        body: "There was nothing to laugh about honestly 🤣",
      },
      {
        type: "media",
        items: [{ src: "/images/2023.jpg", kind: "image" }],
      },
    ],
  },
  {
    id: "ynow",
    year: "Now",
    era: "And here we are",
    accent: "gold",
    teaser: "Stronger, better and grounded. Everything we are right now. Tap to see.",
    chips: [
      {
        type: "story",
        body: "Stronger, better and grounded. I love the version of you that you are today.",
      },
      {
        type: "story",
        body: "I'm proud of the woman you've become.",
      },
      {
        type: "quote",
        text: "I've entered a lot of spaces 😂",
        speaker: "her",
      },
      {
        type: "media",
        items: [{ src: "/images/now.MP4", kind: "video" }],
      },
    ],
  },
];

export const accentColors = {
  pink: { hex: "#FF3EA5", glow: "rgba(255,62,165,0.5)" },
  purple: { hex: "#9B5DE5", glow: "rgba(155,93,229,0.5)" },
  cyan: { hex: "#00F5D4", glow: "rgba(0,245,212,0.5)" },
  gold: { hex: "#FFD23F", glow: "rgba(255,210,63,0.5)" },
} as const;
