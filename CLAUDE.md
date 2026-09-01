# Bev's Nanny & Pet Services — project context

This folder is a small personal-brand package for **Beverly de Jesus** ("Granny Bev"),
a nanny and pet-care professional in New York City. The work was started in a Claude.ai
chat and is being continued here. This file is the hand-off brief.

## Beverly's details (used across all assets)
- Name: Beverly de Jesus  ·  business name: **Bev's Nanny & Pet Services**
- Phone: +1 (917) 346-2847   ·   tel: `+19173462847`
- Email: **grannybev.nyc@gmail.com** (business address — this is the one to publish)
- Website: **grannybev.nyc** — the live custom domain; use it on every asset alongside the email
- Location: Bronx, NY — available across NYC (has also traveled, NY & London)
- 30+ years of experience, CPR certified, newborn-to-toddler + pets

## Files in this repo
- `index.html` — the **Vite entry shell only**: hard-coded share-preview (Open Graph/Twitter)
  tags, the SVG data-URI favicon, the Google Fonts links, and the `#root` mount. The page
  itself is the React app in `src/`.
- `src/` — the site: `App.tsx` (composition, gallery state, reveal observer), `sections/`
  (one component per page band), `content/` (fetch/merge/types/photoPaths/meta), and the
  error toast + boundary in `components/`.
- `design-system/` — **`@bevs/design-system`**, the React component library the site is
  built from (tsup, ESM + d.ts). Its `src/styles.css` is the **single source of truth for
  all CSS** — the build byte-copies it to `dist/styles.css`, and the app imports
  `@bevs/design-system/styles.css`.
- `public/content.json` — most editable content. **Beverly edits these JSON files, never code.**
- `public/children.json` / `public/pets.json` — the Children and Pets sections.
- `public/assets/<card-folder>/` — photos for each pet/child card (one folder per card; see
  `public/assets/README.md`). `public/bev-portrait-with-dog.jpg` is the hero portrait
  (referenced by bare filename from content.json).
- `EDITING.md` — plain-English guide for Beverly (paths now under `public/`).
- `package.json` — npm-workspaces root (`design-system` is the one workspace) **and** the
  Vite app manifest. `pre{dev,build}` build the library first (its `dist/` is gitignored).
- `.design-sync/config.json` — config for the claude.ai/design sync of the library.

The original single-file implementation (one static `index.html` holding the CSS and a
vanilla-JS renderer) was retired when the site moved to React; it is preserved in git
history — last carried by commit `329cc67`.

Other assets from the original package (logo-concepts HTML, LaTeX résumé, reference
letter, passport scans) are intentionally **not** in this repo — passports are private
PII; the rest can be added later if wanted.

## Content architecture (how the page is built)
- **Vite + React 18 + TypeScript SPA**, static output. Vercel auto-detects the Vite app
  at the repo root and serves `dist/`; the bundle emits to `dist/app/` so it never mixes
  with the site's own `/assets/` content. PRs get preview deployments; production deploys
  from `main`.
- **Data flow:** `useContent()` fetches content.json + children.json + pets.json in
  parallel (`cache:'no-cache'`), grafts children/pets onto the content object, and renders
  every section from it. Parse errors are prefixed with the file name and surface in the
  friendly `LoadErrorToast` (the EDITING.md promise); render-time throws are caught by
  `RenderErrorBoundary` with the chrome kept alive. There is no `file://` caveat any more —
  local preview is `npm run dev`.
- **Composition:** `App.tsx` renders `Nav` and `Footer` immediately (chrome-first paint)
  and the ten sections once content is ready. Sections compose library components and pass
  `className="reveal"`/`revealDelay(i)` for the scroll choreography —
  **no library component ever emits `class="reveal"` itself**; `useRevealObserver()` (in
  the library) arms the one-shot IntersectionObserver at page level.
- **Galleries:** each `ShowCard`'s `onOpen` lifts `{name, alt, photos}` into App state,
  feeding the single `Lightbox` (focus trap, focus restore, capture-phase keys, video
  release on close — all ported from the vanilla site). `photoPaths()` resolves
  `assets/<folder>/<file>`; positional identity is by construction (each card closes over
  its own item — note pets item order ≠ folder numbering, e.g. Casper & Chestnut use
  `pet-6`).
- **Video in cards:** unchanged conventions — a clip first in `photos` becomes the muted
  looping thumbnail with a `.card-play` badge; its poster is the sibling same-name `.jpg`
  (unlisted). `ShowCard` owns the play/pause IntersectionObserver and skips autoplay under
  `prefers-reduced-motion`.
- **Share preview:** the Open Graph / Twitter tags stay **hard-coded** in `index.html` —
  crawlers read raw HTML and never run the app. `og:image` stays a **relative** path
  (`assets/og-cover.jpg`) so it works on preview URLs, the `.vercel.app` address, and the
  live custom domain **grannybev.nyc**. `useDocumentMeta()` mirrors title/description at runtime for
  anything that does render the page. If `site.title`/`description` change in content.json,
  mirror them in `index.html` by hand.
- **Payments:** `PaymentSection` renders only when `payment.url` is a real `http(s)` link
  (Stripe Payment Link, live in content.json); otherwise the section is absent.
- **Contact form:** exact port — honeypot silently drops; no `accessKey` → `mailto:`
  fallback; otherwise Web3Forms POST (the `email` field only when the contact value is
  email-shaped), success swaps in the Message-sent card. The live access key is in
  content.json (safe to commit, per Web3Forms).
- **Icons** are the library's `ICON_NAMES` registry (24 names); `iconName()` maps free-form
  JSON values onto it with the dot fallback EDITING.md promises.
- **CSS:** authored at `design-system/src/styles.css` (zero id selectors; `.svc:nth-child`
  icon tints require `ServiceCard`s to be **direct children** of the svc grid — keep cards
  unwrapped). If markup conventions change, change the stylesheet and components together.

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
- Decide on paper size: the résumé is A4, the reference letter is US Letter — optionally unify.

## Decisions to preserve
- Do NOT publish other references' phone numbers on the public website (privacy). The site
  features the Venkatesan testimonial (written to be shared) + "references available on request".
- **Pet photos: Beverly's own, yes; clients' faces, no.** Photos showing Beverly are published
  (she is the subject of the site). Uploads showing a client's face are held back unless that
  family has agreed — two such frames are deliberately not on the site. Children stay photo-free
  by default; see `assets/README.md`.
- The Pets cards carry the animals' real names: Ku-ki, Casper & Chestnut, Tootsie, Wally & Birdie,
  Hazel, Bo.
- **Public email is the business address `grannybev.nyc@gmail.com`.** Beverly's older personal
  gmail is no longer published anywhere in this repo; use the business address on every new
  asset (résumé, cards, listings) so the brand is consistent. The Web3Forms access key in
  `public/content.json` is registered to the business address, so contact-form submissions arrive
  there too — that key, not `"emailTo"`, is what decides delivery (see `EDITING.md`).
- Résumé stays to a single page.
