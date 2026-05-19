// Sticky notes for "Things I Love About You".
// Add as many as you want - the board scales. Pick a category for color.
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
    label: "strengths",
    bg: "#9B5DE5",
    text: "#FFFFFF",
    pin: "#FFD23F",
  },
};

export const loveNotes: LoveNote[] = [
  { id: "n1", category: "kindness", text: "You care about people around you like you care about yourself." },
  { id: "n2", category: "kindness", text: "You always want to get something for everyone you know - whether they deserve it or not 😒" },
  { id: "n3", category: "kindness", text: "You go all out for the people you love." },
  { id: "n4", category: "kindness", text: "You remember things I forgot I told you." },

  { id: "n5", category: "chaos", text: "Has been going to the gym for about 3 years now - in your dreams obviously." },
  { id: "n6", category: "chaos", text: "Our podcast has some of the highest views on record - 🫩 would have been nice." },
  { id: "n7", category: "chaos", text: "You share experiences so detailed, sometimes it's sooo cringe." },
  { id: "n8", category: "chaos", text: "Walking around the house naked might be your favourite sport." },
  { id: "n9", category: "chaos", text: "You'll say yes to the dumbest plan to get back at someone if I asked." },

  { id: "n10", category: "loyalty", text: "You always take my side even when I'm wrong." },
  { id: "n11", category: "loyalty", text: "You'll lie under oath for me (probably already have)." },
  { id: "n12", category: "loyalty", text: "You stayed." },
  { id: "n13", category: "loyalty", text: "You never made me feel judged." },
  { id: "n14", category: "loyalty", text: "You were always patient enough to allow me to process whatever I was dealing with before opening up." },

  { id: "n15", category: "humor", text: "You say the funniest things in your narrations." },
  { id: "n16", category: "humor", text: "You have some of the silliest ideas ever." },

  { id: "n17", category: "strength", text: "You're soft and steel at the same time." },
  { id: "n18", category: "strength", text: "You are one of the most strong-willed people I know." },
  { id: "n19", category: "strength", text: "You have a way of absorbing pain and turning it into strength." },
  { id: "n20", category: "strength", text: "When you set your mind and heart on something, you see it through." },
];
