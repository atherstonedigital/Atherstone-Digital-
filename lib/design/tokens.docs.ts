// generated from docs/brand/tokens.json, do not edit.
// Merged with design/tokens.additions.json. Every token's value, source, usage note and addition status, and the type
// samples, for the /design-system page. Regenerate with `npm run tokens`; the build never reads docs/brand.

import type { ColorToken, TypeStyle } from './tokens';

/** A colour token. source is what the system writes (a hex, another token, or a mix); light and dark are resolved. */
export interface ColourDoc {
  name: ColorToken;
  light: string;
  dark: string;
  source: { light: string; dark: string };
  usage: string;
  addition: boolean;
  change?: string;
  reason?: string;
  /** The tokens.json value an approved addition replaces. */
  was?: { light: string; dark: string };
}

/** A metric-matched local fallback face. */
export interface FontFallbackDoc {
  family: string;
  name: string;
  local: readonly string[];
  sizeAdjust: string;
  ascentOverride: string;
  descentOverride: string;
  lineGapOverride: string;
  addition: boolean;
  reason: string;
}

/** A type style. addition holds what the approved additions change. */
export interface TypeDoc {
  name: TypeStyle;
  group: string;
  family: 'display' | 'sans';
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  fontStyle?: string;
  sample: string;
  usage: string;
  addition?: {
    change?: string;
    reason: string;
    steps?: readonly { minWidth: number; fontSize: string }[];
    fontVariationSettings?: string;
    fontVariantNumeric?: string;
    textTransform?: string;
  };
}

/** A spacing or radius token. */
export interface ScaleDoc {
  name: string;
  value: string;
  usage: string;
}

/** An approved layout token; value is the base, steps the widths it changes at. */
export interface LayoutDoc {
  name: string;
  value: string;
  steps?: readonly { minWidth: number; value: string }[];
  usage: string;
  reason: string;
}

export interface ZIndexDoc {
  name: string;
  value: number;
  reason: string;
}

export interface MotionDoc {
  name: string;
  value: string;
  reason: string;
}

export const brandBasis: string = "docs/brand/tokens.json version 1";

