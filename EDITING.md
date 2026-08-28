# Editing the website — a simple guide

**You only ever edit the website's content files — never `index.html`.**

All of the website's words live in three plain-text files:

- [`content.json`](content.json) — most of the site (words, services, job history, skills, reviews, contact).
- [`children.json`](children.json) — the **Children** section.
- [`pets.json`](pets.json) — the **Pets** section.

Photos live in the [`assets/`](assets) folder, one sub-folder per card. The page
(`index.html`) reads these files and builds itself from them — so to change the
site, you change the file and the website updates. You do **not** need to touch
`index.html`. Everything below works the same in all three JSON files.

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

The **Children** section lives in its **own file, `children.json`**. The cards
show **no photos by default** — only non-identifying details. Each child is one
`{ ... }` block in the `"items"` list:

- `"label"` — a short, non-identifying line, e.g. `"Boy · Age 9"` or `"Girl · Newborn"`.
- `"duties"` — the care you provided, e.g. `"After-school pickup, homework help, and park outings."`
- `"icon"` — `"baby"` for infants or `"child"` for older kids (optional; defaults to `"child"`).
- `"folder"` / `"photos"` — these make a card carousel-ready (same as Pets below),
  but **keep `"photos": []`** to leave the child photo-free. Only ever add a child
  photo if that family has explicitly agreed to it.

Add or remove children the same way as any list (copy a block to add, delete to
remove; commas between blocks, none after the last). Please keep these free of
names, schools, or anything that could identify a child or family.

---

## Showcasing the pets you've cared for

The **Pets** section lives in its **own file, `pets.json`**. Each pet is one
`{ ... }` block in the `"items"` list — add or remove pets like any list (copy a
block to add, delete to remove; commas between blocks, none after the last).

Each pet has:

- `"name"` — the pet's name, shown under the photo.
- `"note"` — an optional one-line description (breed, a favourite walk, a habit).
  Leave it as `""` to show just the name.
- `"folder"` — the name of this card's photo folder inside `assets/` (e.g.
  `"pet-1"`). Every card has its own folder.
- `"photos"` — a **list** of image file names that live in that folder. Drop the
  photos into `assets/<folder>/` and list the file names here, e.g.
  `"photos": ["1.jpg", "2.jpg", "3.jpg"]`. The first becomes the card's thumbnail,
  and **clicking the card opens a photo carousel** of all of them (arrows, dots, or
  keyboard arrows; Esc to close). Leave it empty — `"photos": []` — to show a paw
  icon and no carousel.
- `"photoAlt"` — a short description of the pet for screen readers (e.g. the pet's
  name and breed).

Example — a pet with three photos sitting in `assets/pet-1/`:

```json
{ "name": "Rex", "note": "Golden retriever — our daily park buddy.", "folder": "pet-1", "photoAlt": "Rex, a golden retriever", "photos": ["1.jpg", "2.jpg", "3.jpg"] }
```

