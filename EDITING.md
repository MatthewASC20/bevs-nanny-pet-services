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

## Skills & strengths

Each skill in the `"skills"` list is one `{ ... }` block. Most only need one line:

```json
{ "label": "Bilingual" }
```

The extra settings, which only some skills use:

- `"label"` — the words on the pill. **This is the only one you need.**
- `"icon"` — an icon name from the list below (optional).
- `"star": true` — makes the pill gold, to highlight it. Used for the CPR badge.
- `"href"` — turns the pill into a link, e.g. to a certificate PDF.

> **Careful when copying:** the first skill in the list is the CPR one, and it
> carries `"star"` **and** `"href"` pointing at the CPR certificate. If you copy
> *that* block to add a new skill, your new skill will also be gold and will open
> the CPR certificate. Copy a plain one like `{ "label": "Housekeeping" }` instead.

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
| `arrow`     | right arrow           |

If you type an icon name that isn't on this list, a small dot is shown instead
(nothing breaks).

(The page also uses `camera`, `expand`, `lock` and `external` on its own — for the
photo carousel, the payment button and links out. You never need to type those.)

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

Your photo is **already set up** — the round spot in the hero shows
`bev-portrait-with-dog.jpg`, which lives in this folder next to `index.html`.

To swap in a different picture:

1. Put the new image file in **this same folder**. A **square** photo looks best.
2. In `content.json`, find the `"portrait"` line and change `"photo"` to the new
   file name:

   ```json
   "portrait": { "initials": "Bev", "note": "add your photo here", "photo": "bev-portrait-with-dog.jpg", "photoAlt": "Beverly de Jesus — Granny Bev — out on the deck with a Rottweiler" }
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

> **File names are case-sensitive on the live website.** If the file is called
> `IMG_2043.JPG`, write it exactly that way — `IMG_2043.jpg` will work on your own
> computer but show nothing once the site is published. Simple lower-case names
> like `1.jpg` avoid the problem entirely.

### Hiding a section

If you empty a `"items": []` list, that whole section disappears from the page rather
than showing an empty heading. That works for Pets and for Children.

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

**This is already switched on.** The **"Pay securely" section** (just above
Contact) is live, and its button opens your Stripe checkout in a new tab. The link
it uses is the `"url"` line inside the `"payment"` block of `content.json`.

- **To use a different Stripe link:** replace what's between the quotes on that
  `"url"` line with the new one (it looks like `https://buy.stripe.com/…`).
- **To turn the section off:** set it to `"url": ""`. The whole section disappears
  from the page and from the menu — nothing broken is ever shown.

If you ever need to make a fresh link: in your **Stripe dashboard**, go to
Payments → Payment Links → **+ New**, and because families pay an agreed amount,
turn on **"Let customers decide what to pay"**.

You can also reword `"heading"`, `"blurb"`, and `"buttonText"` in that block. No
card details ever touch this website — Stripe handles all of that securely.

---

## Make the contact form email Bev directly (one-time setup)

**The form already works** — messages sent through the website reach Bev, and the
visitor sees a "Message sent!" confirmation. The setting is the `"accessKey"` line
inside the `"form"` block of `content.json`.

**One thing is still outstanding.** That key was registered to Beverly's older
personal gmail, so submissions currently arrive *there* rather than at the business
address `grannybev.nyc@gmail.com`. To move them across:

1. Go to **web3forms.com**, enter **grannybev.nyc@gmail.com**, and copy the **Access
   Key** they email you. It's free and needs no account.
2. In `content.json`, find the `"accessKey"` line inside the `"form"` block and
   replace the key between the quotes with the new one.
3. Save. Submissions now arrive at the business address.

Also worth knowing:

- **To turn the website delivery off**, set `"accessKey": ""`. The form then falls
  back to opening the visitor's own email app instead.

The key is safe to keep in the file — it only ever delivers to Bev's verified
address.

---

## The one thing that isn't in these files

The **menu across the top** (About, Services, Experience, …) lives in `index.html`,
not in the JSON files. It's kept there on purpose: it's the only part of the page
that search engines can read without running the website's code, so moving it would
make the site harder to find.

If you add or remove a whole section and want the menu to match, that's the one
edit worth asking for help with. (The **Pay** link is the exception — it appears and
disappears on its own, following the payment setting above.)

> **Note — the key decides where the mail goes, not `"emailTo"`.** Web3Forms ties
> a key to the one address it was verified against, and the form never sends a
> recipient in its request. So if you ever change the business email again, a new
> key has to be issued for it; editing `"emailTo"` alone changes only the
> fallback that opens the visitor's email app. The key in the file now belongs to
> **grannybev.nyc@gmail.com**.

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
naming the file or the section that has the problem (for example, a missing
comma in `pets.json`).

**The rest of the page keeps working.** Only the part with the mistake is
affected — your phone number, the contact form and everything else still show
normally, so a typo can never take the whole site down. Fix the file it names,
save, and reload.

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
