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
- `og-image.jpg` — the 1200×630 link-preview card. Generated from `tools/og-image.html`
  (open that file at 1200×630 and screenshot it; it links the real brand fonts).
- `apple-touch-icon.png` — 180×180 iOS home-screen icon.
- `robots.txt` — crawler rules. Add the `Sitemap:` line once the domain is settled.
- `README.md`, `.gitignore`, `.vercelignore` — repo overview and ignore rules.

Other assets from the original package (logo-concepts HTML, LaTeX résumé, reference letter, passport scans) are intentionally **not** in this repo — passports are private PII; the rest can be added later if wanted.

## Content architecture (how the page is built)
- `index.html` contains the full design (CSS) plus structural section shells with empty containers (`#heroGrid`, `#servicesGrid`, `#timeline`, `#childrenGrid`, `#petsGrid`, `#skillsGrid`, `#testimonialWrap`, `#contactGrid`, `#footerTop`, `#brandText`, …). An IIFE at the bottom `fetch`es **content.json + children.json + pets.json** in parallel (`fetchJson`), merges children/pets onto the content object, and fills the containers.
- **Showcase cards + carousel:** pets and children share one card/lightbox system — `photoCard()` builds `.show-card`s, `photoPaths(folder, photos)` resolves `assets/<folder>/<file>`, and `openLightbox()`/`galleries` (keyed `pet-N`/`kid-N`) drive the carousel (arrows/dots/keys/swipe, focus-trap, Esc). A child with no photos renders as an icon-tile `.kid-card` (privacy default); add a photo and that card becomes a clickable photo card.
- **Payments:** the `"payment"` block in content.json holds a Stripe **Payment Link** URL; `renderPayment()` shows the `#pay` "Pay securely" section (before Contact) only when `url` is a valid `http(s)` link, otherwise hides the section. No secret keys, no backend — Stripe hosts the checkout. Bev makes a "customer chooses amount" Payment Link and pastes the URL.
- **Icons** are a named registry in the script (`ICONS`), referenced by name from `content.json` (`"icon": "paw"`); unknown names fall back to a dot. To add an icon, add it to `ICONS` and list it in `EDITING.md`.
- **Highlights**: `[[text]]` and `((text))` markers in the hero `headline` (→ `leaf-word` / `paw-word`) and testimonial `quote` (`[[text]]` → `hl`) become coloured spans. All other text is HTML-escaped (`esc()`), so apostrophes/`&` are safe to type plainly.
- **Failure isolation:** each JSON file is fetched with its own `.catch()`, and each section
  renders inside its own `try`. A typo in `pets.json` costs *that section only* — the hero,
  phone number and contact form still render, and `#loadError` names what broke. Never
  reintroduce a single `Promise.all` rejection path or a single `try` around all of `render()`.
- **Empty sections hide themselves** (`hideIfEmpty`), like `renderPayment` already did. `pets.json`
  ships `"items": []` with the old placeholders parked under `"exampleItems"` (ignored by the renderer).
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

The nav and footer copies now come from a single `MARK` constant in the script. The **favicon is
still a separate static copy** (a data URI in `<head>`) because it must exist before JavaScript
runs — so if the logo ever changes, regenerate it from `MARK`:

```sh
python3 -c "import base64,sys; print('data:image/svg+xml;base64,'+base64.b64encode(open('mark.svg','rb').read()).decode())"
```

(the favicon's root `<svg>` needs `xmlns="http://www.w3.org/2000/svg"`, which the inline one omits).

## Already done (do not redo)
- **Hero portrait**: `bev-portrait.jpg` (600×600) is wired up via `content.json` → `hero.portrait.photo`.
- **Contact form**: delivers live through **Web3Forms** (`contact.form.accessKey` in content.json).
  Do *not* swap this for Formspree — it works.
- **Payments**: a live Stripe Payment Link is in `content.json` → `payment.url`.

## Possible next steps (optional)
- **Needs the live domain** (the only outstanding SEO work): add `<link rel="canonical">`,
  an absolute `og:url`, absolute `og:image`/JSON-LD `image` URLs, and a `sitemap.xml`
  (plus the `Sitemap:` line in `robots.txt`). Everything else is already in `<head>`.
- Export the logo as a standalone `.svg` / transparent `.png` for business cards and social profiles.
- Decide on paper size: the résumé is A4, the reference letter is US Letter — optionally unify.
- **Privacy question for Beverly**: the Experience timeline publishes four past employers' full
  names. Only the Venkatesan entry has consent (their testimonial was written to be shared).
  Either record consent for the others in this file, or de-identify them the way
  `children.json` already does ("a family on the Upper West Side").
- Consider splitting the inline `<style>`/`<script>` into `styles.css` / `site.js` so they
  cache independently of the content. Deliberately not done yet — it keeps the no-build setup.

## Decisions to preserve
- Do NOT publish other references' phone numbers on the public website (privacy). The site
  features the Venkatesan testimonial (written to be shared) + "references available on request".
- Résumé stays to a single page.
