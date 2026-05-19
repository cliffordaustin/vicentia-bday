export type Chapter = {
  slug: string;
  path: string;
  index: number;
  title: string;
  subtitle: string;
  mood: "dazzling" | "nostalgic" | "cinematic" | "playful" | "loud" | "intimate" | "hopeful" | "hushed";
};

export const chapters: Chapter[] = [
  {
    slug: "landing",
    path: "/",
    index: 0,
    title: "Happy Birthday",
    subtitle: "From strangers to sisters - this is our story.",
    mood: "dazzling",
  },
  {
    slug: "how-it-started",
    path: "/how-it-started",
    index: 1,
    title: "How It Started",
    subtitle: "Before we knew what we'd become.",
    mood: "nostalgic",
  },
  {
    slug: "memory-lane",
    path: "/memory-lane",
    index: 2,
    title: "Memory Lane",
    subtitle: "Year by year, moment by moment.",
    mood: "cinematic",
  },
  {
    slug: "about-you",
    path: "/about-you",
    index: 3,
    title: "Things I Love About You",
    subtitle: "A wall of small, true things.",
    mood: "playful",
  },
  {
    slug: "letter",
    path: "/letter",
    index: 4,
    title: "A Letter to You",
    subtitle: "Read this slowly.",
    mood: "intimate",
  },
  {
    slug: "wishes",
    path: "/wishes",
    index: 5,
    title: "Wishes & What's Next",
    subtitle: "Everything I want for you, and us.",
    mood: "hopeful",
  },
  {
    slug: "secret",
    path: "/secret",
    index: 6,
    title: "One Last Thing",
    subtitle: "Shhh.",
    mood: "hushed",
  },
];

export function getChapter(slug: string): Chapter | undefined {
  return chapters.find((c) => c.slug === slug);
}

export function getNext(slug: string): Chapter | undefined {
  const current = getChapter(slug);
  if (!current) return undefined;
  return chapters[current.index + 1];
}

export function getPrev(slug: string): Chapter | undefined {
  const current = getChapter(slug);
  if (!current) return undefined;
  return chapters[current.index - 1];
}
