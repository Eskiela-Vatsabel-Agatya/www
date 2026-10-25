# LunAR Phase 1 decisions

| ID | Decision | Project application |
|---|---|---|
| D1 | Astro static, TypeScript, build-time npm only | `output: static`, strict TS, pinned packages, no adapter. |
| D2 | Git-linked deployment | Workers Builds from Git; production branch `main`. |
| D3 | Cloudflare Workers static assets | `wrangler.jsonc` contains only name, date, and dist assets configuration. |
| D4 | Fonts 2+1 | Outfit (display), Plus Jakarta Sans (body), DM Mono (metadata); logged as D20. |
| D5 | AI imagery until real photography exists | Existing supplied imagery is TEMP; swap by role. |
| D6 | No browser or visual checks by builder; no zip | Human reviews visuals/devices. |
| D7 | Bahasa Indonesia only | `lang=id`, formal-warm Anda. |
| D8 | No prices, stats, benchmarks or invented claims | Commercial data removed from new catalog UI. |
| D9 | Editorial hero, ribbon accents and live 3D room | ModelStage degrades to an image/poster; H5 poster remains pending. |
| D10 | Light theme | Navy is ink; no dark mode. |
| D11 | Beranda, four placeholders, seven product routes, contact | Inner-page copy deferred to Phase 2. |
| D12 | Portfolio uses the confirmed seven product rows | Company file is the catalog source; no prices or add-ons. |
| D13 | WhatsApp, email, address and Instagram | Values copied from company.md. |
| D14 | Approved Beranda headline | Blue accents only “ke Ruang Tamu Pembeli.” |
| D15 | Temporary Workers URL, indexing off | Central URL constant; H3 must replace it. |
| D16 | Dark green WhatsApp fill | `#0F7A3D` with white text. |
| D17 | H0 blue selection pending | Option A (`#2A57FF`) used meanwhile; B report in swatch table. |
| D18 | One accent colour | Blue only; semantic green for WhatsApp. |
| D19 | Furniture is the focus, evidence stated honestly | Kursi Gitar is the furniture example; lifestyle catalog is Grizelle. |
| D20 | Font pairing | Outfit, Plus Jakarta Sans, DM Mono; geometric display complements the wordmark while retaining readable Indonesian body text. |

## Appended by builder

- The actual `legacy/js/data.js` contains nine rows: seven company-listed products plus two bowl variants; it also omits Kursi Gitar. The plan/company file's seven-row catalog is used. No unsupported rows are shown.
- The supplied logo SVGs are copied with C2PA metadata removed. Option A keeps the supplied mark colours for now.
- 2026-10-25: initialized the provided legacy folder as a local Git repository and created `phase-1`; no Git history was present.
