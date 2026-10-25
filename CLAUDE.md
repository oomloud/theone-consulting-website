# THEONE Consulting — website brief

Marketing site for THEONE Consulting, the operations and leadership consultancy founded by Nataliya (Bratislava). Read this file before any design or code change. These rules exist so the site does not look like a generic AI-built page.

## Goal
One long scrolling page that makes a founder or CEO think "this is a senior operator who will fix my chaos", and then book a call.

- Primary action: **Book a call** (Cal.com embed, styled in brand colours).
- Secondary actions: email and LinkedIn.

## Stack
- **Astro** for a static site, with content in Markdown files under `src/content/`. Every text edit is a content edit, not a component edit.
- **GSAP + ScrollTrigger** for scroll animation, and **Lenis** for smooth scrolling.
- Hosting on **Vercel** (free tier), auto-deployed from GitHub.
- Analytics: cookieless only (Vercel Analytics or Plausible). No cookie banner.
- Languages: English at launch. Build with Astro i18n routing ready so `/sk/` can be added later without restructuring.
- Structure: a single page now. Keep sections as components so they can become separate pages later (Services, About, case studies).

## Brand tokens

### Colours
| Token | Hex | Use |
|---|---|---|
| `--paper` | `#FFFFFF` | Default page background (near-white with a faint grain overlay) |
| `--ink` | `#471827` | Burgundy. All body text and headlines on white, rules, logo |
| `--accent` | `#C66748` | Terracotta. Second line of headlines, numerals, the swash line, links |
| `--olive` | `#48481D` | Full-bleed colour-block sections |
| `--sand` | `#E1CDB4` | Text and ornaments on dark blocks only. **Never a background.** |
| `--grey` | `#2D2D2D` | Logo default fill only |

- Colour blocks are burgundy or olive. Use 2–3 per page: pain points, Ways We Work, and the closing CTA.
- On dark blocks, text is `--sand` and accents are `--accent`.

### Typography
- **Mileast** (licensed display serif, from the logo) for headlines and numerals. Self-host as `.woff2`.
  - Check the license covers web use before deploying.
- **Montserrat** (Google Fonts, self-hosted) for:
  - Body: 400 weight, 17–18px, line-height 1.65.
  - Labels and navigation: uppercase, 500 weight, letter-spacing 0.25em, as in the logo's "CONSULTING".
- Headline scale: `clamp(2.75rem, 7vw, 6.5rem)`, tight leading (1.0–1.05).
- **Two-line headline pattern:** line 1 in `--ink`, line 2 in `--accent`.

### Logo
- SVGs live in `src/brand/` (inlined via `Logo.astro`, using `currentColor`) and copies in `public/brand/`.
- The swash "O" is its own SVG: `src/brand/o-swash.svg`.

## Signature elements (the things that make it ours)
1. **The swash line.** A single thin terracotta line based on the logo's "O" stroke.
   - It draws itself (stroke-dashoffset) as the visitor scrolls, connecting the hero to the pain points, and How We Work to the CTA.
   - It is also hand-circled around one key word per section.
   - Only one line is visible at a time.
2. **Big numerals.** Mileast numerals in `--accent` for 01–04 (pain points), 01–03 (process) and 01–06 (services), at about 5× body size.
3. **Thin-line grid.** 1px `--ink` rules at 15% opacity, framing stats and service cards like a ledger.
4. **Swash watermark.** An oversized "O" at 6–8% opacity behind the About photo and the CTA.
5. **Grain.** A barely visible SVG `feTurbulence` noise layer over the white background, opacity ≤ 0.04.
6. **Photo treatment.** All photos get the same warm grade (CSS filter or pre-processed), so the cool and warm shots read as one set.
   - Crops are tall, at 4:5 ratio, with a thin offset frame.

## Motion rules
- **Considered, not expressive.** At most one signature motion per section.
- Allowed:
  - Line draw.
  - Staggered headline reveal (lines slide up from a mask).
  - Slight photo parallax (≤ 8%).
  - Numeral count-up on stats.
  - Card hover: lift 4px and swap the line drawing to accent colour.
- Respect `prefers-reduced-motion`: all of the above become instant.
- No scroll-jacking, no horizontal scroll sections, no cursor followers, no page loaders.

