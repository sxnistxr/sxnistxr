# Profile design

A personal dev lab, built around sxnistxr's black cat avatar. Readers should recognize the person, understand the two projects, and open a working demo or its source.

Inspired by the personal introductions and visual storytelling in the minimalistic, descriptive, and image-led profiles collected at https://github.com/abhisheknaiidu/awesome-github-profile-readme. No template or biography copied.

## Tokens

- Ink `#080609`: hero and preview surrounds, echoing the avatar.
- Signal `#ff0806`: sparing accents taken from the cat's eyes.
- Chalk `#f5f3f4`: display text.
- Ash `#aaa3ad`: secondary text on dark surfaces.
- Graphite `#302930`: preview outlines.
- Blush `#f4dddd`: Compare preview surround.

Typography: Noto Sans, with a heavy, tightly spaced name and regular body copy. Markdown text inherits GitHub's native font, theme, and focus behavior. The cat is the only illustrative element. No autoplay animation.

## Layout

Left-aligned introduction followed by vertically stacked, clickable project previews, short descriptions, and optional technical details. Retain native text and links for accessibility and mobile reading.

    [ sxnistxr / personal dev lab          cat portrait ]
    [ introduction + website/docs navigation          ]
    [ TypeScript / React / Bun / Rust                  ]
    [ Compare preview                                 ]
    [ description + live/source links + details        ]
    [ OPTZ preview                                    ]
    [ description + live/source/docs + details         ]

## Critique before implementation

The initial blue banner and generic image/code tiles could belong to any developer. Replaced them with the user's actual avatar and its red/black identity. A black/red palette is justified here by the reference image. Keep the rest quiet: no visitor counters, invented stats, generic animated typing, badge wall, or repetitive decorative headings. Preview frames use each project's visual character: a light image workspace and a dark framework page.

Hero and preview images are composed as HTML/CSS with unchanged source images, then exported as PNG. Keep original screenshots, avatar, and generator so the assets are reproducible. GitHub strips custom layout CSS, so the README uses only supported Markdown/HTML.

## Rebuild the images

Run `bun install`, `bunx playwright install chromium`, then `bun run assets` from this repository. Set `CHROMIUM_EXECUTABLE` to use an existing Chromium installation. Replace the original screenshots in `assets/` before rebuilding to refresh the previews.
