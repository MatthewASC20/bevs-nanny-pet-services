# Bev's Nanny & Pet Services

Personal-brand website for **Beverly de Jesus** ("Granny Bev"), a nanny and
pet-care professional in New York City — 30+ years of experience, CPR certified,
newborn-to-toddler and pet care across NYC.

## What's here

- **`public/content.json`** — most of the site's editable content (text,
  services, experience, skills, reviews, contact info).
- **`public/children.json`** / **`public/pets.json`** — the Children and Pets
  sections.
- **`public/assets/`** — card photos, one sub-folder per card (see
  `public/assets/README.md`).
- **`src/`** — the site itself: a small React app (built with Vite) that reads
  those JSON files at load time and renders the page from them.
- **`design-system/`** — `@bevs/design-system`, the React component library the
  site is built from (cards, lightbox, nav, footer, …) together with the site's
  stylesheet (`design-system/src/styles.css`, the single source of truth).
- **`index.html`** — the page shell: the share-preview (Open Graph) tags, the
  favicon, and the font links stay hard-coded here so link crawlers see them.
- **`EDITING.md`** — a plain-English guide to editing the JSON files (how to add
  or remove items, add photo carousels, the list of available icons). **Start here.**
- **`CLAUDE.md`** — project context / hand-off brief (design system, brand
  details, decisions to preserve).

## Editing the content

Open **`public/content.json`** (or **`public/children.json`** /
**`public/pets.json`**) and change the words — the website updates to match on
the next deploy. You don't need to touch any code. See **`EDITING.md`** for the
friendly step-by-step guide (adding/removing items, choosing icons, adding
photo carousels, etc.).

## Viewing locally

With [Node.js](https://nodejs.org) installed:

```sh
npm install
npm run dev
# then visit the address it prints (usually http://localhost:5173)
```

`npm run build` produces the deployable static site in `dist/`
(`npm run preview` serves that build).

## Hosting

The site is hosted on **Vercel**, which detects the Vite app automatically:
every push to `main` builds the design-system package, runs `vite build`, and
publishes `dist/`. Pull requests get their own preview deployments. The build
output is still plain static files, so any static host that can run
`npm run build` works too.

## Brand quick reference

- **Colors:** green `#3C7D5A`, deep green `#2C5E43`, honey `#F2B33D`,
  ink `#21302A`, cream `#FBF4E4`, page bg `#F1F4EC`.
- **Fonts:** Baloo 2 (headings) + Nunito Sans (body).
- **Voice:** warm, personal, trustworthy.

See `CLAUDE.md` for the full design system and project notes.

## Contact

Beverly de Jesus · Bronx, NY (serving all of NYC)
[grannybev.nyc@gmail.com](mailto:grannybev.nyc@gmail.com) · +1 (917) 346-2847
