import * as R from "ramda";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Declarations = Record<string, string>;

/** The styling part of one target: the component itself or one of its pseudo-elements. */
type Target =
{ pseudo: string                                  // "" or e.g. "::after"
, on: string                                      // "" or a selector the element must match to draw the pseudo-element
, themeableProperties: string[]
, structuralProperties: Record<string, Declarations>
};

/** A component schema as loaded from schema.dhall, plus its kebab-case name. */
export type Schema =
{ name: string
, title: string
, description: string
, element?: string[]
, variants: string[]                              // in order, the default variant first
, roles: Record<string, string>                   // each variant's colour role: accent, surface, pop, …
, states: string[]
, themeableProperties: string[]
, structuralProperties?: Record<string, Declarations>
, pseudoElements?: Record<string, { on?: string; themeableProperties?: string[]; structuralProperties?: Record<string, Declarations> }>
, arguments: Record<string, unknown>
};

export type Token =
{ name: string
, level: 1 | 2 | 3 | 4
, value: string
, group: string                                   // file (L1/L2) or component name (L3/L4)
, refs: string[]
};

// ---------------------------------------------------------------------------
// Fixed vocabulary
// ---------------------------------------------------------------------------

/** State selectors: native pseudo-classes, then ARIA, then the data attributes bits-ui sets. */
export const STATE_SELECTORS: Record<string, string> =
{ hover: ":hover"
, focus: ":focus-visible"
, active: ":active"
, open: '[aria-expanded="true"], [data-state="open"]'
, current: '[aria-current="page"], [aria-current="true"]'
, pressed: '[aria-pressed="true"]'
, disabled: ':disabled, [aria-disabled="true"], [data-disabled]'
, loading: '[aria-busy="true"]'
};

/** Rule order: when two states set the same property, the later one wins. */
const STATE_ORDER = ["static", ...Object.keys(STATE_SELECTORS)];

const TYPES: Record<string, "fill" | "ink" | "edge"> =
  { background: "fill", "background-color": "fill", "accent-color": "fill", fill: "fill"
  , color: "ink", "caret-color": "ink", stroke: "ink"
  , "border-color": "edge", "text-decoration-color": "edge", "column-rule-color": "edge"
  };

const DEFAULT_VARIANT = "secondary";

// ---------------------------------------------------------------------------
// Names: the hierarchy (the stub, with variant joined to the component)
// ---------------------------------------------------------------------------

const targetsOf = (meta: Schema): Target[] =>
  // Purpose: list the component and each of its pseudo-elements as styling targets
  [ { pseudo: "", on: "", themeableProperties: meta.themeableProperties, structuralProperties: meta.structuralProperties ?? {} }
  , ...R.toPairs(meta.pseudoElements ?? {}).map(([pseudo, t]) =>
      ({ pseudo, on: t.on ?? "", themeableProperties: t.themeableProperties ?? [], structuralProperties: t.structuralProperties ?? {} }))
  ];

const keyOf = (target: Target, property: string) =>
  // Purpose: the property slot of a token name: "background", or "after-transform" for ::after
  target.pseudo ? `${target.pseudo.replace(/^:+/, "")}-${property}` : property;

const channelOf = (channels: Declarations, state: string): string[] =>
  // Purpose: the property slots a state changes ("background", "after-transform"), read from the channel token names
  R.uniq(
    Object.keys(channels)
      .filter((n) => n.startsWith(`--${state}-`))
      .map((n) => n.slice(state.length + 3).replace(/-(toward|amount)$/, "")),
  );

export const generateTokenHierarchy = (meta: Schema, channels: Declarations) =>
  // Purpose: build the L3 → L4 name tree: component-variant → property → every state
  R.fromPairs(
    meta.variants.map((v) => [
      `${meta.name}-${v}`,
      R.fromPairs(
        R.chain(
          (t) => t.themeableProperties.map((p) => [
            keyOf(t, p),
            meta.states,
          ]),
          targetsOf(meta),
        ),
      ),
    ]),
  );

export const toCSSVariables = (tokens: Record<string, Record<string, string[]>>) =>
  // Purpose: flatten a hierarchy into its L3 and L4 custom property names
  R.chain(
    ([componentVariant, properties]) =>
      R.chain(
        ([property, states]) => [
          `--${componentVariant}-${property}`,
          ...states.map((state) => `--${componentVariant}-${property}-${state}`),
        ],
        R.toPairs(properties),
      ),
    R.toPairs(tokens),
  );

// ---------------------------------------------------------------------------
// Values
// ---------------------------------------------------------------------------

export const refsOf = (value: string): string[] =>
  // Purpose: every custom property a value references through var()
  R.uniq([...value.matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]!));

const isColour = (property: string) =>
  // Purpose: whether a property takes its value from the variant's colour role
  property in TYPES;

const variantValue = (c: string, v: string, role: string, key: string, property: string) => {
  // Purpose: the L3 recipe: a colour takes the variant's role token; anything else takes the L2
  // default on the default variant, and the default variant's value on the others
  if (isColour(property)) return `var(--${property}-${role})`;
  if (v === DEFAULT_VARIANT) return `var(--${property})`;
  return `var(--${c}-${DEFAULT_VARIANT}-${key})`;
};

const stateValue = (l3: string, state: string, key: string, property: string, channels: Declarations) => {
  // Purpose: the L4 recipe: apply the state's channel token to the L3 value
  const c = `--${state}-${key}`;
  if (channels[`${c}-toward`]) return `color-mix(in oklab, var(${l3}), var(${c}-toward) var(${c}-amount))`;
  if (property === "transform" || property === "filter") return `var(${l3}) var(${c})`;
  if (property === "opacity") return `calc(var(${l3}) * var(${c}))`;
  return `var(${c})`;
};

