# Portfolio (Preline UI)

Personal site of Mustafa Fathur Rahman. Astro + TypeScript (strict) + Tailwind CSS v4 +
[Preline UI](https://preline.co) (free components only), theme **Moon**, font **Inter**.

## Commands

| Command                         | Action                                                        |
| :------------------------------ | :------------------------------------------------------------ |
| `npm install`                   | Install dependencies                                          |
| `npm run dev`                   | Dev server at `http://localhost:4323`                         |
| `npm run build`                 | Build to `./dist/`                                            |
| `npm run check`                 | Type-check `.astro` and `.ts` files                           |
| `npm run sync:posts`            | Refresh `src/data/posts.json` from `../blog`                  |
| `npm run generate:placeholders` | Recreate missing placeholder assets (`-- --force` for all)    |

`npm install` prints an `EBADENGINE` warning for `preline@5.0.0`: the package pins one exact
Node version. It is only a warning and the build is unaffected.

## Where things live

| To change…                                   | Edit                                                  |
| :------------------------------------------- | :---------------------------------------------------- |
| Name, role, summary, links, skills           | `src/data/profile.ts`                                 |
| Experience, education, awards                | `src/data/profile.ts`                                 |
| Work items and which ones are featured       | `src/data/work.ts`                                    |
| Blog post list                               | run `npm run sync:posts` (never edit `posts.json`)    |
| Site URL and blog URL                        | `src/config.ts`                                       |
| Work images (16:10)                          | `public/images/work/<slug>.svg`, or `image` in `work.ts` |
| Company and school logos                     | `public/images/logos/`, then `logo` in `profile.ts`   |
| Avatar                                       | `src/assets/avatar.png`                               |
| Favicon and social card                      | `public/favicon.*`, `public/apple-touch-icon.png`, `public/og.png` |
| Theme tokens, fonts                          | `src/styles/global.css`, `src/styles/theme-overrides.css` |
| Brand icons in the skills list               | `src/lib/brand-icons.ts`                              |
| Page width and side padding                  | `src/components/Container.astro`                      |

## Notes

- **Blog posts** are a snapshot. `scripts/sync-posts.mjs` reads the frontmatter of the published
  notes in `../blog/vault/notes` and never writes to the blog. Set `BLOG_DIR` if the blog moves.
- **Moon theme**: `preline@5` no longer ships the predefined themes, so
  `src/styles/themes/moon.css` is the official file vendored from `preline@4.2.0`.
- **Design reference**: `reference-light.png` and `reference-dark.png` in the project root.
  Sizes, spacing and colors were measured from them. Their colors are stock Moon tokens except
  the primary one, which `src/styles/theme-overrides.css` sets to stone-800.
- **Theme toggle**: the icon button in the footer is Preline's theme-switch plugin
  (`hs_theme` in `localStorage`, `.dark` on `<html>`). The inline script in
  `src/layouts/Base.astro` applies the saved theme before first paint.
- **Skill icons** come from `simple-icons`, and only for exact matches: a skill without its own
  icon stays text-only (see `src/lib/brand-icons.ts`).
- **"Get in touch"** is switched off: the section is commented out at the end of
  `src/pages/index.astro`, and `ButtonLink.astro` and `CopyEmail.astro` are kept only for it.
- **Before deploying**: set `SITE_URL` and `BLOG_URL` in `src/config.ts`. Canonical and Open
  Graph URLs are left out while `SITE_URL` is empty.
