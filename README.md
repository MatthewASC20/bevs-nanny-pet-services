# Bev's Nanny & Pet Services

Personal-brand website for **Beverly de Jesus** ("Granny Bev"), a nanny and
pet-care professional in New York City — 30+ years of experience, CPR certified,
newborn-to-toddler and pet care across NYC.

## What's here

- **`content.json`** — **all of the site's editable content** (text, services,
  experience, skills, reviews, contact info). This is the file to edit.
- **`index.html`** — the page itself: HTML, CSS, and the small script that reads
  `content.json` and builds the page from it. No build step, no dependencies.
- **`EDITING.md`** — a plain-English guide to editing `content.json` (how to add
  or remove items, the list of available icons). **Start here to make changes.**
- **`CLAUDE.md`** — project context / hand-off brief (design system, brand
  details, decisions to preserve).

## Editing the content

Open **`content.json`** and change the words — the website updates to match.
You don't need to touch `index.html`. See **`EDITING.md`** for the friendly
step-by-step guide (adding/removing services, choosing icons, etc.).

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
