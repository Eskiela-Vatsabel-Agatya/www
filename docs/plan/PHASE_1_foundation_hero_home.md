## SHARED CONTEXT (identical in every phase file)

> Read this block in full before touching code. It is the project's memory. If something here conflicts with the DNA files, **this block wins only where it cites a logged deviation (D-number); otherwise the DNA wins.**

### A0. How you (the builder) work on this project

You are an AI coding agent on **your own machine**, working in a local git repo that the human opens in VS Code and pushes to GitHub. Cloudflare is connected to that GitHub repo by the human. That changes a few LunAR defaults, all logged in A3:

1. **You can run local commands** (`npm install`, build, type check, Node scripts, unit tests). **You cannot and must not touch Cloudflare, GitHub, a real phone, or the live Worker.** Anything that needs them is written as a click-by-click step in `docs/INFRA_RUNBOOK.md` for the human (agent.md §5.7). Never claim a deployed thing works because a local check passed (agent.md §5.9).
2. **No visual checking by you (D6).** Do **not** take screenshots, do **not** run Playwright, Puppeteer, Chromium, Lighthouse or any browser, headless or not. The human looks at the site themselves. You verify with scripted checks on source and on `dist/` (build, type check, contrast maths, bundle budgets, HTML parsing assertions, unit tests of pure logic) and you say plainly in every report: **"looks and motion were not eyeballed; WebGL, model-viewer and AR were not run."** This overrides `playbook.md` §8 (Playwright recipes). You *may* open an image you generated once to check it for the defects listed in A6.
3. **No zip delivery** (overrides agent.md §5.4). You have the folder. Work on a branch `phase-1` / `phase-2`, commit in logical steps with clear messages, do not push, and finish by telling the human the branch name and the exact commands to review and merge.
4. **Discuss first, build second still applies** for anything not already decided here. If a prompt or file is unclear, or a `[CHOOSE ONE]` is unresolved, say so in your **first message**, pick the safest default, log it in `docs/DECISIONS.md`, and make it a one-line change (agent.md §5.6).
5. **Talk to the human in English, plain language, one question at a time.** Site copy is Bahasa Indonesia.
6. **"Continue"** means resume where you stopped, with no recap.
7. **If a file in A1 is not in your context** (long session, compaction): say so, re-read it from disk, never work from a summary of the rules.

### A1. Files you have (read in this order)

| Order | File | What it is |
|---|---|---|
| 1 | `agent.md` | Working agreement, mistake log M1 to M10. Obey §8 |
| 2 | `company.md` | **This project's facts** (identity, contacts, hosting, brand, 3D keys, partner links). Blank `___` = stop and ask |
| 3 | `design.md` | Design DNA + AR rules (§8 media priority, Scene Viewer first) |
| 4 | `security.md` | Tier A rules, Worker/CORS, 3D handling, checklists. §6 is human-only |
| 5 | `playbook.md` | Runbooks (logo/favicon §1, debugging ladder §5, device matrix §6) |
| 6 | `Avoiding_AI_Slop_Web_Design.docx` | The anti-slop bible. A condensed checklist is in A6, but read the original if you can open `.docx` |
| 7 | `LunAR_B2B_Sales_Playbook.docx` | Source of positioning and objections. **Use for tone and qualitative pain points only. Do not lift any number, price, tier, benchmark or case study from it (D8)** |
| 8 | `lunar-logo-horizontal.svg`, `-stacked.svg`, `-icon.svg` | Official logo files (strip the `<metadata>` block) |
| 9 | `Lunar Company Profile` (5 PNGs) | The printed profile: tone, structure, imagery mood. **Reference for feel, not for pixels** |
| 10 | `1792920475196_image.png` | The ribbon **concept** sketch. **Do NOT copy its look, its layout, its mirrored furniture, its badge, its stat line or its colours.** It exists only to say "ribbons at the sides, furniture rising" |
| 11 | `legacy/` (the unzipped old site) | Read-only reference. Put it in `legacy/` at the repo root and add `legacy/` to `.gitignore`. Copy what you need out of it (logos, product photos, copy); never link to it |
| 12 | `NoteGPT_Subtitles_...txt` | A video transcript about e-commerce landing pages. Take **only** these ideas: clarity beats cleverness, the headline states the outcome + the mechanism, every element has a purpose, design mobile first |
| 13 | `CHANGES_AND_DECISIONS.md` | History of the DNA v2 revision. Its open items are answered in A3 |

### A2. Snapshot of the legacy site (what exists today)

Vanilla HTML/CSS/JS, 5 pages + one detail template: `index`, `tentang`, `layanan`, `portofolio`, `kontak`, `portofolio/detail.html?id=`. Plus Jakarta Sans via Google Fonts link, royal blue `#2A57FF` on navy `#0B1220`, `model-viewer@3.4.0` from unpkg, WhatsApp-first CTAs, `data.js` with 7 products (see `company.md` §5). Its copy is good Bahasa and its structure (Tantangan → Solusi → Tentang → Layanan → Langkah Pemesanan) is the content skeleton, **but** its visuals are AI-slop-adjacent (centered hero, 3 equal cards, 1-2-3-4 row, fake-looking photos) and it shows prices/tiers that must go. Keep the *content*, replace the *design*.

### A3. Locked decisions (human, 25 Oct 2026) and logged deviations

