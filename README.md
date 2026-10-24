# THEONE Consulting — website

One-page site for THEONE Consulting, built with [Astro](https://astro.build), GSAP and Lenis. The design rules live in `CLAUDE.md`.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Change the text

All copy lives in `src/content/`, one Markdown file per section (only the part between the `---` lines matters). Edit the text there; no component changes needed.

- **Full vs compact copy:** set `copy: full` or `copy: compact` in `src/content/site.md`. Full (Nataliya's original) is the default.
- **Placeholders:** anything in `[square brackets]` still needs real content — contact details in `site.md`, years of experience in `about.md`.

## Swap in real assets

- **Mileast font:** put `mileast.woff2` in `public/fonts/` and uncomment the `@font-face` block at the top of `src/styles/global.css`.
- **Company logos:** put SVGs in `public/logos/` and add `logo: "/logos/<file>.svg"` to each company in `src/content/experience.md`.
- **Photos:** replace the files in `src/assets/photos/` (keep the names, or update the imports).

## Deploy

Import this repo in [Vercel](https://vercel.com/new). It detects Astro automatically; no settings needed. Every push to `main` redeploys. Add the domain under Project → Settings → Domains, then update `site` in `astro.config.mjs`.