Square photos look best for the thumbnail (it's cropped to fit); inside the
carousel each photo is shown in full. See `assets/README.md` for the folder layout.

### Using a video as the thumbnail

The `"photos"` list can hold **short video clips as well as photos**. List a clip
exactly like a photo, and if you put it first it becomes the card's thumbnail — it
plays quietly on a loop while the card is on screen, and gets a play badge:

```json
{ "name": "Rex", "note": "Golden retriever.", "folder": "pet-1", "photoAlt": "Rex, a golden retriever", "photos": ["1.mp4", "2.jpg", "3.jpg"] }
```

Four things to know:

1. **Use `.mp4` files.** That's the format every browser plays. `.webm` also works.
   **`.mov` files — what an iPhone gives you — will not play** for most visitors,
   so they have to be converted first (see below).
2. **Save a matching still beside the clip.** Next to `1.mp4`, save `1.jpg` — the
   same name, `.jpg` instead of `.mp4`. It's shown while the clip loads, and it's
   what visitors who've asked their device to reduce motion see instead of a loop.
   **Don't add that still to the `"photos"` list**, or it'll also appear as its own
   slide in the carousel.
3. **Clips have no sound on the card** (browsers require that for anything that
   plays by itself). Sound does play in the carousel, where there are controls.
4. **Keep them short and small** — a few seconds, and under about 2 MB. Every clip
   is stored in the website forever, so a full-length phone video will slow the
   page down for everyone.

### Turning an iPhone Live Photo or video into an `.mp4`

A Live Photo is really two files — a still and a short `.mov` movie — and neither
travels well to the web on its own. The easiest route on a Mac:

1. In **Photos**, click the Live Photo, then **File ▸ Export ▸ Export Video** (for a
   Live Photo) or **Export Unmodified Original** (for a normal video).
2. If what lands on your desktop is a `.mov`, open it in **QuickTime Player** and
   choose **File ▸ Export As ▸ 720p**. That produces a `.mp4`.
3. Drag the `.mp4` into the card's folder, and take a screenshot of a good frame to
   save alongside it as the matching `.jpg`.

To stop your iPhone making files the web struggles with in the first place, set
**Settings ▸ Camera ▸ Formats ▸ Most Compatible**.

If you're comfortable at a command line, this does the whole job in one step —
converts to web-safe video, strips the audio, resizes, and makes the matching still:

```sh
ffmpeg -i IMG_1234.MOV -vf "scale=720:-2" -c:v libx264 -profile:v baseline -crf 26 -an -movflags +faststart 1.mp4
ffmpeg -i 1.mp4 -frames:v 1 1.jpg
```

The `"note"` line near the top of `pets.json` (just under `"intro"`) shows as a
caption beneath the whole gallery — that's where it's explained that children
aren't pictured for privacy. Edit that sentence to reword it, or set it to `""` to
hide the caption.

---

## Turn on online payments (Stripe)

The site has a **"Pay securely" section** (just above Contact) that stays **hidden
until you add a payment link**, so nothing broken ever shows. To switch it on:

1. In your **Stripe dashboard**, create a **Payment Link**
   (Payments → Payment Links → **+ New**). Since families pay an agreed amount,
   turn on **"Let customers decide what to pay"** (the customer-chosen-amount
   option).
2. Copy the link Stripe gives you — it looks like `https://buy.stripe.com/…`.
3. In `content.json`, find `"url": ""` inside the `"payment"` block and paste the
   link between the quotes, e.g. `"url": "https://buy.stripe.com/abc123"`.
4. Save. The "Pay securely" section appears, and the button opens your Stripe
   checkout in a new tab. To hide it again later, set `"url": ""`.

You can also reword `"heading"`, `"blurb"`, and `"buttonText"` in that block. No
card details ever touch this website — Stripe handles all of that securely.

---

## Make the contact form email Bev directly (one-time setup)

Until this is set up, the form falls back to opening the visitor's own email app.
To have messages **sent straight to Bev's inbox from the website** instead (with a
"Message sent!" confirmation, no email app):

1. Go to **web3forms.com**, enter **grannybev.nyc@gmail.com**, and copy the **Access
   Key** they email you. It's free and needs no account.
2. In `content.json`, find `"accessKey": ""` inside the `"form"` block and paste
   the key between the quotes, e.g. `"accessKey": "a1b2c3d4-5678-90ab-cdef-..."`.
3. Save. Submissions now POST to Web3Forms, which emails them to Bev.

The key is safe to keep in the file — it only allows sending to Bev's verified
address. To switch back to the email-app behaviour, set `"accessKey": ""` again.

> **Still to do — the key already in the file belongs to the old address.** The
> website now shows **grannybev.nyc@gmail.com** everywhere, but the Access Key
> sitting in `content.json` was issued for the old personal gmail, so messages
> sent through the form still arrive *there*. Web3Forms ties a key to one
> verified address, so changing `"emailTo"` does not move it. To finish the
> switch, repeat steps 1–2 above with the new address and paste the new key over
> the old one. Until then the form still works — the mail just lands in the old
> inbox.

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