| D# | Decision | Guardrail / note |
|---|---|---|
| D1 | **Astro, `output: 'static'`**, TypeScript, build-time npm only | No adapter, no `functions/`, no SSR. Exact-pinned deps, lockfile committed, `.nvmrc`. Node ≥ 22.22 |
| D2 | **Git-linked deploy** (GitHub → Cloudflare). Production only from `main`; branches get preview URLs | Public variables are set in the Cloudflare dashboard **or** committed in a public-only `.env.production`; see A9 |
| D3 | **Hosting = Cloudflare Workers with static assets**, not Pages. *Deviation from DNA* ("Pages", "no root `wrangler.*`") | Cloudflare's own Astro guide supports this and says a static Astro site needs no adapter. A root **`wrangler.jsonc` is allowed and must contain only**: `name`, `compatibility_date`, and `assets: { directory: "./dist" }` (+ `not_found_handling: "404-page"`). **No `main`, no `binding`, no `vars`, no secrets, no other bindings.** If you think you need more, stop and ask. The 3D proxy stays the separate existing Worker |
| D4 | **Fonts 2+1**: one display, one body, one tabular mono (numbers, labels, metadata only). *Deviation from "max 2 families"* | Self-hosted via `@fontsource`, weights actually used. Banned: Inter, Roboto, Open Sans, Arial/system-ui as the main face, Space Grotesk, Instrument Serif, Geist |
| D5 | **AI-generated imagery** until real photography exists. *Deviation from design.md §2.4* | Every such image is flagged `TEMP` in `docs/IMAGE_PROMPTS.md` and a code comment, follows the art direction in A6, and is easy to swap (one file per image, named by role) |
| D6 | **No visual or browser checks by the builder; no zip** | See A0 |
| D7 | **Bahasa Indonesia only**, `lang="id"`, formal-warm "Anda" | Terms AR, WebAR, 3D, QR stay as is |
| D8 | **Zero prices, zero statistics, zero third-party benchmarks, zero invented claims.** Copy is product-led | Enforced by `npm run check:content` (A7). Allowed numbers: counts derived from real data (products, AR models), step numbers, and the logo-button list |
| D9 | **Hero** = left-aligned editorial text + static AI furniture images riding animated ribbons + **one live 3D "room"** at the right (the real *Kursi Gitar* model) that doubles as a portal to that product's page. Accessibility and speed beat spectacle | Full spec in Phase 1 |
| D10 | **Light theme only.** Navy appears as ink and as occasional full-width bands, not as a dark mode | No `prefers-color-scheme` variants |
| D11 | **Pages**: Beranda `/`, Tentang `/tentang/`, Layanan `/layanan/`, Portofolio `/portofolio/` + product pages `/portofolio/<slug>/`, Kontak `/kontak/`, 404 | No Demo AR page, no calculator, no delivery-time guarantee, no Founding Partner, no pricing page |
| D12 | **Portfolio** = all products in `data.js` (7), shown exactly as a client's catalog would look, with all price/MOQ/tier/add-on data removed. **Web projects** = four logo buttons linking out (as on the legacy home page) | Counts derived from data |
| D13 | **Contact** = WhatsApp (primary), `lunarcreativa@gmail.com`, address, Instagram `@lunar_creativa`. No form | Per `company.md` |
| D14 | **Headline**: "Bawa Produk Anda Langsung ke Ruang Tamu Pembeli." | Blue only on the phrase "ke Ruang Tamu Pembeli" (whole phrase, never a single word) |
| D15 | **Domain**: temporary `*.workers.dev` URL now; `lunarcreativa.com` later | One `SITE_URL` constant + `SITE_INDEXABLE=false` until cutover |
| D16 | **WhatsApp button colour**: dark green fill `#0F7A3D` + white text; `#25D366` only as an icon accent. *(The old "[CHOOSE ONE]" from CHANGES item 4; builder-default, change = one token)* | Contrast script must pass |
| D17 | **Brand blue source is PENDING (H0).** Default Option A in `company.md` §4 | Report both swatches pair in Phase 1 for the human to choose |
| D18 | **One brand colour.** Blue is the only accent; navy is ink; semantic colours only for meaning | design.md §2.1 |
| D19 | **Furniture is the main goal; the proof is honest.** The portfolio shows lifestyle goods and one chair. Never imply a furniture AR portfolio exists | Copy rule T4 |

Items from `CHANGES_AND_DECISIONS.md` resolved here: (1) git-linked is the default for **this** project (D2); (2) Astro static approved (D1); (3) bucket-root keys (company.md §5); (4) WhatsApp green (D16); (5) account ownership: the proxy Worker already lives on LunAR's own account, no change; (6) the old master plan's `ar-modes` order is wrong and is **not** reused: use `scene-viewer webxr quick-look`.

### A4. Positioning and copy rules

**The one-line idea.** LunAR helps a furniture business let its customer *try the product in their own room before buying*, from a phone, with no app. Everything on the site serves that sentence.

**Voice.** Warm, direct, respectful (unggah-ungguh). "Anda", never "kamu/lu". Short sentences. Clear, not clever. Prefer Indonesian words over English fillers. No hype words (*revolusioner, inovatif, terdepan, terbaik, solusi lengkap satu atap, wujudkan, tingkatkan bisnis Anda ke level berikutnya*). No exclamation marks. No emoji.

**Headline formula** (from the transcript, adapted): **outcome + mechanism + "tanpa …"**. Example: *"Pelanggan mencoba produk di ruangannya sendiri, lewat HP, tanpa aplikasi."* Do not invent a time frame.

**Truth rules (enforced).**
- **T1** No statistics or benchmarks of any kind: no %, no "x kali lipat", no "terbukti", no market figures, no conversion/return claims, no "+94%".
- **T2** No money: no *Rp*, price, package, discount, "gratis", "murah", "terjangkau".
- **T3** No superlatives without proof (*terbaik, nomor satu, pertama di Indonesia*) and no competitor names.
- **T4** Honest proof: the AR portfolio is lifestyle goods (Grizelle) plus one chair. Say the focus is furniture and the chair is the start. Never write or imply "kami telah mengerjakan banyak proyek furnitur".
- **T5** State a capability only if it is true today: markerless WebAR, iOS AR Quick Look + Android Google Scene Viewer, no app, WhatsApp order button. These need `VERIFY`: "kami buat model 3D dari foto dan ukuran produk Anda", "QR untuk label produk di showroom", "akun dan domain tetap milik Anda", "model ringan, logo ditanam di tekstur, saran pendaftaran desain (HAKI)", team size, reply time.
- **T6** Every unconfirmed fact gets `// VERIFY` in code and a line in `docs/VERIFY.md`, with non-committal wording (agent.md M10).
- **T7** Anything illustrative is labelled ("Ilustrasi percakapan", "Gambar ilustrasi"). No fake testimonials, no fake logos, no "Dipercaya oleh" (use the factual "Situs yang sudah kami bangun").
- **T8** WhatsApp pre-filled text per context, e.g. *"Halo LunAR, saya ingin tahu bagaimana produk saya bisa dicoba pelanggan lewat AR."*; per product: *"Halo LunAR, saya tertarik dengan demo AR Kursi Gitar."*

Headings are Title Case in Bahasa (as in the profile and the approved H1); body is sentence case.

### A5. Design system (tokens, type, motion, performance)

**Tokens** live in one file `src/styles/tokens.css` (hex values appear nowhere else except the QR helper and the brand SVG sources; `npm run check-hex` fails the build otherwise).
- Colour: brand blue ramp 50 to 950 (from H0 choice), tinted neutrals (tint every grey toward the brand hue; **no `#000`, no `#fff`-on-`#000`, no zero-chroma greys**), ink = tinted navy, one surface tint for page, one slightly deeper for bands. Semantic: success/warning/danger/info fixed; WhatsApp per D16.
- **Contrast is computed:** `npm run contrast` prints every text/surface, fill/text and control-border pair. Body ≥ 4.5:1, large text ≥ 3:1, control borders/icons ≥ 3:1. Fix tokens until it passes (agent.md M6). The brand blue as a **fill with white text** must pass 4.5:1; if the base blue fails, the fill uses a darker step.
- Spacing: 4px base (multiples of 4 only). **Vary section rhythm on purpose** (different vertical padding and container width per section, all multiples of 4). Do not give every section the same `py` and `max-w`.
- Radius: a small token set (e.g. 4 / 8 / 16 / 24) and the **concentric rule** (inner radius = outer radius minus padding). No uniform 8px everywhere, no pill-shaped rectangles.
- Elevation: hairline borders (1px) and whitespace first. A shadow, if any, is soft, low-opacity, neutral (never brand-coloured), and never on top of a border on the same element.
- Type: **max 6 sizes**, display tracking about -2% to -3%, line-height about 110 to 120% on display; body line length 60 to 75ch; `font-variant-numeric: tabular-nums` on every number; mono only for numbers, step indices, small labels.
- Icons: **functional only** (arrow, WhatsApp, QR, AR cube, close, menu), one consistent set, 24px, aligned to the text line. Never an icon-in-a-coloured-circle as a layout pattern.
- Interactive states on everything clickable: default, hover (desktop), active, focus-visible (brand ring), disabled; loading/success where it applies (design.md §6). 44px minimum targets. One `h1` per page.
- Accessibility floor: skip link, visible focus, `prefers-reduced-motion` honoured everywhere, `aria-live` for dynamic status, meaningful `alt`, `lang="id"`.

