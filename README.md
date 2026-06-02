# SAIS Next.js Frontend

High-quality responsive Next.js frontend connected to Sanity (`homeSection`) with animated section reveals and polished visual transitions.

## Stack

- Next.js 16 (App Router)
- Tailwind CSS 4
- Framer Motion
- Sanity Content Lake (`@sanity/client`)

## Run locally

```bash
npm install
cp .env.local.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Sanity config

`.env.local`:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=9oxycbmd
NEXT_PUBLIC_SANITY_DATASET=production
```

## Notes

- Homepage content is loaded from `homeSection` documents ordered by `order`.
- Uploaded images are read from `images[]` and fallback placeholders from `imagePlaceholders[]`.
- The new maintainable homepage model is defined in `sanity/schemas/homepage.js`.
- The frontend first looks for a `homepage` document, then falls back to the older `homeSection` content so the live site keeps working while content is migrated.
