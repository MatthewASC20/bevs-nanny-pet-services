# assets/

Photos for the website's cards live here — **one folder per card**:

- **Pet cards** → `assets/pet-1/`, `assets/pet-2/`, … (the folder name is the
  `"folder"` value for that card in **pets.json**)
- **Child cards** → `assets/child-1/`, … (folder name set in **children.json**)

## Adding a photo carousel to a card

1. Drop image files into that card's folder, e.g. for the first pet
   (`"folder": "pet-1"`):

   ```
   assets/pet-1/1.jpg
   assets/pet-1/2.jpg
   ```

2. List the file names in that card's `"photos"` array in pets.json:

   ```json
   "photos": ["1.jpg", "2.jpg"]
   ```

The first photo becomes the card's thumbnail; **clicking the photo opens a
carousel** of all of them. Square-ish photos look best.

> **File names are case-sensitive once the site is published.** `IMG_2043.JPG` and
> `IMG_2043.jpg` are the same file on a Mac but different on the live server, so a
> photo that works locally can come up blank online. Plain lower-case names like
> `1.jpg` are safest. If a photo ever fails to load, the card quietly falls back to
> the paw icon instead of showing a broken image.

> Children are intentionally left photo-free for privacy — only add a child photo
> if that family has agreed to it.

The empty `.gitkeep` files just let Git track the otherwise-empty folders; ignore them.