**Motion rules**
- Animate **only `transform` and `opacity`** (plus `clip-path` where noted). No `transition: all`. Easing `cubic-bezier(0.23, 1, 0.32, 1)` (ease-out) for UI; durations 150 to 400 ms for UI, longer only for choreographed scenes.
- **No scroll hijacking, no smooth-scroll libraries (no Lenis)**; native scroll only. Scroll-linked effects use `position: sticky` + IntersectionObserver/ScrollTrigger reading scroll, never writing it.
- **A different motion idea per section** (list in Phase 1). Never the same fade-up on every block. No universal `hover:scale`, no float-on-hover for non-clickable things.
- Popovers anchor their `transform-origin` to their trigger.
- `prefers-reduced-motion: reduce` → no looping, no parallax, no ribbon animation; render the **final resting composition** (ribbons drawn once, furniture in place).
- Pause everything when off-screen or when the tab is hidden. Cap device pixel ratio (1 on small screens, max 1.5 elsewhere). A frame-time guard downgrades or freezes the ribbon if the device is slow.
- Content must **never** depend on JS or WebGL to be visible. Anything that starts hidden for animation has a timeout that reveals it (about 2.5 s) and a no-JS default of "visible".
- Libraries allowed: **GSAP (+ ScrollTrigger)**, exact-pinned; WebGL for the ribbon either raw WebGL, a tiny library (e.g. OGL), or three.js **only if** you measure it and keep within budget (note `<model-viewer>` already bundles its own three; do not ship a second copy without need). Motion modules are **dynamic imports** after first paint.

**Performance budgets (targets; `npm run budget` prints actuals from `dist/`, report them)**
- Critical JS per page (non-lazy) ≤ 20 kB gzip. Lazy motion (GSAP + scenes) ≤ 90 kB gzip. Ribbon chunk ≤ 60 kB gzip (raw WebGL/OGL) or ≤ 160 kB if three.js is justified in writing. `<model-viewer>` stays lazy and is never on the LCP path.
- Hero LCP image ≤ 120 kB at mobile size (AVIF/WebP), explicit width/height, `fetchpriority="high"`; CLS about 0; first load over the wire ≤ 1 MB before scrolling, excluding `<model-viewer>` and models.
- Images through the build optimiser (`astro:assets` / `sharp`), responsive `srcset`, no upscaling, lazy below the fold.
- Design **mobile first at 360 px**; most visitors are on phones.

### A6. Anti-slop checklist and image art direction

**Never ship (condensed from the Slop document; check every section):**
Purple/indigo/neon gradients, gradient text, blurred glowing orbs, glassmorphism with nothing behind it, coloured glow shadows, pure `#000`, zero-chroma greys, beige/terracotta "AI-warm" default · one-word italic or gradient accent in a headline (accent a whole meaningful phrase or nothing) · pill badge eyebrow above headlines (no emoji badges, no "✨ NEW") · single-font Inter look, "trendy" Space Grotesk/Instrument Serif/Geist trio · centered 100vh hero with two buttons · 4-number stat strip (and there are no stats anyway) · three equal icon cards · dashed "1-2-3" connector row · centered CTA banner box repeating the hero · ghost containers (a card around every block) · border + big shadow on the same card · 4px coloured left/top accent stripe on cards · identical 8px radius everywhere · fake browser/IDE traffic-light chrome · crude hand-coded SVG illustrations (circles, rects, stick diagrams) · Lucide + emoji on every line · stacked avatars with "+2.000 lainnya" · same fade-up on every section · `hover:scale-105` on everything · `transition: all` · centre-scaling popovers · unconstrained line length · missing `tabular-nums` · highlighter band at the baseline.
**Do instead:** asymmetric 60/40 or editorial splits, an interactive product surface in the hero, bento or editorial layouts, hairlines instead of boxes, tinted neutrals, a real product/phone/room image or a real QR, tactile grain only if it earns its place.