export const colourDocs: readonly ColourDoc[] = [
  {
    "name": "paper",
    "light": "#f5f6f3",
    "dark": "#0e1612",
    "source": {
      "light": "#f5f6f3",
      "dark": "#0e1612"
    },
    "usage": "Page ground. Every page starts here; it is a cool chalk, never cream.",
    "addition": false
  },
  {
    "name": "paper-raised",
    "light": "#ffffff",
    "dark": "#16211b",
    "source": {
      "light": "#ffffff",
      "dark": "#16211b"
    },
    "usage": "Forms, pull-quotes and the Health Check pricing table. Separated from paper by a rule, never a shadow.",
    "addition": false
  },
  {
    "name": "ink",
    "light": "#121b16",
    "dark": "#eceeea",
    "source": {
      "light": "#121b16",
      "dark": "#eceeea"
    },
    "usage": "All headings and body copy on paper and paper-raised. 15.9:1 on paper (light), 15.3:1 (dark).",
    "addition": false
  },
  {
    "name": "ink-muted",
    "light": "#4f5a54",
    "dark": "#a9b3ac",
    "source": {
      "light": "#4f5a54",
      "dark": "#a9b3ac"
    },
    "usage": "Eyebrows, captions, chart axes, the quieter line under a stat. 6.8:1 on paper (light), 9.1:1 (dark). Never for body copy.",
    "addition": false
  },
  {
    "name": "rule",
    "light": "#cfd4ce",
    "dark": "#2a3630",
    "source": {
      "light": "#cfd4ce",
      "dark": "#2a3630"
    },
    "usage": "The hairline. Section dividers, table rows, the line under a heading. Decorative only: it carries no meaning, so it may sit below 3:1.",
    "addition": false
  },
  {
    "name": "rule-strong",
    "light": "#78837c",
    "dark": "#8a958e",
    "source": {
      "light": "#78837c",
      "dark": "#8a958e"
    },
    "usage": "Borders that carry meaning: form fields, the secondary button outline, table header rule. 3.6:1 on paper (light), 4.6:1 (dark).",
    "addition": false
  },
  {
    "name": "green-900",
    "light": "#163a2c",
    "dark": "#7fbf9e",
    "source": {
      "light": "#163a2c",
      "dark": "#7fbf9e"
    },
    "usage": "The brand colour. Primary button fill, the wordmark on light ground, the dark band behind the contact section. Text on it uses on-green.",
    "addition": false
  },
  {
    "name": "green-700",
    "light": "#1f5c44",
    "dark": "#5fa683",
    "source": {
      "light": "#1f5c44",
      "dark": "#5fa683"
    },
    "usage": "Primary button hover and pressed. Links in body copy (7.2:1 on paper, light; 7.0:1 dark).",
    "addition": false
  },
  {
    "name": "on-green",
    "light": "#f5f6f3",
    "dark": "#0e1612",
    "source": {
      "light": "#f5f6f3",
      "dark": "#0e1612"
    },
    "usage": "Text and icons on green-900 and green-700 fills. 11.4:1 on green-900 (light), 9.6:1 (dark).",
    "addition": false
  },
  {
    "name": "brass-600",
    "light": "#8a6520",
    "dark": "#d9b45e",
    "source": {
      "light": "#8a6520",
      "dark": "#d9b45e"
    },
    "usage": "The one accent. The marker beside a figure, the active nav item, the chart series the title is about, the eyebrow on the homepage hero. 5.2:1 on paper (light), 9.3:1 (dark). Never as a button fill.",
    "addition": false
  },
  {
    "name": "brass-300",
    "light": "#e9d9ae",
    "dark": "#4a3b18",
    "source": {
      "light": "#e9d9ae",
      "dark": "#4a3b18"
    },
    "usage": "Highlight band behind a quoted figure or a key sentence; the Health Check tier the reader should pick. Text on it is ink.",
    "addition": false
  },
  {
    "name": "signal-good",
    "light": "#2f7d4f",
    "dark": "#7fd19a",
    "source": {
      "light": "#2f7d4f",
      "dark": "#7fd19a"
    },
    "usage": "Reports and charts only: a number that moved the right way. Always paired with the word or arrow that says so.",
    "addition": false
  },
  {
    "name": "signal-critical",
    "light": "#a3342b",
    "dark": "#f08a80",
    "source": {
      "light": "#a3342b",
      "dark": "#f08a80"
    },
    "usage": "Reports, charts and form errors only: a number that moved the wrong way, a field that failed. Always paired with text.",
    "addition": false
  },
  {
    "name": "focus",
    "light": "#a57825",
    "dark": "#d9b45e",
    "source": {
      "light": "#a57825",
      "dark": "#d9b45e"
    },
    "usage": "Keyboard focus ring: 2px solid, 2px offset, on every interactive element. Light: 3.64:1 on paper, 3.95:1 on paper-raised, 3.17:1 on green-900. Dark: 9.32:1 on paper, 6.32:1 on band.",
    "addition": true,
    "change": "replaces the light value",
    "reason": "The light value #b8862b measures 2.99:1 on paper, not the 3.1:1 its usage note claims, so the ring fails WCAG 1.4.11 on the page ground. #a57825 keeps the brass hue and clears 3:1 on paper, paper-raised and the green band. The dark value is unchanged.",
    "was": {
      "light": "#b8862b",
      "dark": "#d9b45e"
    }
  },
  {
    "name": "focus-on-highlight",
    "light": "#8a6520",
    "dark": "#d9b45e",
    "source": {
      "light": "brass-600",
      "dark": "focus"
    },
    "usage": "The focus ring on a control that sits on brass-300 (the highlighted Health Check card). Light: 3.79:1 on brass-300. Dark: 5.51:1 on brass-300.",
    "addition": true,
    "change": "new",
    "reason": "Found while generating Phase 2 tokens, not in the Phase 1 report. The proposed light focus measures 2.82:1 on brass-300. No single ring colour can reach 3:1 on both brass-300 and green-900 in the light theme (their luminances leave no value between), so the highlight ground needs its own ring. Phase 1 drew the light ring in brass-600 everywhere for the same reason."
  },
  {
    "name": "link-on-highlight",
    "light": "#1f5c44",
    "dark": "#eceeea",
    "source": {
      "light": "green-700",
      "dark": "ink"
    },
    "usage": "Text links on brass-300 (the Read more link on the highlighted Health Check card). Dark: ink, 9.32:1 on brass-300.",
    "addition": true,
    "change": "new",
    "reason": "Phase 1 report, section 5, link colour on the highlighted card. In the dark theme green-700 on brass-300 measures 3.77:1 and fails AA for text; ink passes. The light theme keeps green-700. A token keeps the switch out of component code."
  },
  {
    "name": "band",
    "light": "#163a2c",
    "dark": "#25382e",
    "source": {
      "light": "green-900",
      "dark": "green-900 at 20% into paper"
    },
    "usage": "The full-width contact band at the foot of each page. Text on it uses on-band.",
    "addition": true,
    "change": "new",
    "reason": "The brand book makes the contact section a green-900 band with on-green text. In the dark theme green-900 is a light mint (#7fbf9e), right for a button fill but it turns a full-bleed band into a pale slab, while tokens.json calls it the dark band. The dark value mixes green-900 20% into paper (about #25382e), so the band stays a deep green: on-band (ink) measures 10.68:1 on it and ink-muted 5.78:1."
  },
  {
    "name": "on-band",
    "light": "#f5f6f3",
    "dark": "#eceeea",
    "source": {
      "light": "on-green",
      "dark": "ink"
    },
    "usage": "Text and icons on the band. Light: on-green, 11.55:1. Dark: ink, 10.68:1.",
    "addition": true,
    "change": "new",
    "reason": "Pairs with band. on-green darkens in the dark theme for the mint button fill, which would put dark text on the deep green band; the band needs light text in both themes."
  },
  {
    "name": "rule-on-band",
    "light": "#546f64",
    "dark": "#5d6b63",
    "source": {
      "light": "on-band at 28% into band",
      "dark": "on-band at 28% into band"
    },
    "usage": "The hairline under a section heading and any divider on the band. Decorative, like rule, so it may sit below 3:1.",
    "addition": true,
    "change": "new",
    "reason": "rule is tuned for paper and vanishes on the green band. Phase 1 drew the band's hairline as on-band at 28% into the band; this makes that value a token."
  }
];