// ---------------------------------------------------------------------------
// Checks: only conditions without which the generated CSS would be broken
// ---------------------------------------------------------------------------

const check = (meta: Schema, l2: Declarations) => {
  // Purpose: fail when a generated token or rule would have nothing to refer to
  const fail = (msg: string) => {
    // Purpose: stop the build with a message naming the component
    throw new Error(`${meta.title}: ${msg}`);
  };
  if (!meta.variants.includes(DEFAULT_VARIANT)) fail(`variants must include ${DEFAULT_VARIANT}`);
  for (const t of targetsOf(meta))
    for (const p of t.themeableProperties)
      if (isColour(p)) {
        for (const v of meta.variants)
          if (!l2[`--${p}-${meta.roles[v]}`]) fail(`no L2 token --${p}-${meta.roles[v]} for variant ${v}`);
      } else if (!l2[`--${p}`]) fail(`no L2 default --${p}`);
  for (const s of meta.states)
    if (s !== "static" && !STATE_SELECTORS[s]) fail(`unknown state ${s}`);
};

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

const rule = (selector: string, decls: Declarations) =>
  // Purpose: render one CSS rule, or nothing when it has no declarations
  R.isEmpty(decls) ? "" : `${selector} {\n${R.toPairs(decls).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n`;

export const generateComponent = (meta: Schema, l2: Declarations, channels: Declarations) => {
  // Purpose: produce one component's L3 and L4 tokens and the CSS that consumes them
  check(meta, l2);
  const c = meta.name;
  const base = meta.element ? `:where(${meta.element.join(", ")})` : `.${c}`;
  const variantSelector = (v: string) =>
    // Purpose: the selector of one variant; the default variant has no class
    v === DEFAULT_VARIANT ? base : meta.element ? `${base}:where(.${v})` : `${base}.${v}`;
  const tokens: Token[] = [];
  const add = (level: 3 | 4, name: string, value: string) =>
    // Purpose: record one generated token with its references
    tokens.push({ name, level, value, group: c, refs: refsOf(value) });
  let css = "";

  for (const t of targetsOf(meta))
    for (const v of meta.variants) {
      const sel = variantSelector(v);
      const structural = (s: string) =>
        // Purpose: a state's structural literals, emitted once on the default variant
        (v === DEFAULT_VARIANT ? t.structuralProperties[s] ?? {} : {});
      const l3 = (p: string) =>
        // Purpose: the L3 name of a property for this variant and target
        `--${c}-${v}-${keyOf(t, p)}`;
      for (const p of t.themeableProperties) add(3, l3(p), variantValue(c, v, meta.roles[v]!, keyOf(t, p), p));
      // Static is a state like any other: every property has a static token, equal to its L3 value,
      // and the base rule reads it, so the CSS only ever reads state tokens.
      for (const p of t.themeableProperties) add(4, `${l3(p)}-static`, `var(${l3(p)})`);
      const on = t.on ? `:where(${t.on})` : "";
      css += rule(`${sel}${on}${t.pseudo}`, { ...structural("static"), ...R.fromPairs(t.themeableProperties.map((p) => [p, `var(${l3(p)}-static)`])) });
      for (const s of STATE_ORDER.filter((s) => s !== "static" && meta.states.includes(s))) {
        // Every property has a token in every state (the full matrix): a property the state's channel
        // changes takes the channel recipe; any other keeps its static value. The state's rule
        // declares only what the state changes, so states that are true together do not undo each other.
        // A colour property also changes in a state when the variant's role gives its own colour
        // for that state, an L2 token --<property>-<role>-<state>; that colour is used as it is.
        const roleState = (p: string) => (isColour(p) && l2[`--${p}-${meta.roles[v]}-${s}`] ? `--${p}-${meta.roles[v]}-${s}` : "");
        // The component's own value for a property in a state, from its schema's stateValues,
        // comes first: "unchanged" keeps the static value; anything else is used as it is.
        const own = (p: string): string | undefined => (meta as any).stateValues?.[s]?.[keyOf(t, p)];
        const changed = t.themeableProperties.filter((p) =>
          own(p) !== undefined ? own(p) !== "unchanged" : roleState(p) || channelOf(channels, s).includes(keyOf(t, p)));
        for (const p of t.themeableProperties)
          add(4, `${l3(p)}-${s}`,
            !changed.includes(p) ? `var(${l3(p)})`
            : own(p) !== undefined ? own(p)!
            : roleState(p) ? `var(${roleState(p)})`
            : stateValue(l3(p), s, keyOf(t, p), p, channels)!);
        css += rule(`${sel}:where(${STATE_SELECTORS[s]})${on}${t.pseudo}`,
          { ...structural(s), ...R.fromPairs(changed.map((p) => [p, `var(${l3(p)}-${s})`])) });
      }
    }

  return { tokens, css, layer: meta.element ? "wacss.elements" : "wacss.components" };
};

export const tokensFromDeclarations = (decls: Declarations, level: 1 | 2, group: string): Token[] =>
  // Purpose: describe hand-authored L1 or L2 declarations as tokens
  R.toPairs(decls).map(([name, value]) => ({ name, level, value, group, refs: refsOf(value) }));

export const toRootBlock = (tokens: Token[]) =>
  // Purpose: render tokens as one :root block
  `:root {\n${tokens.map((t) => `  ${t.name}: ${t.value};`).join("\n")}\n}\n`;