## Never do this (AI-site tells)
- Cream or beige page background, purple or blue gradients, glassmorphism.
- Inter, Roboto, Arial, Playfair, Fraunces, Instrument Serif, Cormorant.
- Centered hero with two pill buttons. Rounded cards with drop shadows in a 3×3 grid.
- Emoji as icons. The 🎯📋⚡🤝 in the source copy are dropped and replaced with numerals or line drawings.
- Generic stock photography. Only Nataliya's photos and our own line drawings.
- "Trusted by" above employer logos (see Experience strip).

## Page map (content source: `src/content/*.md`, one file per section)
1. **Nav:** horizontal-short logo, anchor links (Services, How we work, About), and a "Book a call" button.
2. **Hero:**
   - Headline "We are THE ONE who turns your vision into execution." — one sentence, no forced break; "who turns…" in accent.
   - The supporting line beneath it.
   - The studio portrait to the right in a 4:5 frame.
   - The swash line starts here.
3. **Experience strip:**
   - Labelled "Experience from".
   - Logos: Allianz Business Services, IQVIA, Vacuumlabs, Staffino, Crowdberry.
   - One colour (`--ink` at 60%), never "Clients" or "Trusted by".
4. **Pain points:**
   - Burgundy block, four numbered items 01–04, headline line 2 in `--accent`.
   - Phrased in the founder's voice.
5. **How we work:** Discover, Design, Deliver as three columns joined by the swash line.
6. **Ways we can work together:**
   - Olive block, four rows: One-off, Fixed-term project, Part-time, Long-term partnership.
   - Each row has a "Best for" line.
7. **Services:**
   - Two groups (Operations & Delivery, Leadership & Advisory), six thin-line ledger cards with a numeral, title, one-liner, "For", and a link.
8. **About:**
   - "Hi, I'm Nataliya." with a candid photo.
   - Four pillars (clarity, communication, accountability, process) as a typographic row.
   - Full copy: four paragraphs and the "What I bring" list. Compact copy: two paragraphs and stats in thin-line boxes.
9. **CTA:**
   - Burgundy block: "Let's turn your vision / into execution."
   - Cal.com embed or button, plus email and LinkedIn links.
10. **Footer:**
    - Box logo, company name, IČO, registered address (Bratislava), legal links, © year.

## Copy versions
- `copy: full | compact` in `src/content/site.md`. **Full is Nataliya's original text and is the default.**
- Preview pages while she chooses: `/` (full), `/compact`, `/expandable` ("Interactive": pain points and Ways as accordions, services as cards that open a side drawer, About with one "full story" button; all with Nataliya's full text). A corner switch (`VersionSwitch.astro`, `showVersionSwitch` in `site.md`) jumps between them. Preview pages are `noindex`; delete `src/pages/compact.astro` and `expandable.astro` and turn the switch off before launch.
- Long text goes through `Text.astro`, which handles all three modes.
- Any field can have a `…Compact` twin (e.g. `body` / `bodyCompact`); `pick()` in `src/lib/content.ts` chooses.
- Never shorten or rewrite her copy in the full version without asking.

## Content gaps to fill before launch
- Real years of experience (the copy says "10+", to be confirmed).
- Whether "a growing team of senior consultants" is true today. If not, remove it.
- IČO, registered address, contact email, LinkedIn URL, Cal.com link.
- Domain (candidates: theoneconsulting.sk, theone-consulting.com).
- Mileast webfont license confirmation (headlines use Gloock until then; see top of `global.css`).
- Company logo files for the Experience strip (`public/logos/`, then set `logo:` in `experience.md`).
- Privacy policy and legal notice text (`src/pages/privacy.astro`, `legal.astro`).

## Workflow
- Install Anthropic's `frontend-design` plugin. This file overrides its generic suggestions wherever they conflict.
- Animation code is lazy-loaded after first paint (`motion.ts` → `motion-core.ts`); keep it that way to protect performance.
- After every visual change, use Playwright MCP to screenshot the page at 390px, 768px and 1440px and compare against this brief before calling the work done.
- Lighthouse targets: Performance ≥ 95, Accessibility 100. Text contrast must pass WCAG AA (check terracotta on white: use it for large type only).
