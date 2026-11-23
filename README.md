# wacss

> **Work in progress.** This repository currently contains the specification and
> early component prototypes. The token generator, generated stylesheet, demo
> site and test suite are not implemented yet. APIs and file layout may change.

`wacss` is a semantic, token-driven, class-light CSS system and Astro/Svelte
component library inspired by wabi-sabi and Western editorial minimalism. The
name comes from 和 (*wa*) — harmony, balance and belonging: harmony between
users, developers and web standards.

The idea is simple: hand-author a small set of foundational tokens and one
schema per component. Everything else — component, variant and state tokens,
plus the CSS that applies them — is generated. Components take data and render
accessible UI, relying on native HTML and CSS wherever possible and using
JavaScript only where the platform needs it.

## Status

Early. The token pipeline, the first three components (Accordion, Button,
Card) and the demo site work. See `design/TASKS.md`.

## How it works

Hand-authored SCSS defines L1 primitives, L2 semantic tokens and L2
channel tokens (what each state does). Each component has one
`schema.dhall` listing its variants, states, themable properties and
structural literals. The generator turns those into:

| Level | Pattern | Example |
| --- | --- | --- |
| L3 | `--<component>-<variant>-<property>` | `--button-primary-background` |
| L4 | `--<component>-<variant>-<property>-<state>` | `--button-primary-background-hover` |

and the CSS that applies them, in one stylesheet with cascade layers.
Themes are root-only (`data-theme`, `data-palette` on `<html>`).

## Repository layout

```text
design/                 Specification (Typst) and compiled PDF
src/styles/             L1, L2, channel and helper SCSS
src/components/<Name>/  schema.dhall, plus <Name>.svelte (bits-ui) or <Name>.astro
src/lib/                The token generator
scripts/                Build script
src/site.ts, src/demo/  The demo site
dist/                   Built CSS and tokens (generated, not committed)
```

## Working on it

You need [Bun](https://bun.sh/). Typst is needed only to rebuild the book.

```sh
bun install
bun run generate:tokens   # dist/wacss.css, dist/tokens.css, dist/tokens.json
bun run dev               # demo site: /components and /design
bun run build             # demo site to demo-dist/
bun run build:book        # design/wacss-spec.pdf and design/wacss-spec-light.pdf
```

## License

MIT — see [LICENSE](LICENSE).
