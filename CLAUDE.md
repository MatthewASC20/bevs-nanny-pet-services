# Bev's Nanny & Pet Services — project context

This folder is a small personal-brand package for **Beverly de Jesus** ("Granny Bev"),
a nanny and pet-care professional in New York City. The work was started in a Claude.ai
chat and is being continued here. This file is the hand-off brief.

## Beverly's details (used across all assets)
- Name: Beverly de Jesus  ·  business name: **Bev's Nanny & Pet Services**
- Phone: +1 (917) 346-2847   ·   tel: `+19173462847`
- Email: bevdejesus@gmail.com
- Location: Bronx, NY — available across NYC (has also traveled, NY & London)
- 30+ years of experience, CPR certified, newborn-to-toddler + pets

## Files in this repo
- `index.html` — the single-page website (HTML/CSS, inline SVG, Google Fonts via <link>). **Primary deliverable.** The page is now **data-driven**: a small inline script reads `content.json` and renders every section from it.
- `content.json` — most editable content (text, services, experience, skills, testimonial, contact). Edit this, not the HTML.
- `children.json` / `pets.json` — the Children and Pets sections, split into their own files.
- `assets/<card-folder>/` — photos for each pet/child card (one folder per card; see `assets/README.md`).
- `EDITING.md` — plain-English guide for Beverly to add/remove items across the JSON files (incl. the icon-name list).
- `README.md`, `.gitignore` — repo overview and ignore rules.

Other assets from the original package (logo-concepts HTML, LaTeX résumé, reference letter, passport scans) are intentionally **not** in this repo — passports are private PII; the rest can be added later if wanted.

## Content architecture (how the page is built)
- `index.html` contains the full design (CSS) plus structural section shells with empty containers (`#heroGrid`, `#servicesGrid`, `#timeline`, `#childrenGrid`, `#petsGrid`, `#skillsGrid`, `#testimonialWrap`, `#contactGrid`, `#footerTop`, `#brandText`, …). An IIFE at the bottom `fetch`es **content.json + children.json + pets.json** in parallel (`fetchJson`), merges children/pets onto the content object, and fills the containers.
- **Showcase cards + carousel:** pets and children share one card/lightbox system — `photoCard()` builds `.show-card`s, `photoPaths(folder, photos)` resolves `assets/<folder>/<file>`, and `openLightbox()`/`galleries` (keyed `pet-N`/`kid-N`) drive the carousel (arrows/dots/keys/swipe, focus-trap, Esc). A child with no photos renders as an icon-tile `.kid-card` (privacy default); add a photo and that card becomes a clickable photo card.
- **Icons** are a named registry in the script (`ICONS`), referenced by name from `content.json` (`"icon": "paw"`); unknown names fall back to a dot. To add an icon, add it to `ICONS` and list it in `EDITING.md`.
- **Highlights**: `[[text]]` and `((text))` markers in the hero `headline` (→ `leaf-word` / `paw-word`) and testimonial `quote` (`[[text]]` → `hl`) become coloured spans. All other text is HTML-escaped (`esc()`), so apostrophes/`&` are safe to type plainly.
- **`file://` caveat:** opening `index.html` directly won't load `content.json` (browser blocks `fetch` on `file://`); a friendly banner explains this. Serve over HTTP (`python3 -m http.server`) or host it — both work. If you ever need a no-server single file again, inline the JSON into a `<script type="application/json">` block.
- If the design markup changes, keep the renderer's output in sync with the CSS (e.g. `.svc:nth-child(...)` icon tints rely on card order; service/contact icons get `stroke-width:1.8` via CSS while chips/timeline stay at `2`).

## Design system (keep consistent everywhere)
- Colors: green `#3C7D5A`, deep green `#2C5E43`, honey `#F2B33D`, deep honey `#CF8E12`,
  ink `#21302A`, body `#4C544C`, cream `#FBF4E4`, page bg `#F1F4EC`, blush `#E08A84`.
- Fonts: **Baloo 2** (display/headings) + **Nunito Sans** (body), via Google Fonts.
- Voice: warm, personal, trustworthy; theme nods to parks/flowers ("stop to smell the flowers").
- Accessibility/quality bar: responsive, visible focus states, respects `prefers-reduced-motion`.

## Current logo — DONE
The site uses **logo option #3, the "B" monogram**: a green rounded-square badge with a
cream "B" and a small honey heart accent. It is already applied in all three places —
the nav brand mark, the footer brand mark, and the browser-tab **favicon** — and the
website file is current. No logo work is outstanding.

The "B" is drawn as a **font-independent vector path** (favicons can't load page fonts),
so it stays crisp from 16px up. The mark used in the nav/footer (`class="mark"`, sized by CSS):

```html
<svg class="mark" viewBox="0 0 64 64" aria-hidden="true">
  <rect x="2" y="2" width="60" height="60" rx="17" fill="#3C7D5A"/>
  <path d="M22 18V46M22 18H34a7 7 0 0 1 0 14H22M22 32H35a7 7 0 0 1 0 14H22"
        fill="none" stroke="#FBF4E4" stroke-width="5.5" stroke-linecap="round" stroke-linejoin="round"/>
  <g transform="translate(41,10) scale(0.32)" fill="#F2B33D">
    <path d="M16 29C16 29 3 20 3 11C3 6 7 3 11 3C14 3 16 6 16 7C16 6 18 3 21 3C25 3 29 6 29 11C29 20 16 29 16 29Z"/>
  </g>
</svg>
```

The favicon is the same mark embedded in `<head>` as an inline SVG data URI
(`<link rel="icon" type="image/svg+xml" href="data:image/svg+xml;base64,…">`, with
`xmlns="http://www.w3.org/2000/svg"` on the root `<svg>`). If you change the logo, update all
three spots to keep them in sync.

## Possible next steps (optional)
- Export the chosen logo as a standalone `.svg` and a transparent `.png` (e.g. 512px) for
  business cards / social profiles.
- Swap the hero avatar placeholder ("add your photo here") for a real photo of Beverly.
- Make the contact form actually deliver messages (e.g. Formspree) instead of opening mailto.
- Decide on paper size: the résumé is A4, the reference letter is US Letter — optionally unify.

## Decisions to preserve
- Do NOT publish other references' phone numbers on the public website (privacy). The site
  features the Venkatesan testimonial (written to be shared) + "references available on request".
- Résumé stays to a single page.
