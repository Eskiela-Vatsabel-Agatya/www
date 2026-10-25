# company.md — [Client Name]

> **Audience:** AI coding agents building or modifying this client's site.
> **Purpose:** everything specific to *this* client in one place, so nobody reconstructs it from chat history. **Revision v2:** adds stakeholders, real resource names, deploy/env status, brand-file status, content-confidence table, launch gates and a pointer to the project's decision log.
> **Status:** TEMPLATE. Every `[ ]` and `___` relevant to your task must be filled before you write code. If a section is blank when you reach it, halt and ask the human; do not guess or invent a placeholder (names, URLs, numbers).
>
> This is the **adaptive layer**. `design.md` and `security.md` take precedence. Conflicts go in §9, flagged, never silently resolved.

---

## 1. Client Identity

- **Business name:** ___ (legal name if different: ___)
- **Name-collision check:** is there another business with a similar name whose contact details/products could be confused with this client's? ___ (FurniBLOC: a different "Furnibloc" sells flat-pack furniture in Tangerang; never use its number or copy.)
- **Industry / product category:** ___
- **Tagline / positioning:** ___
- **Target customer / market:** ___ ☐ Domestic (Bahasa Indonesia) ☐ International (English)
- **Business facts usable in copy** (only confirmed ones): ___ (e.g. number of tenants, area, opening date)
- **Source of facts:** ___ (e.g. company overview docx, brochure PDF, old website). Facts from secondary sources are `VERIFY` until the client confirms.

## 2. People and ownership (NEW)

- **Agency lead / the human talking to you:** ___
- **Who builds the 3D models:** ___ (name/role; may work on another machine, see `playbook.md` §9)
- **Client contact for confirmations:** ___ (hours, promo, FAQ answers, tenant list)
- **Who owns the Cloudflare account:** ☐ client (LunAR = Administrator, recommended) ☐ LunAR (temporary; ownership transfer decision pending: ___)
- **Who owns the domain and where its DNS is today:** ___
- **Who may deploy / merge to `main`:** ___

## 3. Contact & Conversion

- **WhatsApp number:** ___ (`62xxxxxxxxxx`, no `+`/leading `0`); display format ___; one number for all products? ☐ yes ☐ no
- **Email:** ___ · **Address:** ___ · **Hours:** ___ ☐ confirmed ☐ VERIFY
- **Social:** ___ (empty until URLs are given)
- **Promo running?** ☐ no ☐ yes: ___ (config-driven bar; off by default)

## 4. Brand Color, Typography, Brand files

- **Primary brand color (hex) and source:** ___
- **Ramp generated + contrast computed (`npm run contrast`):** ☐ yes ☐ not yet
- **Second logo colour (ink only, never an accent):** ___
- **Look:** ☐ standard ☐ soft-UI (D3) ☐ other: ___
- **Typography:** ☐ display + body ☐ single sans, two weights · font(s): ___ (self-hosted via the build)
- **Tone of copy:** ___
- **WhatsApp button fill:** ☐ dark green token (white text) ☐ `#25D366` with dark ink text
- **Brand files:** logo SVG (outlined text) ☐ delivered ☐ TEMP · favicon SVG ☐ delivered ☐ TEMP · product photos ☐ final ☐ TEMP · OG card ☐ designed ☐ generated TEMP

## 5. Product Catalog Scope

- **SKUs at launch:** ___ · **Categories:** ___ · **Currency:** `Rp 1.250.000`
- **Badges:** ___
- **Catalog data source and known data problems:** ___ (e.g. colour field contradicts the photo; unit missing on dimensions; stale live stock). List each as VERIFY.
- **Is a very small catalog at launch acceptable to the client?** ☐ confirmed ☐ not asked (launch gate)

## 6. Project Tier and Deployment

- **Tier:** ☐ A (static + Worker) ☐ B (reason: ___; see `security.md` §2.2)
- **Build tool:** ☐ plain HTML ☐ Astro static (D1) · Node version: ___ (`.nvmrc`)
- **Deploy method:** ☐ Direct Upload ☐ git-linked (D2; guardrails per `security.md` §2.1) · Production branch: ___
- **GitHub repo:** ___

## 7. Infrastructure (real values only, filled as created)

| Item | Value | Status |
|---|---|---|
| Cloudflare account | ___ | ☐ created |
| Pages project / URL | ___ / `https://___.pages.dev` | ☐ created |
| Production domains | `www.___` (canonical), apex → www | ☐ attached |
| R2 bucket (convention `[client]-3d-asset`) | ___ | ☐ created |
| Worker name / URL | ___ / `https://___` | ☐ deployed with latest `index.js` |
| Worker R2 binding | `MY_BUCKET` | ☐ set |
| **Key layout** | ☐ bucket root (default) ☐ folders: ___ | must match `R2()`, validator, Worker pattern |
| Worker allowed origins | prod, pages.dev, preview regex for project `___`; temporary `localhost`: ☐ present ☐ removed | |
| `PUBLIC_ASSET_BASE` | value ___ · local `.env` ☐ · Pages Production ☐ · Pages Preview ☐ · redeployed after setting ☐ | |
| DNS cutover | date ___ · rollback map recorded ☐ · old host kept until ___ | |

## 8. 3D Asset Status

| Product (slug) | `.glb` uploaded (size) | `.usdz` uploaded (size) | Decimated | Logo baked | Real-world scale | 2D fallback photo |
|---|---|---|---|---|---|---|
| ___ | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

- **AR check on real phones:** Android leaves the browser into Google Scene Viewer ☐ · iPhone Quick Look ☐ · tested on mobile data ☐
- **HAKI / IP registration advice given (Layer 1):** ☐ yes ☐ not yet

## 9. Special Requirements / Deviations from DNA

Mirror the project's `docs/DECISIONS.md` here in one line each (full text lives there).

| ID | Deviation | DNA rule | Resolution |
|---|---|---|---|
| — | — | — | — |

## 10. Content confidence (NEW)

| Fact | Where it lives | Confirmed? | Safe wording used meanwhile |
|---|---|---|---|
| ___ | ___ | ☐ | ___ |

## 11. Launch gates (human-owned)

☐ 3D assets decimated + logo baked · ☐ small catalog accepted · ☐ hours / WhatsApp policy / promo confirmed · ☐ real photos and logo delivered · ☐ old QR labels redirected or reprinted · ☐ every `verify` FAQ answer confirmed · ☐ old catalog data exported · ☐ DNS rollback map recorded

## 12. Revision History

| Date | Change | By |
|---|---|---|
| ___ | Initial template filled | ___ |
