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

What exists today:

- the design/specification, written in Typst (`design/`) and compiled to
  `design/wacss-spec.pdf`;
- prototype components in `src/components/`, with Astro and Svelte
  implementations and JSON-Schema-like component contracts in Dhall
  (`schema.dhall`);
- an Astro configuration for a demo site (output: `demo-dist/`);
- `bun test` and `bun run build:book` scripts in `package.json`.

Planned but not yet in place: L1/L2 token sources, the L3–L5 generator,
`dist/` CSS and token outputs, schema validation and contrast checks, the full
component set, the demo site and the package exports.

## Design rules

- **Define foundations, not ramps.** Primitives hold bases, steps and ratios;
  scales are calculated.
- **Derive, don't duplicate.** Every themable token references the level below
  it.
- **Generate by default, override when necessary.** Variants and states work
  without per-component values, but any generated token can be overridden.
- **One selector per component.** Generated CSS applies only state tokens and
  schema-declared structural literals.
- **The schema is the contract.** A component's tokens and CSS come only from
  its schema.
- **Prefer native semantics.** Style elements by tag and state first; use a
  single simple class only when no suitable HTML element exists (for example,
  `.card`). Accessibility is part of the system, not an add-on.

## Token model

Five levels, each derived only from the level below it:

| Level | Name | Pattern | Role |
| --- | --- | --- | --- |
| L1 | Primitive | `--<name>` | Bases, steps, ratios and single colours |
| L2 | Semantic | `--<property>` | Meanings, defaults, variant tones, themes and palettes |
| L3 | Component | `--<component>-<property>` | Component property defaults |
| L4 | Variant | `--<component>-<property>-<variant>` | Named appearances |
| L5 | State | `--<component>-<property>-<variant>-<state>` | Interaction and UI states |

Only L1 and L2 are authored by hand. The generator is intended to emit L3–L5
and a single global stylesheet with cascade layers; generated files are never
edited directly. Themes are root-only (`data-theme` and `data-palette` on
`<html>`), with light/dark themes and four planned palettes: Sumi, Matcha,
Sakura and Aizome.

## Prototype components

| Component | Files | Notes |
| --- | --- | --- |
| Accordion | `.astro`, `.svelte`, `schema.dhall` | Native `<details>`/`<summary>` based |
| Button | `.astro`, `.svelte`, `schema.dhall` | Renders a button, or an anchor when `href` is set |
| Card | `.astro`, `.svelte`, `schema.dhall` | Data-driven figure that can render another component |
| Webpage | `schema.dhall` | Embedded page (`<iframe>`); implementation still to come |

These are prototypes: props, schemas and rendering strategies are still
changing, and the schemas currently reference a Dhall prelude that is not yet
committed.

## Repository layout

```text
design/                 Specification source (Typst) and compiled PDF
src/components/<Name>/  Component implementations and Dhall schema
astro.config.ts         Astro demo-site configuration
package.json            Scripts and dependencies
bun.lock                Bun lockfile
```

## Working on it

You need [Bun](https://bun.sh/). Typst is needed only to rebuild the book.

```sh
bun install
bun test            # test script is wired up; tests are still to be written
bun run build:book  # typst compile --input theme=dark design/book.typ book.pdf
```

`build:book` writes `book.pdf` in the repository root (git-ignored). A checked-in
copy of the specification lives at `design/wacss-spec.pdf`.

The specification is the source of truth for the intended architecture,
recipes, verification rules and component API. Start with
`design/index.typ`, `design/introduction.typ` and `design/roadmap.typ`, or read
`design/wacss-spec.pdf`.

## Roadmap

The target for v1.0.0 is a complete library: one generated and verified global
stylesheet, the full component set and a data-driven demo site. Work is staged
as spec baseline → tooling → generator → verification → components → packaging
→ demo site → release. See `design/roadmap.typ` for the milestones and checklist.

## License

MIT — see [LICENSE](LICENSE).
