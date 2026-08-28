# Bev's Nanny & Pet Services

**Live at [www.grannybev.nyc](https://www.grannybev.nyc/)**

Personal-brand website for **Beverly de Jesus** ("Granny Bev"), a nanny and
pet-care professional in New York City — 30+ years of experience, CPR certified,
newborn-to-toddler and pet care across NYC.

## What's here

- **`content.json`** — most of the site's editable content (text, services,
  experience, skills, testimonial, contact info).
- **`children.json`** / **`pets.json`** — the Children and Pets sections.
- **`assets/`** — card photos, one sub-folder per card (see `assets/README.md`).
- **`index.html`** — the page itself: HTML, CSS, and the small script that reads
  those JSON files and builds the page from them. No build step, no dependencies.
- **`EDITING.md`** — a plain-English guide to editing the JSON files (how to add
  or remove items, add photo carousels, the list of available icons). **Start here.**
- **`assets/og-cover.jpg`** / **`apple-touch-icon.png`** / **`robots.txt`** / **`sitemap.xml`** —
  the picture shown when someone shares the site, the iOS home-screen icon, and crawler rules.
- **`CLAUDE.md`** — project context / hand-off brief (design system, brand
  details, decisions to preserve).

## Editing the content

Open **`content.json`** (or **`children.json`** / **`pets.json`**) and change the
words — the website updates to match. You don't need to touch `index.html`. See
**`EDITING.md`** for the friendly step-by-step guide (adding/removing items,
choosing icons, adding photo carousels, etc.).

## Viewing locally

The page loads `content.json` over the network, which browsers **block for files
opened directly** (`file://`). So serve the folder instead of double-clicking:

```sh
python3 -m http.server 8000
# then visit http://localhost:8000
```

(When the site is hosted, this is a non-issue — it just works.)

## Hosting

The site is plain static files, so it can be published as-is on GitHub Pages,
Netlify, Vercel, or any static host. For GitHub Pages: enable Pages in the
repository settings and point it at the default branch root — `index.html` and
`content.json` are served together automatically.

## Brand quick reference

- **Colors:** green `#3C7D5A`, deep green `#2C5E43`, honey `#F2B33D`,
  ink `#21302A`, cream `#FBF4E4`, page bg `#F1F4EC`.
- **Fonts:** Baloo 2 (headings) + Nunito Sans (body).
- **Voice:** warm, personal, trustworthy.

See `CLAUDE.md` for the full design system and project notes.

## Contact

Beverly de Jesus · Bronx, NY (serving all of NYC)
[bevdejesus@gmail.com](mailto:bevdejesus@gmail.com) · +1 (917) 346-2847
