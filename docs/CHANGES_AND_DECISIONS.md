# What changed in v2, and what the humans must decide

## Files
- `agent.md` v2: working agreement (§5), phase workflow (§6), mistake log (§8), Astro static + git-linked deploy as logged options, key layout, env-var warning.
- `design.md` v2: **AR launch order = Scene Viewer first** (§8), lazy model-viewer, state machine, soft-UI variant, brand files (§2.5), home-page blueprint (§8a), contrast/accessibility floors, new anti-patterns and checklist items.
- `security.md` v2: bucket-root keys, Worker response rules, origins list and `localhost` handling, CORS vs native AR, §5b public config, Scene Viewer-first, bundled model-viewer allowed, checklist items.
- `playbook.md` (new): runbooks for logo/favicon, env vars, Cloudflare order, adding products, the "model doesn't show" ladder, device tests, cutover, sandbox testing, teammate onboarding, zips.
- `company.md` v2 template + `company.furnibloc.md` (filled).

## Decisions only the humans can make (I did not decide these silently)
1. **Default deploy method.** v2 keeps Direct Upload as the DNA default and lists git-linked as an accepted logged alternative (what you chose). If git-linked should become the default for all clients, say so and I'll flip the wording.
2. **Astro static as the approved default build tool**, or keep plain HTML as the default and Astro as a per-client choice? v2 says "approved", with plain HTML still allowed.
3. **Bucket-root keys as the default layout** (v2) versus `model/` folders.
4. **WhatsApp button colour default** (dark green fill vs `#25D366` + dark text). v2 requires a one-time logged choice.
5. **Account ownership**: FurniBLOC's Worker is on LunAR's account. SOP 01 recommends client-owned. Decide before launch.
6. The old master plan still says `ar-modes="webxr scene-viewer quick-look"` (line ~380). If you reuse that plan, fix it.
