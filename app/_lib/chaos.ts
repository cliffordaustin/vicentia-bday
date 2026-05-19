// Chaos & Funny Moments. Bring the receipts.
// TODO: replace placeholders with real stories, photos, and texts.

export type ChaosEntry = {
  id: string;
  title: string;
  oneLiner: string; // shown by default
  story: string; // shown when expanded
};

export const topChaos: ChaosEntry[] = [
  {
    id: "c1",
    title: "TODO: The Worst Idea We Ever Followed Through On",
    oneLiner: "It involved a 2am drive, questionable judgment, and at least one tear.",
    story:
      "TODO - the full unhinged story. Where it started, who suggested it, what we promised never to tell anyone. The fact that you're reading this means the statute of limitations is over.",
  },
  {
    id: "c2",
    title: "TODO: The Time We Almost Got Banned From [Place]",
    oneLiner: "We didn't even mean to. That's what makes it worse.",
    story:
      "TODO - set the scene, describe the escalation, end on the line one of us said to the other while running away.",
  },
  {
    id: "c3",
    title: "TODO: The Outfit Decision History Will Not Forgive",
    oneLiner: "Both of us. At the same time. By choice.",
    story:
      "TODO - what we were wearing, what we thought it said about us, what it actually said. The photo evidence is below.",
  },
  {
    id: "c4",
    title: "TODO: The Group Chat Incident",
    oneLiner: "Wrong chat. Right message. Catastrophic results.",
    story: "TODO - name the chat, the message, the silence that followed.",
  },
  {
    id: "c5",
    title: "TODO: The Phase",
    oneLiner: "We pretend it didn't happen. It happened.",
    story:
      "TODO - what we were obsessed with. What we made each other do. The aesthetic. The shame. The fondness, eventually.",
  },
  {
    id: "c6",
    title: "TODO: The Argument About Something So Stupid",
    oneLiner: "I still think I was right.",
    story: "TODO - what the fight was about, who won (it was me).",
  },
  {
    id: "c7",
    title: "TODO: The Crush We Both Hated In Hindsight",
    oneLiner: "You knew. I knew. We both pretended we didn't know.",
    story:
      "TODO - initials only, please. The signs we ignored. The vindication when it finally fell apart.",
  },
  {
    id: "c8",
    title: "TODO: The Night Nobody Believes Actually Happened",
    oneLiner: "There's no photo. There's no video. There's just us.",
    story: "TODO - keep it cryptic. We know.",
  },
  {
    id: "c9",
    title: "TODO: The Time We Cried Laughing In Public",
    oneLiner: "People stared. We couldn't stop. The waiter gave up.",
    story:
      "TODO - what set us off, why we couldn't recover, the look the manager gave us.",
  },
  {
    id: "c10",
    title: "TODO: The Pact",
    oneLiner: "We swore on something. We may have meant it.",
    story:
      "TODO - what we promised each other we'd do by 30, and how that's going.",
  },
];

export type ChaosPhoto = {
  id: string;
  src: string | null;
  caption: string;
  stamp?: string; // tag like "VERIFIED CHAOS"
};

export const chaosPhotos: ChaosPhoto[] = [
  { id: "p1", src: null, caption: "the outfit era", stamp: "VERIFIED CHAOS" },
  { id: "p2", src: null, caption: "we look unwell", stamp: "NO REGRETS" },
  { id: "p3", src: null, caption: "what were we doing", stamp: "EXHIBIT A" },
  { id: "p4", src: null, caption: "this still makes me laugh", stamp: "CLASSIC" },
];

export type ChatMessage = { from: "me" | "her"; text: string };

export type ChaosChat = {
  id: string;
  title: string;
  messages: ChatMessage[];
};

export const chaosChats: ChaosChat[] = [
  {
    id: "ch1",
    title: "TODO: title this chat",
    messages: [
      { from: "her", text: "you up?" },
      { from: "me", text: "it's 3pm" },
      { from: "her", text: "ok but spiritually" },
      { from: "me", text: "...no" },
      { from: "her", text: "perfect. get in the car." },
    ],
  },
  {
    id: "ch2",
    title: "TODO: the worst suggestion",
    messages: [
      { from: "me", text: "I have an idea" },
      { from: "her", text: "no" },
      { from: "me", text: "you don't even know what it is" },
      { from: "her", text: "I know YOU. no." },
      { from: "me", text: "fine. so meet me at 8?" },
      { from: "her", text: "yeah" },
    ],
  },
];

export const honorableQuotes = [
  // TODO: dumbest things said, kept verbatim
  "this is fine but also nothing is fine",
  "we'll figure it out in the car",
  "okay BUT what if",
  "I will not be taking questions at this time",
  "we don't talk about that night",
  "I would die for you but I will not split this bill",
];
