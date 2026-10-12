# Visual assets: how they are made and maintained

All visuals are hand-editable SVG text files in `docs/assets/`. They use no scripts, external fonts or external images, so GitHub serves them from the repository itself.

| File | Shows | Based on |
|---|---|---|
| `hero.svg` | Project banner with an illustrative line chart (not real data) | README intro |
| `architecture.svg` | Request flow: browser, middleware, API routes, Prisma, PostgreSQL, plus NextAuth, Cloudinary and Socket.IO | `src/middleware.ts`, `src/app/api/*`, `src/lib/*`, `server.mjs` |
| `transfer-flow.svg` | Steps of `POST /api/transfer` and its known gap | `src/app/api/transfer/route.ts` |
| `cicd-pipeline.svg` | The real deploy workflow and what is missing from it | `.github/workflows/deploy.yml` |

The data-model diagram in the README is Mermaid, which GitHub renders natively, and is derived from `prisma/schema.prisma`.

## Keeping them honest

When the code changes, update the matching SVG and README section together. For example, when lint and tests are added to the workflow, move them out of the dashed "Not in the pipeline yet" row in `cicd-pipeline.svg`, and when the transfer logic is made atomic, update the amber panel in `transfer-flow.svg`.

## Animation

Animations are small CSS and SMIL effects: connectors flow, dots travel along request paths, and the hero line draws once. They add no information that the static picture lacks, and every file has a `prefers-reduced-motion` rule that turns the CSS animations off. Each SVG has a `<title>` and `<desc>` for screen readers, and the README gives alt text and a text explanation beside each one.

## Notes

- GitHub renders SVGs added with `<img>` or Markdown image syntax, including their animation.
- If an image fails to load, the alt text and surrounding text still carry the content.
- Check the page in a private browser window after each commit, since GitHub caches images.
