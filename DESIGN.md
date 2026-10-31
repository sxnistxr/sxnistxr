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

Left-aligned cat banner, introduction, linked technology badges, text-only project summaries with expandable details, then GitHub stats and streak cards. Retain native text and links for accessibility and mobile reading.

## Current choices

The banner uses the supplied avatar and reads “dev car :3”. The introductory label and bottom accent line were removed at the user's request. Rounded banner corners are transparent (`omitBackground: true` in the renderer), so they work against GitHub's light and dark backgrounds. Project screenshots and preview frames were removed.

The toolkit uses Shields badges. The GitHub section uses GitHub Stats Extended (the maintained successor linked by GitHub Readme Stats) and GitHub Readme Streak Stats, both discovered through https://github.com/dhyeythumar/awesome-readme-tools. Cards use square corners, ink backgrounds, readable ash text, and red accents in both GitHub themes. Third-party cards update independently and require no stored credentials.

## Rebuild the banner

Run `bun install`, `bunx playwright install chromium`, then `bun run assets` from this repository. Set `CHROMIUM_EXECUTABLE` to use an existing Chromium installation. The original avatar is kept unchanged in `assets/avatar.png`. The banner is composed in HTML/CSS and exported as PNG.
