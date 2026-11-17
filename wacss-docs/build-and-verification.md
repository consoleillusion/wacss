# 11. Build and verification

## 11.1 Commands

| Command | Does |
| --- | --- |
| `bun run build` | Generate tokens and CSS, verify, write `dist/` |
| `bun run tokens:show <component>` | Print a component's hierarchy, CSS variable names and channels |
| `bun run dev` | Demo site with live rebuild |

Verification is part of `build`. There is no separate verify step to forget.

## 11.2 Checks

The build fails if any of these fail.

**Schema**
- Every check in [07-component-schema.md](07-component-schema.md#76-validation).

**Tokens**
- L1 values contain no `var()`.
- Every reference obeys the adjacency table in [02-tokens.md](02-tokens.md#23-reference-rules), and stays within its component.
- Every reference resolves to a declared token.
- No reference cycles.
- Each component's tokens are exactly its matrix plus inferred bridges. No extra names.
- No token name contains a `variant` or `state` segment, or a `-value`, `-source` or `-role` suffix.
- Every override key matches a generated token.

**States**
- Channels of co-occurring states are disjoint.
- Every state except `static` and `unchecked` has a non-empty channel.

**CSS**
- Generated CSS references only L5 tokens of its own component.
- Generated CSS contains no literals except structural ones from the schema.
- Helper CSS references only L2 tokens and its own option properties.
- No class name is shared between a component, a variant and a helper.

## 11.3 Outputs and mangling

- `dist/wacss.css`: readable.
- `dist/wacss.min.css`: minified. L3–L5 names are replaced with short names. L1 and L2 names stay readable so consumers can retheme at runtime.
- Mangling is applied consistently across tokens and generated CSS, so the minified sheet is self-contained.
- Names referenced from JavaScript at runtime must be L1 or L2. A component never sets an L3–L5 token from script.

Size is not optimised yet. Every matrix token is emitted, including pass-throughs. Pruning unused pass-throughs is a later optimisation and must not change computed styles.

## 11.4 Token graph

The demo site shows the token dependency graph built from `dist/tokens.json`:

- one column per level, L1 to L5;
- one node per token, grouped by component;
- one edge per `var()` reference;
- selecting an L5 token highlights its full chain back to L1.

The graph is how a person confirms the architecture is working: every L5 token reaches L1 through L4, L3 and L2, with no edge skipping a column. The build already enforces this. The graph makes it visible.

## 11.5 Generated files

Generated files carry a header saying they are generated and must not be edited. They are rebuilt on every build.