**Image art direction (AI-generated, TEMP; D5).** One consistent look across *all* images: soft daylight from a window, warm-white and soft grey-blue interiors with the brand blue as the only saturated accent, 35 mm eye-level for rooms, 3/4 studio view with a soft ground shadow for cut-outs, real Indonesian home proportions (Type 36 to 70 living rooms, tile or wood floors), no text, no logos, no brand marks, no people unless needed (and then no visible hands/faces problems).
- **Furniture cut-outs: at least 8 DISTINCT pieces** with different silhouettes, materials, heights and camera angles. **Never a duplicate or a mirrored copy of another piece** (the concept sketch did this; do not). Suggested set: lounge armchair (wood frame, linen cushion) · low walnut sideboard with sliding doors · tripod floor lamp with linen shade · 3-seat fabric sofa · rattan dining chair · round oak coffee table · open ladder bookshelf · upholstered bench/ottoman · (optional) arched floor mirror, side table with vase. Each must read clearly at about 120 px wide.
- **Defect check (once per image, by you):** wrong leg/arm counts, melted joints, floating furniture, mismatched shadows, warped perspective, garbled text or logos, cropped edges, fringing on the cut-out. Regenerate or reject.
- **Transparent background:** true alpha PNG/WebP (generate on plain neutral and cut out with a script, or use the tool's alpha output). Then optimise to AVIF/WebP.
- **Room image(s):** an empty, tidy living room with clear floor space and a window on the left. It is the backdrop of the hero "room" and must leave a clean spot where the real chair model stands.
- **Phone/AR screens:** AI images of a phone in a room are acceptable as TEMP; the **QR code is always real** (generated at build, scannable).
- If you have **no image-generation tool**: write the complete prompts and filenames to `docs/IMAGE_PROMPTS.md`, use flat tinted placeholders that are obviously TEMP, and tell the human in the first message. They will generate and drop files in.
- Replace-ability: one file per role under `src/assets/images/<role>.<ext>`; the manifest in `docs/IMAGE_PROMPTS.md` lists role, prompt, size, alpha yes/no, status (`TEMP`/`final`).

### A7. Conventions, folders, scripts

```
legacy/                      git-ignored, read-only
docs/
  plan/                      these phase files
  DECISIONS.md               D-table + "appended by agents" log
  VERIFY.md                  every unconfirmed fact
  INFRA_RUNBOOK.md           human click-by-click steps (A9)
  IMAGE_PROMPTS.md           image manifest + prompts
public/                      favicon set, og-default.png, robots.txt, (_headers if used)
src/
  assets/brand/              logo svgs (metadata stripped), favicon source
  assets/images/             role-named images
  components/                Wordmark, Header, Footer, WhatsAppLink, ModelStage, ArButton, QrPopover, ProductCard, PartnerLinks, ...
  data/                      site.ts (facts + SITE_URL + flags), products.ts, partners.ts
  lib/                       r2.ts, whatsapp.ts, qr.ts, jsonld.ts, seo.ts
  motion/                    ribbon.ts, rise.ts, scenes/*.ts, reduced.ts, guard.ts
  pages/                     index, tentang, layanan, kontak, 404, portofolio/index, portofolio/[slug]
  styles/                    tokens.css, base.css
scripts/                     contrast, check-hex, favicons, og, budget, check-content, check-assets, check-html
wrangler.jsonc               assets only (D3)
```
- `npm run dev | build | preview | check | contrast | check-hex | favicons | og | budget | check:content | check:assets | check:html | test`. `npm run check` = type check + hex + contrast + content + assets + html + test, and **must pass before every report**.
- Static-HTML checks use a parser (cheerio/node-html-parser) on `dist/`; unit tests (vitest) cover **pure logic only** (model-stage state machine, R2 key validator, WhatsApp URL builder, JSON-LD builder). No browser anywhere.
- `check:content` fails on: `Rp`, digits followed by `%`, "juta", "ribu", "gratis", "murah", "terbukti", "terbaik", "konversi" with a number, any emoji, `lunar.id`, `@lunarcreativa.com`, `*.r2.dev`, `pages.dev` references. It lists every `VERIFY` it finds.
- `check:html` asserts: exactly one `h1` per page, `lang="id"`, every `<model-viewer>` has `ar-modes="scene-viewer webxr quick-look"` **in that order**, `src` and `ios-src`, no `webxr` first (M1), canonical uses `SITE_URL`, `noindex` iff `SITE_INDEXABLE=false`, internal links resolve, images have `alt`, nothing hex-coloured inline.
- R2 helper `R2(file)` builds `https://grizelle-3d.lunarcreativa.workers.dev/<file>`; product data stores **file names only**. `check:assets` validates names against the Worker key rule *except* the known legacy exceptions listed in `company.md` §5 (it prints them as warnings so the human sees them).
- Git: small commits, conventional messages, `[CI Skip]` at the start of a commit message to skip a Cloudflare build when only docs change.

### A8. Stop-and-ask list (halt, do not decide silently)

A request that needs a server, database, form, login, payment, or private key (Tier B, security.md §2.2) · any need to add an adapter, `functions/`, `main`, a binding or secrets to `wrangler.jsonc` · any copy that wants a number, price or benchmark · a fact you cannot source from `company.md` · a real furniture claim beyond T4 · the logo-colour choice (H0) if you cannot proceed with the default · you notice a DNA conflict not logged in A3 · the model-viewer needs a different `ar-modes` order · you are about to add a second loud colour or a fourth font.

### A9. Who does what (the human handles all Cloudflare, GitHub and devices)

| ID | Human step | When |
|---|---|---|
| H0 | Choose the brand blue source (company.md §4 Option A or B) after seeing the swatch report | End of Phase 1 task P1-02 (you can continue with Option A meanwhile) |
| H1 | Create the GitHub repo, push `main` and the phase branch | After Phase 1 |
| H2 | Cloudflare dashboard: **Workers & Pages → Create application → connect Git repo → build command `npm run build`, deploy command `npx wrangler deploy`**, production branch `main`; read the first build log; note the real `*.workers.dev` URL | After H1 |
| H3 | Put the real URL into `SITE_URL` (or ask the builder to) and redeploy | After H2 |
| H4 | **Existing proxy Worker** (`grizelle-3d`): add this site's origin(s) to its allowed origins (exact `https://…workers.dev`, no trailing slash; the preview pattern for branch previews; later `https://www.lunarcreativa.com` and `https://lunarcreativa.com`). Check each model URL in a tab and with the DevTools snippet in `playbook.md` §5. Upload `guitar-chair-4.usdz` (new name) and tell the builder | Before the first device test |
| H5 | Supply the Kursi Gitar **poster render** (transparent PNG/WebP, about 1200 px) and confirm the model is real-world scale in metres | Before launch (TEMP placeholder until then) |
| H6 | Real-device test matrix (`playbook.md` §6): iPhone Safari Quick Look, Android Chrome → Google Scene Viewer (not a bare X), desktop QR popover, a real mobile SIM, model-fail fallback (rename the model in R2 → photo/poster, no error text) | After each deploy that touches 3D |
| H7 | Visual review at 360 px and desktop; Lighthouse mobile (record numbers); keyboard-only pass | After each phase |
| H8 | Later: buy `lunarcreativa.com`, attach it to the Worker, flip `SITE_INDEXABLE`, update Worker origins | Launch |

If the first Cloudflare build log shows anything about Functions, bindings or an adapter, **stop and tell the builder** (D2 guardrail). **Env var trap (M2):** the Worker URL is public, so keep it in `src/data/site.ts` (not in an env var). If you add any `PUBLIC_*` variable, a git-linked build does not see your local `.env`; it must be set in the dashboard build settings or committed in `.env.production`, followed by a new deployment.

### A10. End-of-phase report (always this format)

**Done (by task ID) · Deviations · Open items and VERIFYs · How to run and verify locally**, then the two checklists below as **pass / N/A / deviation D#**, then the sentence *"Looks, motion, WebGL, model-viewer and AR were not run or eyeballed."*

Pre-ship checklist (trimmed from design.md §12 and security.md §10 for this project):
- [ ] One brand colour + ramp; no second loud colour · ≤ 3 font families (2+1, D4), ≤ 6 sizes · headings tracking -2 to -3%, line-height 110 to 120% · spacing multiples of 4
- [ ] Every control has default/hover/active/focus/disabled · text over photos has a gradient or panel treatment · no inverted-dark-mode (light only)
- [ ] AR CTA visually distinct (outlined, accent), markerless only, **only visible after the model loaded**
- [ ] `ar-modes="scene-viewer webxr quick-look"` on every model-viewer, asserted by `check:html`; `src` + `ios-src`; both via the proxy Worker
- [ ] 3D-first with a **tested pure-logic** failure path to the 2D/poster (device failure test is H6)
- [ ] Contrast script green · logo inlined, favicons generated, OG card present and `TEMP`
- [ ] Every unconfirmed fact tagged `VERIFY` · WhatsApp CTA pre-filled · copy in Bahasa · **no Rp, no %, no stats (D8)**
- [ ] No `*.r2.dev` · no secrets · no `localhost` assumed in code · `wrangler.jsonc` matches D3 exactly · no adapter/functions
- [ ] Budgets printed and reported · reduced-motion path exists for every animation · nothing hidden if JS/WebGL fails


---

# PHASE 1 — Foundation, design system, hero and Beranda

**Branch:** `phase-1` · **Status:** ☐ not started · **Owner:** builder (human steps marked **H#**)

## 1.0 Builder prompt (copy-paste to start the session)

```
You are the builder for the LunAR website revamp, Phase 1 of 2.

Before writing any code:
1. Read, in this order: agent.md, company.md, design.md, security.md, playbook.md,
   then docs/plan/PHASE_1_*.md (this file, including the SHARED CONTEXT A0 to A10).
   If any of them is not in your context, say so and re-read from disk.
2. In your FIRST message tell me: which environment you are in (your own machine,
   can run local commands, cannot reach Cloudflare/GitHub/phones), whether you have an
   image-generation tool, and anything in the plan that is unclear, contradictory or
   missing a file. Do not start building until I answer, unless nothing is unclear.
3. Obey A0: no screenshots, no browsers, no Playwright, no Lighthouse; no zip; work on
   branch phase-1; do not push.

Then build Phase 1 task by task (P1-00 to P1-12), ticking the Progress tracker in this
file as you finish each task and appending dated notes to the Progress log.
Finish with the end-of-phase report in the format of A10.
```

## 1.1 Goal and scope

Ship a **complete, truthful, fast Beranda** plus everything the other pages will reuse: tooling, tokens, brand files, layout shell, data layer, motion system, the **3D model stage** and the **product detail route** (the hero's portal needs them). Inner pages (`/tentang/`, `/layanan/`, `/portofolio/`, `/kontak/`) exist only as thin placeholders marked `noindex` ("Halaman ini sedang disiapkan") so navigation works; Phase 2 replaces them.

**In scope:** P1-00 to P1-12 below. **Out of scope:** the real content of the four inner pages, sitemap/JSON-LD polish, 404 polish, launch runbook (Phase 2).

### Inputs the builder needs but may not have (ask in the first message)
- Image-generation tool? (A6 fallback if not.)
- `legacy/` unzipped in the repo? (needed for logos and 7 product photos; the two stray product images without data are unused.)
- The Kursi Gitar poster render is **not available yet (H5)** → use a clearly marked TEMP placeholder and keep the swap to one file.

## 1.2 Progress tracker

Legend: ☐ todo · ◐ in progress · ☑ done · ⚠ blocked. Update this table in place.

| ID | Task | Owner | Status | Notes |
|---|---|---|---|---|
| P1-00 | Pre-flight: read all files, create `docs/DECISIONS.md` (D1 to D19), `docs/VERIFY.md`, place `legacy/` | Builder | ◐ | Source discrepancy recorded; legacy preserved |
| P1-01 | Scaffold Astro static + TS + scripts + `wrangler.jsonc` (assets only) + `.nvmrc` + `.gitignore` | Builder | ◐ | Install blocked; lockfile and build pending |
| P1-02 | Tokens, contrast + hex scripts, fonts, base CSS; **swatch report for H0** | Builder | ◐ | Scripted contrast passes; H0 remains open |
| P1-03 | Brand files: inline Wordmark, favicon set, OG card (`TEMP`) | Builder | ◐ | SVG wordmark ready; raster icons and OG build pending packages |
| P1-04 | Data layer: `site.ts`, `products.ts` (7, cleaned), `partners.ts`, `r2.ts`, `whatsapp.ts`, `qr.ts` | Builder | ◐ | Seven company-listed rows; source data mismatch documented |
| P1-05 | Layout shell: SEO head, Header (+ mobile sheet), Footer, skip link, placeholders for inner pages | Builder | ◐ | Shell and placeholders implemented; build validation pending |
| P1-06 | Image pipeline + image manifest + generate/commission assets | Builder | ◐ | Manifest and TEMP placeholders; image generation unavailable |
| P1-07 | `ModelStage` component + pure state machine + unit tests + QR popover + product detail route | Builder | ◐ | Source written; dependency-backed tests pending |
| P1-08 | Hero: composition, ribbons, furniture rise, room portal, fallback ladder | Builder | ◐ | Composition and fallback written; final scene assets/motion pending |
| P1-09 | Beranda sections S2 to S8 (copy deck + one motion idea each) | Builder | ◐ | Sections present; distinct scene motion pending |
| P1-10 | Motion system: loader, reduced-motion, guard, scenes; budget script | Builder | ◐ | Loader/reduced-motion and budget script; no WebGL scene yet |
| P1-11 | Checks: `check`, `check:content`, `check:html`, `budget` all green | Builder | ⚠ | Build checks blocked by registry TLS install error |
| P1-12 | Docs: `INFRA_RUNBOOK.md`, finalise `VERIFY.md`, `IMAGE_PROMPTS.md`, end-of-phase report | Builder | ◐ | Human runbook and report document remaining gates |
| H0 | Pick brand blue (A vs B) | Human | ☐ | |
| H1 to H3 | GitHub repo, Cloudflare connect, real URL into `SITE_URL` | Human | ☐ | after build |
| H4 | Add site origin to the Grizelle proxy Worker; rename chair `.usdz` | Human | ☐ | |
| H5 | Supply chair poster render | Human | ☐ | |
| H6, H7 | Device + visual review | Human | ☐ | |

## 1.3 Tasks in detail

### P1-00 Pre-flight
- Confirm the repo is empty or a fresh git repo. Create the A7 folder tree.
- `docs/DECISIONS.md`: table of D1 to D19 (copy from A3) + an "Appended by agents" log. Add D20+ for anything new you decide (e.g. font choice, ribbon tech) with date and reason.
- `docs/VERIFY.md`: start the list from `company.md` and A4-T5.
- Tell the human, in the first message, about three known data issues: legacy has **7** products (not 9); the chair's `.usdz` name has spaces; `material: 'Miniso'` on the chair is wrong.

### P1-01 Scaffold
- Astro with `output: 'static'`, TypeScript strict, **no adapter, no integrations that need a server**. Exact-pinned deps, `package-lock.json`, `.nvmrc` (Node ≥ 22.22).
- `wrangler.jsonc` exactly per D3:
  ```jsonc
  {
    "$schema": "./node_modules/wrangler/config-schema.json",
    "name": "<worker-name>",            // human chooses in dashboard; use "lunar-site" as the file default and say so
    "compatibility_date": "<today>",
    "assets": { "directory": "./dist", "not_found_handling": "404-page" }
  }
  ```
  Install `wrangler` as a devDependency only so the dashboard's deploy command works. Do not run `wrangler login` or `wrangler deploy` yourself. Before relying on `_headers` or `_redirects` files for Workers static assets, check Cloudflare's current docs (A0 says you cannot browse: if you cannot verify, **do not use them** and note it in `INFRA_RUNBOOK.md`).
- Scripts per A7 (stubs allowed until their task). `.gitignore`: `node_modules`, `dist`, `.astro`, `.env`, `.dev.vars*`, `legacy/`, `.wrangler`.
- `.env.example` with comments only (and note that editing it configures nothing, M2).

### P1-02 Tokens, type, contrast
- Build `tokens.css` per A5. Generate the blue ramp from H0 Option A; also compute Option B and print **both** as a swatch table (hex + contrast vs white and vs ink) in the report so the human can choose. Do not block on the answer.
- Choose the three fonts and log them as a D-number: a **display** face whose geometry echoes the logo's rounded geometric forms (evaluate 3 candidates on `@fontsource`, none from the banned list, e.g. families like Outfit, Sora, Urbanist, Red Hat Display, Figtree; you decide, justify in one line), a **body** face (Plus Jakarta Sans is the legacy and the DNA safe default, acceptable), and a **tabular mono** (e.g. JetBrains Mono, IBM Plex Mono, DM Mono). Only weights actually used.
- `npm run contrast` prints every pair; it must exit non-zero on a failure. `npm run check-hex` scans `src/` for hex outside `tokens.css`, the QR helper and brand SVG sources.
- Type scale: 6 sizes (about 64/40/28/20/16/14), display tracking -2 to -3%, line-height 110 to 120%.

### P1-03 Brand files
- Copy the three logo SVGs to `src/assets/brand/`, **strip the `<metadata>` C2PA block**, escape any raw `&`, make sure each has `viewBox` and no `width/height="100%"` (M3). A `Wordmark` component **inlines** the horizontal logo (header), stacked (footer or loader), icon (favicon source). Keep the supplied colours untouched under Option A; under Option B map fills to tokens.
- `npm run favicons` per `playbook.md` §1 → `public/favicon.svg`, `favicon-32.png`, `apple-touch-icon.png`. Use `sharp` (build-time).
- `npm run og` → `public/og-default.png` 1200×630 from logo + tagline + tokens, **marked `TEMP`** in a code comment and in `docs/VERIFY.md`.

### P1-04 Data layer
- `site.ts`: company facts from `company.md` (name, WhatsApp, email, address, Instagram), `SITE_URL` (default placeholder constant with a loud comment, e.g. `https://www.lunarcreativa.workers.dev`, **VERIFY**, replaced in H3), `SITE_INDEXABLE = false`, `ASSET_BASE = 'https://grizelle-3d.lunarcreativa.workers.dev'`.
- `products.ts` (7 products, from `company.md` §5 and `legacy/js/data.js`): `slug, name, category, description (rewritten, no prices), dimensions (only if real), media: { photo?, model: { glb, usdz } }, hasAR (derived), arPlacement ('floor' for the chair only)`. **Delete** prices, tiers, MOQ, add-ons, "bestSeller", `material` unless confirmed. Descriptions describe the *product and the AR experience*, and where it came from: "Katalog interaktif yang dibangun LunAR untuk Grizelle Souvenir". Counts are computed.
- `partners.ts`: the four logo buttons from `company.md` §6 (copy the PNGs to `src/assets/partners/`, optimise).
- `r2.ts`: `R2(file)` helper + key validator (pure, unit-tested). Files are used **as listed**; `check:assets` warns on the known exceptions.
- `whatsapp.ts`: `waLink(text)` → `https://wa.me/6288216564572?text=<encoded>` with `rel="noopener"`; `qr.ts`: build-time QR as inline SVG (error correction Q, 4-module quiet zone, pure black on white, flat tile) using a build-time `qrcode` package.

### P1-05 Layout shell
- `BaseLayout`: `<html lang="id">`, title/description per page, canonical from `SITE_URL`, OG/Twitter, `robots` meta driven by `SITE_INDEXABLE`, preload of the hero LCP image, font preloads, skip link, one `h1` rule.
- **Header** docked at the top edge (not a floating pill, no glass): left-aligned inline logo, five links (Beranda, Tentang, Layanan, Portofolio, Kontak) with `aria-current`, one WhatsApp button "Hubungi Kami" (D16 style). Mobile: a menu button opening a full-height sheet with focus trap, Esc to close, safe-area padding, 44 px targets. Header uses a 1px hairline, no shadow.
- **Footer**: stacked or horizontal logo, one-line description, nav, contact (WhatsApp number, `lunarcreativa@gmail.com`, address, Instagram), "© 2026 LunAR. Dibuat di Surakarta." No newsletter, no icon row.
- Placeholder pages for Tentang, Layanan, Portofolio index, Kontak: real layout, `noindex`, short honest line. (Portofolio **detail pages are real**, see P1-07.)

### P1-06 Image pipeline and assets
- Create `docs/IMAGE_PROMPTS.md` with the manifest below. Follow A6 (art direction, defect check, alpha). Generate what you can; the rest stays as TEMP placeholders with the prompt written.
- Pipeline: raw source in a git-ignored `assets-src/`, optimised outputs in `src/assets/images/` through `astro:assets`/`sharp` (AVIF + WebP, `srcset`, explicit dimensions).

| Role (file) | Subject | Ratio | Alpha | Used in |
|---|---|---|---|---|
| `hero-room` | Empty living room, window left, clear floor spot centre-right, Indonesian proportions, daylight | 4:5 (also a 1:1 crop) | no | Hero room backdrop + LCP |
| `fur-armchair`, `fur-sideboard`, `fur-lamp`, `fur-sofa`, `fur-diningchair`, `fur-coffeetable`, `fur-bookshelf`, `fur-bench` | **8 distinct pieces** (A6), no mirrored duplicates | free (long edge about 900 px) | **yes** | Hero ribbons, section accents |
| `chair-poster` | Kursi Gitar poster render | 1:1 | yes | **Human-supplied (H5)**. TEMP neutral placeholder until then |
| `phone-ar-step3`, `phone-ar-step4` | Phone showing a chair placed on a floor (floor grid, then placed) | 9:19 | no | Cara kerja, steps 3 and 4 (TEMP) |
| `problem-photo` | A person on a sofa comparing a product page on a tablet with a measuring tape nearby, clearly *not* a stock-pose smile | 3:2 | no | S2 |
| `bento-ar`, `bento-3d`, `bento-webar`, `bento-strategy` | Four distinct, calm service visuals (a chair in a room via phone; a clay-shaded 3D chair; a laptop with a product page; hands over a table of printouts) | mixed | no | S4 |
| `proc-*` | Optional small images for the process rail; skip if text carries it | | | S7 |

### P1-07 `ModelStage` + product detail route
This is the reusable 3D unit for the hero **and** every product page. Build the state machine as **pure TypeScript** and unit-test it; the DOM layer just renders `data-state`.
- States: `idle → armed → loading → ready | failed`, plus `constrained` (see below). Transitions: `armed` when the stage nears the viewport and the browser is idle; `loading` starts the dynamic `import('@google/model-viewer')` (**exact-pinned npm package, lazy, never on the LCP path**); `ready` on the element's `load`; `failed` on the element's `error`, on import failure, or after a **15 s timeout**. After `failed`, the AR button stays hidden and a retry never leaves a ghost button.
- `constrained` (Save-Data, `slow-2g`/`2g`, `prefers-reduced-data`): do **not** auto-load; show a clear button **"Muat Tampilan 3D"**. Pressing it enters `loading`.
- Render: poster/photo first (the `<img>` is the real LCP/fallback element), model-viewer swaps in when ready, never layout-shifts (fixed aspect box).
- `<model-viewer>` attributes: `src`, `ios-src`, `ar`, **`ar-modes="scene-viewer webxr quick-look"`**, `camera-controls`, `disable-zoom`, `touch-action="pan-y"`, `shadow-intensity`, `alt` (Indonesian), `reveal="manual"`/poster handling as needed, `ar-placement="floor"` for the chair only, `ar-scale="fixed"` for furniture (`VERIFY` real-world scale, H5). No marker AR.
- **AR button**: created in the `ar-button` slot, outlined pill in the brand accent, distinct from primary buttons, text **"Lihat di Ruangan Anda"**, shown **only** in `ready`. On desktop (no AR) it is replaced by a **QR popover** "Lihat di HP Anda" (real QR to the product page; popover `transform-origin` at its trigger; closes on Esc/outside; focus managed).
- Status: an `aria-live="polite"` line ("Menyiapkan pratinjau 3D…", "Pratinjau 3D siap", nothing alarming on failure: the fallback image simply stays). A short branded loading treatment (logo + the line above) shown only while `loading`, never a frozen spinner.
- **Detail route** `portofolio/[slug]` (all 7, static): title, category, short description, `ModelStage` (media-priority per design.md §8 table: 3D first when a model exists, photo via a thumbnail/secondary control when both exist, photo-only gallery, failure → photo/poster), attribution ("Dibuat untuk Grizelle Souvenir"), a pre-filled WhatsApp CTA (T8), back link. **No price, MOQ, tiers or add-ons.** The chair page uses the TEMP poster until H5.
- Unit tests: machine transitions incl. timeout, retry, constrained path; `R2` validator; `waLink`.

### P1-08 Hero (D9): the signature piece
**Composition (desktop ≥ 1024 px).** 12-col grid, asymmetric 7/5. **Left:** left-aligned editorial block: H1, one sub paragraph (≤ 60ch), one primary action and one quiet text link. **Right:** the **Ruang** ("room"): a tall framed window onto `hero-room` with the live chair standing in it. **Ribbons** sweep around the page edges and the room frame; **furniture images** ride them upward. Mobile (< 768): H1, sub, CTA, then the Ruang (4:5, max 70 svh), a smaller furniture cluster, simplified ribbon.

**Copy (starting point; refine within A4):**
- H1: **Bawa Produk Anda Langsung ke Ruang Tamu Pembeli.** Set in the display face; the phrase "ke Ruang Tamu Pembeli." takes the brand blue (plain colour: **no italics, no gradient, no underline band**); nothing else in the headline is accented.
- Sub: *"LunAR membuat produk Anda bisa diputar, dilihat dari segala sisi, dan ditaruh di ruangan pembeli lewat HP mereka sendiri. Cukup scan atau buka tautan, tanpa aplikasi. Dibuat untuk bisnis furnitur dan produk rumah."*
- Primary: **Ceritakan Produk Anda** (WhatsApp, D16 style, pre-filled T8). Quiet link: **Coba kursinya di ruangan Anda ↓** (scrolls/focuses the Ruang).
- Small print under the CTA: *"Biasanya dibalas dalam satu hari kerja."* `VERIFY`.
- Ruang caption: *"Kursi Gitar · model 3D asli. Geser untuk memutar."* and a text link **"Buka halaman produk →"** to `/portofolio/kursi-gitar/` (the portal).
- No pill eyebrow, no stat strip, no second CTA button, no avatars.

**Ribbons.** Two or three twisted bands in brand blue/navy tints (no purple, no neon, no glow, no gradient text). They are **decorative progressive enhancement**: the page is complete without them. Implementation is your call within A5 (raw WebGL, OGL, or three.js if justified): a parametric twisted ribbon with simple lighting, drawn on one `<canvas>` behind the content, `pointer-events: none`, `aria-hidden`. Rules: ribbons **never pass behind text** (define keep-out rectangles from the layout and route the paths around them); intro draw-in about 1.2 to 1.6 s; then a very slow idle drift; scroll adds small twist/offset; **pause when off-screen/hidden**; DPR cap; frame-time guard (A5) freezes it to a single drawn frame; reduced-motion = one drawn frame, no loop; no WebGL = no ribbon (the composition still works).

**Furniture rise.** At least 6 (desktop) / 3 (mobile) **distinct** cut-outs (A6). After the ribbon starts, pieces travel **upward along the ribbon paths** to their resting places with staggered timing and a small settling rotation; then an idle float of ≤ 6 px and ≤ 0.5° only while visible; scroll parallax by depth (near = faster, bigger; far = slower, smaller, slightly lower opacity; **no blur filters**). No piece may overlap text or the Ruang's controls. Depth/size/overlap is composed by hand so nothing looks mirrored or repeated.
- **Safety (important):** the HTML/CSS default is the **final resting composition, fully visible**. A tiny inline script in `<head>` adds `class="js"` to `<html>`; only under `.js` do pieces start offset/hidden, and a **2.5 s timeout** adds a class that forces the final state if the motion module has not taken over. Without JS, with reduced motion, or on failure, the hero is a clean static composition.

**The Ruang (D9).** `hero-room` fills the frame (rounded with a concentric radius, 1px hairline border, no heavy shadow). The `ModelStage` sits over it with a **transparent** model-viewer so the real chair appears to stand in the room (`--poster-color: transparent`, soft contact shadow, neutral environment). Poster state shows the room + `chair-poster` at the same position, so there is no jump when the model arrives. AR button and QR popover live in the frame. The frame is also the portal: the caption link goes to the product page; clicking the frame's chair interacts with the model (do not hijack scroll: `touch-action: pan-y`, `disable-zoom`).

**Fallback ladder (write these as comments in the code):** (1) no JS → static composition; (2) reduced motion → final frame, no loops; (3) no WebGL or slow device → no ribbon, furniture static; (4) constrained connection → no model auto-load, "Muat Tampilan 3D" button; (5) model failed/missing → poster/photo stays, link to product page still works.

### P1-09 Beranda sections and copy deck

Each section has **its own layout and its own motion idea** (A5). All text below is a starting draft; keep within A4, tag unconfirmed lines `VERIFY`, add no numbers/prices.

| # | Section | Layout (non-template) | Motion idea (distinct) |
|---|---|---|---|
| S2 | **Masalah** | Editorial split: big typographic question left; right a **designed chat thread** (HTML, labelled "Ilustrasi percakapan") and `problem-photo`. Three problems as **hairline-separated rows of unequal width**, not cards | Chat messages arrive one by one as the section crosses the viewport; the last message ("…saya ukur ruangan dulu ya.") lands and the three rows **draw their hairlines** (scaleX from left) |
| S3 | **Cara Kerja** | Left: sticky **phone frame** whose screen changes; right: four step blocks (Scan, Buka, Tempatkan, Rasakan) and a fifth line "Lalu pesan lewat WhatsApp". Mobile: stacked, one phone image per step | The phone screen **cross-fades** as each step enters (IntersectionObserver, native scroll). Step 1 shows a **real, scannable QR** to the chair's product page; step 2 the branded loading screen built in HTML; steps 3 and 4 TEMP AI images |
| S4 | **Layanan** | **Asymmetric bento**: one large 2fr tile (Augmented Reality) beside a 1fr stack (Visualisasi 3D, Pengalaman WebAR), plus a wide strip (Strategi Pengalaman Digital). Tiles are links to `/layanan/` | Each tile **unfolds with `clip-path: inset()` from a different origin** (corner, edge); hover on links = underline slide only |
| S5 | **Untuk Bisnis Furnitur** | Sticky left heading; right a **list of rows with large mono indices** separated by hairlines (no cards, no icons) | Rows **mask-reveal their text** line by line; the active row (nearest the viewport centre) gets full ink, others soften (opacity only) |
| S6 | **Portofolio** | Horizontal **scroll-snap rail** of product cards (chair first, then the other six): photo → name → category → AR badge; **no price**. Under it a plain row of four **logo buttons** "Situs yang sudah kami bangun" | Rail has drag/keyboard scroll + a hairline progress indicator; no autoplay. Logo buttons: simple border-colour change on hover/focus |
| S7 | **Proses** | Four stages (Discover, Design, Develop, Deliver) along a **drawn line** that echoes the ribbon, text offset alternately left/right on desktop, stacked on mobile | The line **draws itself with scroll** (SVG `stroke-dashoffset`), each stage's text fades in only as the line reaches it |
| S8 | **Penutup** | Typographic closing section on a navy band: large statement, one WhatsApp action, contact row. **Not** a rounded banner repeating the hero | A single ribbon curve (same visual language) **arrives from the side and ends at the button** |

**Copy deck (Bahasa, draft v1):**

*S2 Masalah* — H2 **"Pelanggan Melihat Fotonya. Tapi Bisakah Mereka Membayangkannya?"** · body: *"Foto dan katalog menunjukkan bentuk produk. Tapi pertanyaan yang paling sering muncul sebelum membeli belum terjawab: muat atau tidak di ruangan saya? Cocok atau tidak dengan lantai dan dindingnya?"* · chat (illustrative): pelanggan *"Kak, ada ukuran lain untuk sofa L-nya?"* → admin *"(mengirim foto-foto)"* → pelanggan *"Terima kasih infonya Kak, saya ukur ruangan dulu ya."* · rows: **Visualisasi** *"Pelanggan sulit membayangkan produk di ruangan mereka sendiri."* · **Pengalaman Statis** *"Foto itu informatif, tapi pasif dan mudah terlewat."* · **Kepercayaan Membeli** *"Makin besar pembeliannya, makin besar keyakinan yang dibutuhkan."* · bridge line: *"Jawabannya sederhana: biarkan mereka mencobanya sendiri."*

*S3 Cara Kerja* — H2 **"Bagaimana Jika Mereka Bisa Mencobanya Sebelum Membeli?"** · lead: *"Pelanggan membuka produk Anda dari tautan atau QR, menaruhnya di ruangan mereka lewat kamera HP, dan memutarnya dari segala sisi. Tanpa aplikasi, tanpa daftar akun."* · **Scan** *"Pindai kode QR atau buka tautan yang Anda bagikan."* · **Buka** *"Halaman produk langsung terbuka di browser."* · **Tempatkan** *"Arahkan kamera ke lantai, lalu taruh produk di sana."* · **Rasakan** *"Putar, dekati, dan lihat dari berbagai sudut."* · closing line: *"Lalu pesan lewat WhatsApp, dari halaman yang sama."* · note *"iPhone memakai AR Quick Look; Android memakai Google Scene Viewer. Keduanya bawaan perangkat."* (true per DNA; no claim about coverage percentages)

*S4 Layanan* — H2 **"Apa yang Kami Kerjakan"** · **Augmented Reality** *"Produk Anda hadir di ruangan nyata pelanggan, dengan ukuran yang sesuai aslinya."* `VERIFY` (scale depends on each model) · **Visualisasi 3D** *"Model 3D yang menangkap bentuk, bahan, dan detail produk."* · **Pengalaman WebAR** *"Halaman katalog yang terbuka langsung di browser, tanpa instalasi aplikasi."* · **Strategi Pengalaman Digital** *"Kami bantu merancang pengalaman digital yang terhubung dengan tujuan bisnis Anda."* · link **"Lihat semua layanan →"**

*S5 Untuk Bisnis Furnitur* — H2 **"Dibuat untuk Showroom, Pabrik, dan Pengrajin Furnitur"** · rows: **01 Anda punya produk, bukan file 3D.** *"Kirim foto dan ukuran produk (panjang, lebar, tinggi). Kami yang membuat model 3D-nya."* `VERIFY` · **02 Satu tautan untuk dibagikan.** *"Kirim lewat WhatsApp, taruh di bio Instagram, atau cetak sebagai QR untuk label produk di showroom."* `VERIFY` (QR) · **03 Pembeli tidak perlu mengunduh apa pun.** *"Cukup buka tautan, lalu arahkan kamera."* · **04 Pemesanan tetap lewat WhatsApp.** *"Setiap produk punya tombol pesan dengan pesan yang sudah terisi."* · **05 Desain Anda tetap terlindungi sewajarnya.** *"Model yang kami buat ringan dan bukan file produksi, logo Anda ditanam di tekstur, dan kami sarankan mendaftarkan desain Anda."* `VERIFY` (security.md §6, wording stays honest: not "tidak bisa dicuri")

*S6 Portofolio* — H2 **"Produk Nyata, dalam AR"** · lead: *"Katalog AR pertama kami dibuat untuk Grizelle Souvenir, produk gaya hidup. Fokus kami sekarang furnitur, dan Kursi Gitar di sini adalah awalnya."* `VERIFY` ("pertama") · card actions **"Lihat dalam AR"** · sub-block H3 **"Situs yang Sudah Kami Bangun"** *"Selain AR, kami membangun situs bisnis lengkap untuk klien."* · four logo buttons (`aria-label="Kunjungi situs <nama>"`, open in a new tab with `rel="noopener"`) · link **"Lihat semua portofolio →"**

*S7 Proses* — H2 **"Dari Obrolan Pertama sampai Siap Dipakai"** · **Discover** *"Kami pelajari produk dan tujuan Anda."* · **Design** *"Kami rancang pengalaman digital yang paling cocok."* · **Develop** *"Kami bangun dan hidupkan pengalamannya."* · **Deliver** *"Kami luncurkan dan bantu Anda berkembang."* · link **"Lihat langkah pemesanan →"** (to `/layanan/`)

*S8 Penutup* — H2 **"Punya Produk yang Ingin Dicoba Pelanggan Sebelum Membeli?"** · *"Ceritakan produk dan tujuan Anda. Tanpa komitmen di awal."* `VERIFY` · action **Chat via WhatsApp** (pre-filled) · contact row (WhatsApp number, email, Kentingan address).

### P1-10 Motion system and budgets
- `src/motion/` as in A7. A single `motion-loader` (tiny, critical) decides, after first paint and `requestIdleCallback`, which scenes to `import()` based on what is on the page and on `prefers-reduced-motion`. Each scene exports `init()` and `destroy()`; scenes register IntersectionObservers and pause off-screen.
- `scripts/budget.mjs` reads `dist/` and prints gzip sizes of critical JS, each lazy chunk, the hero image, total first-load weight; exits non-zero if the critical JS target is exceeded; **prints** (does not fail on) the lazy targets so the human sees actuals.
- Shared helpers: easing constants, `reduced()`, `onceVisible()`, frame-time guard.

### P1-11 Checks (must be green before the report)
`npm run check` (type check, hex, contrast, content, assets, html, tests) and `npm run build` and `npm run budget`. Fix, do not skip. If a check cannot be satisfied because of a decision in A3, **stop and ask**, do not weaken the check.

### P1-12 Docs and report
- `docs/INFRA_RUNBOOK.md`: numbered click-by-click for H1 to H8 (A9), written for someone who is not a Cloudflare expert: exact menu names (**Workers & Pages → Create application → Import a repository** / Connect to Git; build command; deploy command; production branch; how to read the first build log and what *should not* appear; how to find the real `*.workers.dev` URL; how to add an origin to the **existing** proxy Worker and redeploy it; the DevTools snippet from `playbook.md` §5 step 3 with this site's URLs; renaming the chair `.usdz` by uploading a copy). Say clearly that this is a runbook, nothing was run against the real account.
- Finalise `VERIFY.md` and `IMAGE_PROMPTS.md` (every TEMP image with status).
- End-of-phase report (A10) + a **human review list** for H6/H7 tailored to what was built (what to look at on the phone at 360 px, which animation should feel like what, what the reduced-motion path should look like).

## 1.4 Acceptance criteria (Phase 1 is done when)

1. `npm run check`, `build` and `budget` pass; actuals reported.
2. Beranda is complete with S1 to S8; no numbers, prices or stats anywhere; every unconfirmed line tagged and listed.
3. The hero has all five fallback levels implemented and commented; with JS disabled the page is complete and readable.
4. `ModelStage` has a unit-tested state machine; `check:html` proves `ar-modes` order, `src` + `ios-src`, one `h1`, canonical and robots behaviour.
5. Product detail pages exist for all 7 products with no commercial data.
6. `wrangler.jsonc` matches D3 exactly; no adapter, `functions/`, bindings or secrets.
7. `docs/` complete (DECISIONS, VERIFY, INFRA_RUNBOOK, IMAGE_PROMPTS); report states plainly what was not run or eyeballed.

## 1.5 Progress log (append-only; newest at the bottom)

| Date | Who | Entry |
|---|---|---|
| 2026-10-25 | Planner | Phase 1 plan written. Open for builder: H0 (blue), H4/H5 inputs |


---



| 2026-10-25 | Builder | Foundation and Beranda implemented; source checks pass, dependency install/build blocked by npm registry TLS |