export const fontFallbackDocs: readonly FontFallbackDoc[] = [
  {
    "family": "Newsreader",
    "name": "Newsreader fallback",
    "local": [
      "Times New Roman",
      "Liberation Serif"
    ],
    "sizeAdjust": "111.5%",
    "ascentOverride": "65.9%",
    "descentOverride": "23.8%",
    "lineGapOverride": "0%",
    "addition": true,
    "reason": "The brand book asks for size-adjust so nothing shifts when the fonts load, but type.fonts in tokens.json is empty. next/font computes a fallback for Schibsted Grotesk itself, but Next 14.2.5 has no metrics for Newsreader and emits none, so every Newsreader heading would reflow on swap. These are the Phase 1 values (report section 5); in Phase 2 they measured within 0.3% of Newsreader's width and within a pixel of its ascent and descent at 100px in Chromium, where unadjusted Times is 11% narrower."
  }
];

export const typeDocs: readonly TypeDoc[] = [
  {
    "name": "display-1",
    "group": "Display",
    "family": "display",
    "fontSize": "64px",
    "lineHeight": "1.0",
    "fontWeight": 500,
    "letterSpacing": "-0.015em",
    "sample": "Your ecommerce director. Hands on, on a monthly retainer.",
    "usage": "The homepage H1 only. Newsreader at optical size 72.",
    "addition": {
      "change": "responsive size steps and the optical size",
      "reason": "tokens.json has one size per style. At 390px a 64px H1 breaks mid-phrase, and at 320 by 640 the hero only fits with a 34px step. These are the steps the Phase 1 homepage used (34px below 360px, 40px to 719px, 52px to 1023px, 64px from 1024px). The optical size 72 is stated in the display-1 usage note; it is structured here so the generator can emit it.",
      "steps": [
        {
          "minWidth": 0,
          "fontSize": "34px"
        },
        {
          "minWidth": 360,
          "fontSize": "40px"
        },
        {
          "minWidth": 720,
          "fontSize": "52px"
        },
        {
          "minWidth": 1024,
          "fontSize": "64px"
        }
      ],
      "fontVariationSettings": "\"opsz\" 72"
    }
  },
  {
    "name": "display-2",
    "group": "Display",
    "family": "display",
    "fontSize": "44px",
    "lineHeight": "1.05",
    "fontWeight": 500,
    "letterSpacing": "-0.01em",
    "sample": "An ecommerce director for your business, without the £90k hire",
    "usage": "H1 on every page except the homepage."
  },
  {
    "name": "figure",
    "group": "Display",
    "family": "display",
    "fontSize": "72px",
    "lineHeight": "1.0",
    "fontWeight": 500,
    "letterSpacing": "-0.02em",
    "sample": "16,193",
    "usage": "Proof figures and chart callouts. Tabular numerals on. Always followed by its quieter line in small.",
    "addition": {
      "change": "structured from the usage note; a larger responsive step from 1024px",
      "reason": "The figure usage note says tabular numerals on. Structured here so the generated .figure class sets them. Phase 2.7 step 2, owner's brief, 12 Nov 2026: the three figures in The numbers go to 96px at lg (1024px) and stay 72px below, so the page's type has a step between the 32px section headings and the 64px H1. tokens.json's 72px stays the base; tabular numerals and Newsreader 500 are unchanged.",
      "steps": [
        {
          "minWidth": 0,
          "fontSize": "72px"
        },
        {
          "minWidth": 1024,
          "fontSize": "96px"
        }
      ],
      "fontVariantNumeric": "tabular-nums"
    }
  },
  {
    "name": "heading-1",
    "group": "Display",
    "family": "display",
    "fontSize": "32px",
    "lineHeight": "1.15",
    "fontWeight": 500,
    "sample": "The showroom carries the business. The website should be carrying its share.",
    "usage": "Section headings (H2). Sits above a hairline rule."
  },
  {
    "name": "quote",
    "group": "Display",
    "family": "display",
    "fontSize": "24px",
    "lineHeight": "1.35",
    "fontWeight": 400,
    "fontStyle": "italic",
    "sample": "He operates with real commercial intelligence, not just technical output.",
    "usage": "Testimonial body. Italic Newsreader, never bold."
  },
  {
    "name": "heading-2",
    "group": "Text",
    "family": "sans",
    "fontSize": "22px",
    "lineHeight": "1.3",
    "fontWeight": 600,
    "sample": "Ecommerce Director",
    "usage": "H3: offer names, card titles, FAQ questions."
  },
  {
    "name": "eyebrow",
    "group": "Text",
    "family": "sans",
    "fontSize": "12px",
    "lineHeight": "1.2",
    "fontWeight": 600,
    "letterSpacing": "0.08em",
    "sample": "FOR FURNITURE AND INTERIORS RETAILERS",
    "usage": "Set in uppercase in CSS. The label above a heading, the sector tag on an article. ink-muted, or brass-600 on the homepage hero only.",
    "addition": {
      "change": "structured from the usage note",
      "reason": "The eyebrow usage note says set in uppercase in CSS, and the SectionHeading component takes sentence-case text and sets it uppercase. Structured here so the generated .eyebrow class does it.",
      "textTransform": "uppercase"
    }
  },
  {
    "name": "body-lg",
    "group": "Text",
    "family": "sans",
    "fontSize": "19px",
    "lineHeight": "1.5",
    "fontWeight": 400,
    "sample": "One senior person runs the online side of your business: the Shopify site, the catalogue and feeds, Google and Meta, email, and the Monday numbers.",
    "usage": "Hero sub-copy and the first paragraph of a page. Max 60 characters a line."
  },
  {
    "name": "body",
    "group": "Text",
    "family": "sans",
    "fontSize": "16px",
    "lineHeight": "1.55",
    "fontWeight": 400,
    "sample": "The agency built it two years ago. Now a banner change costs £180 and takes nine days.",
    "usage": "All running copy. Max 68 characters a line."
  },
  {
    "name": "small",
    "group": "Text",
    "family": "sans",
    "fontSize": "14px",
    "lineHeight": "1.5",
    "fontWeight": 400,
    "sample": "Online Store channel only, showroom till sales excluded.",
    "usage": "Captions, chart sources, the line under a figure, form help text. ink-muted."
  },
  {
    "name": "button",
    "group": "Text",
    "family": "sans",
    "fontSize": "15px",
    "lineHeight": "1.0",
    "fontWeight": 600,
    "sample": "Book a 30-minute call",
    "usage": "Button labels. Sentence case, verb first."
  }
];

