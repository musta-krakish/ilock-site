# Catalog pipeline

One-off tooling used to build the catalog from `iLock Каталог Замков.pdf`. **The site does not
run these** — `src/content/locks/*.md` and `src/assets/images/locks/*.png` are committed and are
the source of truth. Edit the markdown directly for routine changes (a price, a description).

Reach for these only when a **new catalogue PDF** arrives and the whole set needs regenerating.

## Setup

```sh
python3 -m venv venv && ./venv/bin/pip install pymupdf pillow numpy scipy
# also needs ImageMagick: brew install imagemagick
```

## Product images — `build_final.py`

Extracts each product shot from the PDF and writes 900×900 transparent PNGs.

```sh
CATALOG_PDF="~/Downloads/iLock Каталог Замков.pdf" \
OUT_DIR=../../src/assets/images/locks \
./venv/bin/python build_final.py
```

Two things it handles that are easy to get wrong:

- **SMask transparency.** Product images carry their alpha in a separate `/SMask` object. Extract
  the bitmap alone and you get an opaque black background. `dump()` re-attaches it.
- **White page background.** Images without an SMask are matted onto the white catalogue page.
  `knockout.py` clears near-white regions that touch the border, plus the one large *enclosed*
  region (a padlock's shackle opening) — while keeping small enclosed whites, so 101T's white
  fingerprint sensor survives. A naive `-transparent white` destroys it.

The `MAP` dict pins each product to its PDF page and image xref. **Page numbers and xrefs change
with every new PDF**, so re-derive them before running: dump candidates, build a labelled contact
sheet, and confirm each product by eye. Sources are low-resolution (some are ~120px wide), so
images are fitted to 780px and only upscaled when unavoidable.

## Content — `gen_content.py`

Writes the 27 markdown files from the `P` table (specs + prices + ru/kk/en prose).

```sh
./venv/bin/python gen_content.py
```

It **deletes every `.md` in the target directory first**. Any hand-edits made to the markdown
since the last run are lost unless they are folded back into the `P` table.

Specs are stored as language-neutral keys (`aluminum`, `fingerprint`, `wifi`) and translated once
via the dictionaries in `src/i18n.ts` — so a new spec value needs a matching key in
`src/content.config.ts` and an entry in all three `specs` dictionaries.
