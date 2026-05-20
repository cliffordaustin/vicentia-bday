// The letter. Decorated stationery, multi-section, intimate.

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
  // An optional pull-quote drawn from this section - appears as a large
  // handwritten flourish between paragraphs.
  pullQuote?: string;
};

export const letter = {
  envelope: {
    to: "Vicentia",
    from: "Constance",
    sealInitial: "V",
  },

  greeting: "Dear Vicentia,",

  sections: [
    {
      paragraphs: [
        {
          body: [
            { type: "text", body: "Before I knew you, " },
            { type: "highlight", body: "I barely knew myself" },
            { type: "text", body: ". You can't fully tell who Constance is without including Vicentia — that's how " },
            { type: "highlight", body: "you've become a part of me" },
            { type: "text", body: ". ♡" },
          ],
        },
      ],
    },
    {
      pullQuote: "you have no idea.",
      paragraphs: [
        {
          body:
            "I remember all the times you stepped up and showed up for me — carrying my problems on your head like they were yours. Like how you fought for me to come with you to Opass.",
        },
        {
          body:
            "I remember all the times I'd mess up and tell you about it, and you'd find a way for me to come out of it.",
        },
        {
          body:
            "I remember the times you trusted me with your deepest secrets and your tears — how you let me in, in the good times and the bad.",
        },
        {
          body: [
            { type: "text", body: "It means the world to me. " },
            { type: "highlight", body: "You have no idea." },
          ],
        },
      ],
    },
    {
      pullQuote: "the way you do small things.",
      paragraphs: [
        {
          body:
            "Three things I admire about you — things no one else would think to give as compliments:",
        },
        {
          body: [
            { type: "text", body: "The way you handle people who don't deserve you. The way you do " },
            { type: "highlight", body: "small things — like stacking your morning coats on top of each other on a hanger" },
            { type: "text", body: ". The way you update everyone close to you with your experiences." },
          ],
        },
      ],
    },
    {
      pullQuote: "butterflies and excitingly unrealistic moments.",
      paragraphs: [
        {
          body: "What I want for you this year and beyond:",
        },
        {
          body: "I wish you acquire that property you're praying for.",
        },
        {
          body: [
            { type: "text", body: "I wish to see you " },
            { type: "highlight", body: "genuinely and unapologetically loved on" },
            { type: "text", body: "." },
          ],
        },
        {
          body:
            "I wish to see Valenshire become the new “Mr Price.” The new “Maestro.”",
        },
        {
          body:
            "And I would love to hear about the new spaces you'll be entering this year — the ones with butterflies and excitingly unrealistic moments.",
        },
      ],
    },
    {
      paragraphs: [
        {
          body: [
            { type: "highlight", body: "The whole world is this very moment, today" },
            { type: "text", body: " — enjoy it completely." },
          ],
        },
      ],
    },
  ] as LetterSection[],

  signoff: "Always yours,",
  sender: "Constance",
  postscript: "",

  // Optional clipped photo. Set to null to hide.
  clippedPhoto: null as { src: string | null; caption: string } | null,
};
