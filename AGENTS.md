<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Infinity Tattoo

Production site: https://infinitytattoo.no/

This is the website for Infinity Tattoo in Lørenskog.

## Workflow

Always sync/pull the latest repo before making edits.

For normal website edits:
1. Make the requested change.
2. Inspect the diff.
3. Commit with a short clear message.
4. Push to GitHub.

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
