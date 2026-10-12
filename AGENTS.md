<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Infinity Tattoo

Production site: https://infinitytattoo.no/

This is the website for Infinity Tattoo in Lørenskog.

## Workflow

At the start of every Codex editing session:
1. Use the Browser and Build Web Apps plugins.
2. Sync/pull the latest repo before making edits.

Every requested website update must be committed and pushed automatically, including updates requested by Filip (the tattoo artist and studio owner). This is standing authorization to publish completed changes; do not ask for a separate push, merge, or publishing approval.

For every website update:
1. Sync with the latest `main` in the existing GitHub repository and preserve unrelated local work.
2. Make the requested changes, inspect the diff, and run checks appropriate to the change.
3. Commit the completed changes with a short clear message.
4. Merge or fast-forward the completed changes into `main` and push to the existing GitHub repository so Vercel updates https://infinitytattoo.no/.
5. Verify the production deployment and relevant live behavior, then give a short plain-language update.

Do not stop after a local edit or preview deployment. A preview is optional verification, not the default final delivery. Only leave work unpublished when the user explicitly requests preview-only work, no commit, or no push, or when a failed check or access problem prevents safe completion; explain any blocker clearly.

Keep the existing GitHub repository and Vercel integration. Do not create a replacement repo or change production domains.

Do not ask the tattoo artist to use Terminal.
Do not require localhost for simple text, image, gallery, SEO, or contact updates.

## Editing

Ibrahim may edit anything.

The tattoo artist may make normal website updates, including:
- text
- gallery/images
- artist info
- reviews
- contact info
- opening hours
- booking links
- SEO text/meta

Be careful with:
- redirects
- domains/canonicals
- Vercel config
- package.json
- routing
- large redesigns

## SEO

Use natural Norwegian text. No keyword stuffing.

Main domain is always:

https://infinitytattoo.no/

Do not set canonicals to the old hyphenated domain.

Important phrases can be used naturally:
- Infinity Tattoo
- tatovering Lørenskog
- tattoo Lørenskog
- tatoveringsstudio Lørenskog

## Before commit

Check the diff.
Avoid unrelated file changes.
Keep commit messages short and clear.

## Studio system (`studio/`)

`studio/` is the booking API and internal admin (Cloudflare Worker + D1) that replaces Linework. It has its own `package.json` and deploys separately from the website; see `studio/README.md` and `docs/studio/PLAN.md`.

- Never turn it into a till/kassasystem: no receipts, and don't call its daily settlement a Z-report. In-studio payments go through a declared kassasystem (see the plan).
- The website shows the native booking form only when `NEXT_PUBLIC_STUDIO_API_URL` is set, otherwise the Linework embed.
- Schema changes go in a new numbered file in `studio/migrations/`.
