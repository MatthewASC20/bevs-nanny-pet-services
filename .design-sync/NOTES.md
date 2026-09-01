# design-sync notes — @bevs/design-system

State and corrections that future syncs should honor.

## Build / stylesheet
- `design-system/src/styles.css` is the AUTHORED stylesheet (the single source
  of truth for the whole site since the React migration). The build byte-copies
  it to `dist/styles.css` — `cssEntry` in config.json is unchanged and diffs of
  `dist/styles.css` stay meaningful.
- The old `extract-css.mjs` (which read the retired static index.html and
  appended a `.reveal{opacity:1}` neutralizer) is gone. The un-neutralized
  reveal rules now ship in the stylesheet. **No library component emits
  `class="reveal"`**, and preview markup must not either — an element carrying
  it renders invisible unless something adds `.in` (the app does this via
  `useRevealObserver`).
- `[FONT_MISSING] "Trebuchet MS"` from package-validate is expected and NOT a
  defect: it is the deliberate OS-provided fallback inside `--font-display`.
  Baloo 2 itself is vendored in `fonts/` and ships.
- The vendored Nunito Sans faces omit the `opsz` axis the live site's Google
  Fonts link carries — visually near-identical; noted in case of pixel-diffs.

## Component set (post React-migration)
- The library grew from 19 to ~31 exports when the site moved to React: Nav,
  Footer, Section, Wrap, Grid, RichText, AboutCard, AboutBody, EduPanel,
  PayCard, ContactFormShell, FormSent, plus useRevealObserver/revealDelay
  (hooks — not preview-renderable components).
- Lightbox gained a Tab focus trap and focus-restore-to-opener.
- `ds-bundle/` predates these additions — rebuild before the next upload.

## Sync status
- First sync has NOT completed: no `projectId` pinned yet. Upload is blocked
  until the user runs `/design-login` once in an interactive session.
- Previews (`.design-sync/previews/*.tsx`) still to author; last validate run
  flagged ContactCard, Mark, SectionHead, ServiceCard, TimelineItem as
  RENDER_THIN and 11 components on floor cards (pre-preview state).

## Re-sync risks
- The stylesheet is edited by hand now; a site restyle changes
  `dist/styles.css` and re-verifies everything that renders — expected.
- `.svc:nth-child` icon tints depend on ServiceCards being direct children of
  the svc grid — preview compositions must not wrap them.