export const spacingDocs: readonly ScaleDoc[] = [
  {
    "name": "space-1",
    "value": "4px",
    "usage": "Icon to label gap, hairline offsets."
  },
  {
    "name": "space-2",
    "value": "8px",
    "usage": "Between eyebrow and heading; between a figure and its line."
  },
  {
    "name": "space-3",
    "value": "12px",
    "usage": "Button vertical padding; list item gap."
  },
  {
    "name": "space-4",
    "value": "16px",
    "usage": "Card and form field padding; paragraph gap; page side gutter on mobile."
  },
  {
    "name": "space-6",
    "value": "24px",
    "usage": "Button horizontal padding; gap between cards."
  },
  {
    "name": "space-8",
    "value": "32px",
    "usage": "Between a heading block and its content."
  },
  {
    "name": "space-12",
    "value": "48px",
    "usage": "Between sections on mobile."
  },
  {
    "name": "space-16",
    "value": "64px",
    "usage": "Between sections on desktop. The cover's baseline pitch."
  },
  {
    "name": "space-24",
    "value": "96px",
    "usage": "Above and below the hero."
  },
  {
    "name": "measure",
    "value": "68ch",
    "usage": "Maximum width of a column of body copy."
  },
  {
    "name": "container",
    "value": "1200px",
    "usage": "Maximum page width, with space-4 gutters at 390px rising to space-8 at 1200px."
  }
];

