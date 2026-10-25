# Infrastructure runbook — human steps only

Nothing in this runbook has been run against GitHub or Cloudflare. The builder did not deploy or change the existing asset proxy.

## H1 — GitHub
1. Review branch `phase-1` locally and commit/push it with `git push -u origin phase-1` after you have created the GitHub repository and connected it as `origin`.
2. Merge Phase 1 into `main` only after local review and the H0 decision.

## H2 — Cloudflare Workers Builds
1. In Cloudflare, open **Workers & Pages → Create application → Import a repository** and connect the GitHub repository.
2. Set production branch to `main`, build command to `npm run build`, and deploy command to `npx wrangler deploy`.
3. Start the first build. Read the build log and confirm Astro creates `dist/`, then Wrangler deploys static assets. There should be no adapter, `functions/`, `main`, bindings, or secret configuration.
4. In the deployment details, copy the assigned `*.workers.dev` hostname. Do not assume the placeholder in the site is the real URL.

## H3 — real site URL
Replace `SITE_URL` in `src/data/site.ts` and the Astro `site` value in `astro.config.mjs` with the assigned URL, preserve `SITE_INDEXABLE = false`, then redeploy.

## H4 — existing asset proxy
1. In the existing `grizelle-3d` Worker settings, add the exact deployed site origin to its allow-list. For previews, use the strict project preview pattern from security.md. Never use wildcard CORS.
2. Upload a copy of the chair USDZ to the existing bucket as `guitar-chair-4.usdz`; keep the old object until the new key is confirmed. Tell the builder to update the product record afterward.
3. Confirm each product model endpoint returns the expected type and range behavior. Do not use a direct bucket URL.

## H5 — chair poster
Supply a transparent chair poster render and confirm the exported model uses metre scale. Tell the builder to replace `public/images/chair-poster.svg` with the approved render.

## H6/H7 — human review
Use `playbook.md` device matrix for iPhone Safari/Quick Look, Android Chrome/Scene Viewer, desktop QR, constrained network, and model failure. Review at 360 px and desktop, keyboard navigation, reduced motion, contrast, image cropping, and hero content overlap. Looks and motion need human review; no browser tests or screenshots were run by the builder.
