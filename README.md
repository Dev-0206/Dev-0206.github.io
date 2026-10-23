# Dev Gandhi portfolio

Static site: plain HTML, CSS and JavaScript. No build step, no dependencies, fonts are self-hosted.

## Put it online (GitHub Pages)
1. Create a public repo named exactly `Dev-0206.github.io` on GitHub.
2. Upload the CONTENTS of this folder (index.html, css, js, assets), not the outer folder. Commit to `main`.
3. Settings > Pages > Source: "Deploy from a branch", branch `main`, folder `/ (root)`. Save.
4. Wait 1-2 minutes. The site is at https://dev-0206.github.io/

Using a different address? Change the `canonical`, `og:url` and `og:image` URLs in `index.html`.

## Edit content
Everything is in `js/data.js`: `window.SITE` (name, about, links) and `window.PROJECTS` (case studies).
To add a project, copy an existing object, give it a new `slug`, and add images to `assets/img/` as WebP.
Deep links look like `/#/work/second-spin`.

## Files
- `assets/Dev_Gandhi_Resume.pdf` is the resume linked from the site. Replace it to update.
- `assets/og.png` is the 1200x630 share image.
- Fonts: Instrument Serif, Hanken Grotesk, DM Mono (all SIL Open Font License).
