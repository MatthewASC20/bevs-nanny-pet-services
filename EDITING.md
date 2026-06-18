# Editing the website — a simple guide

**You only ever need to edit one file: [`content.json`](content.json).**

All of the website's words, services, job history, skills, reviews, and contact
details live in `content.json`. The page (`index.html`) reads that file and
builds itself from it — so to change the site, you change `content.json` and the
website updates. You do **not** need to touch `index.html`.

---

## How to add or remove an item

Anywhere you see a list wrapped in square brackets `[ ... ]`, each `{ ... }`
block is one item. To **add** one, copy an existing block and change the words.
To **remove** one, delete its whole `{ ... }` block.

Two rules keep the file valid:

1. **Put a comma between blocks, but not after the last one.**
2. **Keep the quotation marks** `"` around every label and every value.

### Example — adding a service

Find the `"services"` section. To add a new service card, copy one block and
edit it:

```json
    "items": [
      { "icon": "child", "title": "Nanny & childcare", "description": "..." },
      { "icon": "paw",   "title": "Pet care & walks",  "description": "..." },
      { "icon": "heart", "title": "Overnight care",    "description": "Calm overnight support so parents can rest." }
    ]
```

The first two lines end with a comma; the new last line does **not**. That's the
only thing to watch out for.

### Example — removing a service

Just delete the whole line/block for the item you don't want, and make sure the
item before it doesn't have a leftover comma if it's now the last one.

The same pattern works for **chips**, **services**, **experience** (job
history), **skills**, **education**, and the **contact cards** — they're all
lists you can grow or shrink.

---

## Choosing an icon

Some items have an `"icon"` value. Use any name from this list:

| Name        | Looks like            |
|-------------|-----------------------|
| `heart`     | heart outline         |
| `heartfill` | solid heart           |
| `paw`       | paw print (outline)   |
| `pawfill`   | paw print (solid)     |
| `check`     | check in a circle     |
| `star`      | star                  |
| `baby`      | baby / rattle         |
| `child`     | person                |
| `bottle`    | baby bottle           |
| `house`     | house                 |
| `meal`      | bowl / meal           |
| `bag`       | shopping bag          |
| `pin`       | map location pin      |
| `phone`     | phone                 |
| `mail`      | envelope              |
| `dot`       | small filled dot      |
| `leaf`      | leaf                  |

If you type an icon name that isn't on this list, a small dot is shown instead
(nothing breaks).

---

## Highlighting words in colour

In the big hero headline and the testimonial quote you can colour-highlight
words using markers:

- `[[these words]]` → highlighted (green in the headline, gold in the quote)
- `((these words))` → gold/honey highlight (headline only)

Example:

```json
"headline": "Warm, reliable care for your [[little ones]] & ((furry friends))."
```

Everywhere else, just write normal text — no markers needed.

---

## Adding your photo

Right now the round photo spot shows the letters **“Bev”** as a placeholder. To
use a real photo instead:

1. Put your image file in **this same folder** (the one with `index.html`). A
   **square** photo looks best — for example `bev.jpg` or `bev.png`.
2. In `content.json`, find the `"portrait"` line and set `"photo"` to your file
   name:

   ```json
   "portrait": { "initials": "Bev", "note": "add your photo here", "photo": "bev.jpg", "photoAlt": "Beverly de Jesus" }
   ```

3. Save and reload. The photo fills the circle automatically (it's cropped to a
   circle, so a square image looks best).

To switch back to the “Bev” placeholder, set `"photo"` back to empty:
`"photo": ""`.

The `"photoAlt"` text describes the photo for screen readers and search engines —
set it to something like your name.

---

## Showing children (without photos or names)

The **Children** section works like Pets, but the cards show **no photos** — only
non-identifying details. Each child is one `{ ... }` block in the `"children"`
list:

- `"label"` — a short, non-identifying line, e.g. `"Boy · Age 9"` or `"Girl · Newborn"`.
- `"duties"` — the care you provided, e.g. `"After-school pickup, homework help, and park outings."`
- `"icon"` — `"baby"` for infants or `"child"` for older kids (optional; defaults to `"child"`).

Add or remove children the same way as any list (copy a block to add, delete to
remove; commas between blocks, none after the last). Please keep these free of
names, schools, or anything that could identify a child or family.

---

## Showcasing the pets you've cared for

The **Pets** section is a photo gallery. Each pet is one `{ ... }` block in the
`"pets"` list — add or remove pets exactly like the other lists (copy a block to
add, delete a block to remove; commas between blocks, none after the last).

Each pet has:

- `"name"` — the pet's name, shown under the photo.
- `"note"` — an optional one-line description (breed, a favourite walk, a habit).
  Leave it as `""` to show just the name.
- `"photos"` — a **list** of image file names. Drop the photos in this folder and
  list them here, e.g. `"photos": ["rex-1.jpg", "rex-2.jpg", "rex-3.jpg"]`. The
  first one becomes the card's thumbnail, and **clicking the card opens a photo
  carousel** of all of them (use the arrows, dots, or your arrow keys; press Esc to
  close). Leave it empty — `"photos": []` — to show a paw icon and no carousel.
- `"photoAlt"` — a short description of the pet for screen readers (e.g. the pet's
  name and breed).

Example of one finished pet:

```json
{ "name": "Rex", "note": "Golden retriever — our daily park buddy.", "photoAlt": "Rex, a golden retriever", "photos": ["rex-1.jpg", "rex-2.jpg", "rex-3.jpg"] }
```

Square photos look best for the card thumbnail (it's cropped to fit); inside the
carousel each photo is shown in full.

There's also a `"note"` line in the `"pets"` block (just under `"intro"`) that
shows as a caption beneath the whole gallery — that's where it's explained that
children aren't pictured for privacy. Edit that sentence to change the wording, or
set it to `""` to hide the caption entirely.

---

## Special symbols you'll see

These are fine to copy and reuse; they're just nicer-looking punctuation:

- `—` long dash   ·   `·` middle dot   ·   `–` short dash (for year ranges like `2021 – 2023`)
- `“ ”` curly quotes   ·   `…` ellipsis

You can also just type a normal hyphen `-` or straight quotes `"` if that's
easier — but note that a straight `"` **inside** a value must be written as `\"`
so it doesn't end the value early.

---

## Before you save — a 10-second check

- Every `{` has a matching `}` and every `[` a matching `]`.
- Commas between items, **none** after the last item in a list.
- All labels and values are wrapped in `"quotes"`.

If something is off, the website shows a small note at the bottom of the page
telling you what to fix (for example, a missing comma), and nothing is lost —
just fix `content.json` and reload.

---

## Seeing your changes

- **Published site (recommended):** once this site is hosted (e.g. GitHub
  Pages), your saved `content.json` changes show up automatically.
- **On your own computer:** opening `index.html` by double-clicking won't load
  `content.json` (browsers block that for local files). To preview locally,
  open a terminal in this folder and run:

  ```sh
  python3 -m http.server 8000
  ```

  then visit `http://localhost:8000` in your browser.
