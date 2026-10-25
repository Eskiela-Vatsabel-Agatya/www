# Phase 1 report — LunAR site foundation and Beranda

## Implemented on `phase-1`

- Astro static TypeScript scaffold, pinned dependency manifest, Workers static-assets config, and a local `phase-1` Git branch (the supplied folder had no Git history).
- Design tokens, self-hosted font declarations, responsive layout, inlined brand SVGs with C2PA metadata removed, and temporary noindex SEO shell.
- Beranda with the approved headline, eight content sections, the seven company-listed product entries, partner links, and contact details.
- Seven product routes, lazy `ModelStage` loader and poster/photo fallback, WhatsApp links, QR helper, and thin inner-page placeholders.
- Decision, verification, image prompt, infrastructure, and human review documents.

## Human gates

H0 blue choice; H1 GitHub setup; H2 Workers Builds; H3 real URL; H4 proxy allow-list and chair USDZ rename; H5 chair poster and scale; H6 device checks; H7 visual and keyboard review.

## H0 swatch report

| Option | Source blue | Contrast on white | Contrast on ink |
|---|---|---:|---:|
| A — current | `#2A57FF` | 5.38:1 | 3.48:1 |
| B | `#4DA9FF` | 2.49:1 | 7.52:1 |

Tokens currently use Option A. Option B needs darker ramp steps for text/fill. Please choose H0 before finalizing the brand colour.

## Checks and limitations

- Source checks passed: token-only hex use, contrast pairs, and content scan. Asset scan reports the expected H4 exception `guitar chair 4.usdz`.
- Dependency installation stopped with `UNABLE_TO_VERIFY_LEAF_SIGNATURE` from npm registry TLS. A flat-layout install was used to avoid the Windows symlink error; no repeat retries were made. As a result there is no generated lockfile and no `node_modules/`.
- `npm run check`, Astro typecheck/build, Vitest, `check:html`, and bundle budget could not run. One direct Node helper check also could not resolve the extensionless TypeScript imports. Treat Phase 1 as **in progress**, not acceptance-complete.
- The legacy `data.js` has nine rows (including two bowl variants) and omits the chair; the seven rows in `company.md` are used. The chair USDZ key still contains spaces and is pending H4.
- TEMP imagery is listed in `IMAGE_PROMPTS.md`; only the existing legacy room/product images and neutral chair poster are wired. Other planned AI assets remain prompts/placeholders because image generation is unavailable in this environment.

**Looks and motion were not eyeballed; WebGL, model-viewer and AR were not run.** No browser or screenshots were used. GitHub, Cloudflare, actual devices, and the live proxy Worker were not touched.

## Human review list for H6/H7

- At 360 px, review title wrapping, CTA width, order of hero content, room height, ribbon clearance, and product rail snap.
- Confirm the room and product imagery do not compete with the headline or controls.
- Review the chat, process, services, list, and horizontal rail layouts; confirm reduced motion leaves content visible.
- Test keyboard navigation, mobile-menu Escape and focus loop, QR disclosure, constrained connection prompt, and model-failure fallback.
- Test iPhone Safari Quick Look and Android Chrome Scene Viewer on real devices after H4/H5.