export const radiusDocs: readonly ScaleDoc[] = [
  {
    "name": "radius-0",
    "value": "0px",
    "usage": "Cards, tables, images, bands, the cover blocks. The default: this is a square system."
  },
  {
    "name": "radius-sm",
    "value": "2px",
    "usage": "Form fields and the secondary button outline."
  },
  {
    "name": "radius-md",
    "value": "4px",
    "usage": "Primary button, the monogram favicon. Nothing rounder exists."
  }
];

export const layoutDocs: readonly LayoutDoc[] = [
  {
    "name": "nav-height",
    "value": "64px",
    "usage": "Height of the fixed site nav. The body (or the page wrapper) is padded by it and scroll-padding-top uses it, so the nav never covers the first section or a focused control.",
    "reason": "The brand book fixes the nav and pads the body by its height but gives no height. Phase 1 used 64px (space-16) at every width."
  },
  {
    "name": "gutter",
    "value": "16px",
    "steps": [
      {
        "minWidth": 0,
        "value": "16px"
      },
      {
        "minWidth": 720,
        "value": "24px"
      },
      {
        "minWidth": 1200,
        "value": "32px"
      }
    ],
    "usage": "Page side gutter outside the container, and the column gap of the 12-column grid.",
    "reason": "Phase 1 report, section 5, layout tokens. The brand book gives space-4 on mobile and space-8 on desktop; Phase 1 needed a 24px step from 720px to 1199px so tablets do not run on phone gutters. Not in the Phase 2 task's list; proposed because every page container needs it."
  },
  {
    "name": "measure-lg",
    "value": "60ch",
    "usage": "Maximum width of body-lg copy: the hero sub-copy and the first paragraph of a page.",
    "reason": "The brand book sets body-lg at 60ch and the body-lg usage note says max 60 characters a line, but tokens.json only defines measure (68ch). Not in the Phase 2 task's list; proposed so components do not write 60ch by hand."
  },
  {
    "name": "touch-target",
    "value": "44px",
    "usage": "Minimum height (and width for icon-only controls) of every interactive element on touch screens.",
    "reason": "The brand book requires 44px touch targets and the Button and Forms specs set a 44px minimum height, but no token holds the number. Not in the Phase 2 task's list; proposed so buttons, fields, nav links and the drawer controls share one value."
  },
  {
    "name": "sheet-width",
    "value": "420px",
    "usage": "Maximum width of the mobile nav drawer (the Sheet). Below it the drawer is full width.",
    "reason": "Phase 1's drawer width, kept by the Phase 2 navigation group. The brand book puts the drawer on paper-raised with a rule edge but gives it no width."
  }
];

