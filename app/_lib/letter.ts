// The letter. Decorated stationery, multi-section, intimate.
// Replace every TODO with real words. Mark phrases for emphasis with { mark: "..." }.

export type LetterSegment =
  | { type: "text"; body: string }
  | { type: "highlight"; body: string } // wavy underlined phrase in ink
  | { type: "break" }; // line break within a paragraph

export type LetterParagraph = {
  // Either a plain string OR an array of segments for inline highlighting.
  body: string | LetterSegment[];
};

export type LetterSection = {
  paragraphs: LetterParagraph[];
  // An optional pull-quote drawn from this section — appears as a large
  // handwritten flourish between paragraphs.
  pullQuote?: string;
};

export const letter = {
  envelope: {
    to: "Vicentia",
    from: "TODO: your name",
    sealInitial: "V",
  },

  greeting: "Dear Vicentia,",

  // Letter unfolds page by page. Each section can have a pull-quote.
  sections: [
    {
      pullQuote: "TODO: a single line that means everything.",
      paragraphs: [
        {
          body: [
            { type: "text", body: "TODO — start with the truth. Before I knew you, " },
            { type: "highlight", body: "I was someone slightly different" },
            { type: "text", body: ". Name one specific way you became part of who I am now. Be honest. Don't dress it up." },
          ],
        },
        {
          body:
            "TODO — write about a moment I genuinely needed you. The version of me that called you at the worst time. What you said. What you didn't say. The fact that you stayed on the line.",
        },
      ],
    },
    {
      pullQuote: "TODO: another line — even shorter, even quieter.",
      paragraphs: [
        {
          body: [
            { type: "text", body: "TODO — three things I admire about you that aren't compliments anyone else would think to give you. The way you do small things. The way you handle people who don't deserve you. " },
            { type: "highlight", body: "The thing about you nobody else sees" },
            { type: "text", body: "." },
          ],
        },
        {
          body:
            "TODO — what I want for you this year and beyond. Specific. Not generic. The dream I know you'd never say out loud. The version of yourself I already see waiting for you.",
        },
        {
          body:
            "TODO — one final line. Something only the two of us would understand. Or something so plain it lands like a punch.",
        },
      ],
    },
  ] as LetterSection[],

  signoff: "Always yours,",
  sender: "TODO: your name",
  postscript:
    "TODO: a tiny P.S. — an inside joke, a song title, or a date that means something. Keep it small.",

  // Optional clipped photo. Set to null to hide.
  clippedPhoto: {
    src: null as string | null, // e.g. "/letter/us.jpg"
    caption: "us, undated",
  },
};
