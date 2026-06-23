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

The first photo becomes the card's thumbnail; **clicking the card opens a
carousel** of all of them. Square-ish photos look best.

> Children are intentionally left photo-free for privacy — only add a child photo
> if that family has agreed to it.

The empty `.gitkeep` files just let Git track the otherwise-empty folders; ignore them.