export const zIndexDocs: readonly ZIndexDoc[] = [
  {
    "name": "content",
    "value": 0,
    "reason": "Page content. Part of the z-index scale from the Phase 1 report (the ui-ux-pro-max rule: one token scale, never z-[9999]); the brand defines none."
  },
  {
    "name": "nav",
    "value": 40,
    "reason": "The fixed site nav sits above content. Part of the same scale."
  },
  {
    "name": "dropdown",
    "value": 50,
    "reason": "The Services and Sectors dropdown panels open over the nav's neighbours. Part of the same scale."
  },
  {
    "name": "sheet-overlay",
    "value": 90,
    "reason": "The scrim behind the mobile nav sheet. Part of the same scale."
  },
  {
    "name": "sheet",
    "value": 100,
    "reason": "The mobile nav sheet itself. Part of the same scale."
  },
  {
    "name": "skip-link",
    "value": 1000,
    "reason": "The skip link must stay above everything, including an open sheet. Part of the same scale."
  }
];

export const motionDocs: readonly MotionDoc[] = [
  {
    "name": "duration-colour",
    "value": "150ms",
    "reason": "Brand book, Motion: transitions on colour and underline thickness run 150ms, ease-out. Made a token so CSS and GSAP share it."
  },
  {
    "name": "duration-press",
    "value": "80ms",
    "reason": "Brand book, Motion: buttons scale to 0.98 on pointer-down over 80ms. Made a token so CSS and GSAP share it."
  },
  {
    "name": "duration-drawer",
    "value": "320ms",
    "reason": "Brand book, Motion: drawers and accordions settle over 300 to 350ms. Phase 1 used 320ms for the drawer."
  },
  {
    "name": "ease-drawer",
    "value": "cubic-bezier(0.2, 0.8, 0.2, 1)",
    "reason": "The curve the Phase 1 drawer used: it settles without overshoot, as the brand book asks of the drawer spring (no more than 2px). Used by the CSS fallback and the reduced-motion path. Not in the Phase 2 task's list; proposed with the durations."
  }
];
