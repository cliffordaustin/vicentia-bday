// Sticky notes for "Things I Love About You".
// Add as many as you want — the board scales. Pick a category for color.
// TODO: replace these with real things you appreciate.

export type LoveCategory =
  | "kindness"
  | "chaos"
  | "loyalty"
  | "humor"
  | "strength";

export type LoveNote = {
  id: string;
  category: LoveCategory;
  text: string;
};

export const categoryMeta: Record<
  LoveCategory,
  { label: string; bg: string; text: string; pin: string }
> = {
  kindness: {
    label: "kindness",
    bg: "#FFB3D1",
    text: "#5B1A3A",
    pin: "#FF3EA5",
  },
  chaos: {
    label: "chaos",
    bg: "#FF3EA5",
    text: "#3A0A20",
    pin: "#FFD23F",
  },
  loyalty: {
    label: "loyalty",
    bg: "#00F5D4",
    text: "#053D33",
    pin: "#9B5DE5",
  },
  humor: {
    label: "humor",
    bg: "#FFD23F",
    text: "#3B2B00",
    pin: "#FF3EA5",
  },
  strength: {
    label: "strength",
    bg: "#9B5DE5",
    text: "#FFFFFF",
    pin: "#FFD23F",
  },
};

export const loveNotes: LoveNote[] = [
  { id: "n1", category: "kindness", text: "You always answer my calls." },
  { id: "n2", category: "kindness", text: "You remember things I forgot I told you." },
  { id: "n3", category: "kindness", text: "You check in even when I pretend I'm fine." },
  { id: "n4", category: "kindness", text: "You're soft about the things I'm hard about." },

  { id: "n5", category: "chaos", text: "You make ordinary days fun." },
  { id: "n6", category: "chaos", text: "You'll say yes to the dumbest plan if I ask." },
  { id: "n7", category: "chaos", text: "You text me at 2am with the worst ideas." },
  { id: "n8", category: "chaos", text: "You once made me laugh so hard I couldn't breathe." },

  { id: "n9", category: "loyalty", text: "You stayed." },
  { id: "n10", category: "loyalty", text: "You never made me explain why I was upset." },
  { id: "n11", category: "loyalty", text: "You take my side even when I'm wrong." },
  { id: "n12", category: "loyalty", text: "You'd lie under oath for me. (probably already have.)" },

  { id: "n13", category: "humor", text: "Your impressions of me are scarily accurate." },
  { id: "n14", category: "humor", text: "You laugh at your own jokes louder than anyone." },
  { id: "n15", category: "humor", text: "You have a face you only make at me." },
  { id: "n16", category: "humor", text: "Your group chat name ideas are unmatched." },

  { id: "n17", category: "strength", text: "You kept going when I couldn't." },
  { id: "n18", category: "strength", text: "You feel everything fully — and still get up." },
  { id: "n19", category: "strength", text: "You're soft and steel at the same time." },
  { id: "n20", category: "strength", text: "You don't shrink for anyone." },
];
