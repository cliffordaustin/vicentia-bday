// Birthday wishes & future chapter data.
// Edit freely - types keep everything in sync.

export type Wish = { id: string; text: string };

export type BucketItem = {
  id: string;
  title: string;
  detail: string;
  emoji: string;
  done?: boolean;
};

export type CakeCandle = { id: string };

export const wishes: Wish[] = [
  {
    id: "w1",
    text: "May your year feel softer than the last - kinder mornings, lighter shoulders.",
  },
  {
    id: "w2",
    text: "May you keep saying yes to the dumb plans and no to the people who don't deserve you.",
  },
  {
    id: "w3",
    text: "May every room you walk into be a little brighter, and may you know it.",
  },
  {
    id: "w4",
    text: "May you build the life you keep sketching when you think nobody's watching.",
  },
  {
    id: "w5",
    text: "May the people you love love you out loud, the way you deserve.",
  },
  {
    id: "w6",
    text: "May you laugh until you can't breathe, at least once a week, for the rest of your life.",
  },
];

export const bucketList: BucketItem[] = [
  {
    id: "b1",
    emoji: "✈️",
    title: "A trip - somewhere we've never been",
    detail: "No itinerary, just vibes and a return flight.",
  },
  {
    id: "b2",
    emoji: "🎤",
    title: "Karaoke night",
    detail: "Two mics. Zero shame. One iconic group photo.",
  },
  {
    id: "b3",
    emoji: "🍝",
    title: "Cook something neither of us can pronounce",
    detail: "Bonus points if the kitchen survives.",
  },
  {
    id: "b5",
    emoji: "📸",
    title: "Take a proper, framed photo together",
    detail: "Not a selfie. A real one. For the wall.",
  },
  {
    id: "b6",
    emoji: "🌅",
    title: "Watch a sunrise without sleeping first",
    detail: "Just because we can.",
  },
  {
    id: "b7",
    emoji: "💌",
    title: "Write each other a letter every birthday",
    detail: "Starting today. Don't open early.",
  },
  {
    id: "b8",
    emoji: "🎙️",
    title: "Start that podcast",
    detail: "Even if it's not now - eventually.",
  },
  {
    id: "b9",
    emoji: "🎬",
    title: "Do that movie night",
    detail: "Preferably a themed one.",
  },
];

// Candles on the cake. Click each to light it. Blow them all out, make a wish.
// The wish itself is hers - we don't get to know it.
export const candles: CakeCandle[] = [
  { id: "c1" },
  { id: "c2" },
  { id: "c3" },
  { id: "c4" },
  { id: "c5" },
];
