import * as R from "ramda";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Declarations = Record<string, string>;

/** The styling part of one target: the component itself or one of its pseudo-elements. */
type Target =
{ pseudo: string                                  // "" or e.g. "::after"
, themeableProperties: string[]
, structuralProperties: Record<string, Declarations>
};

/** A component schema as loaded from schema.dhall, plus its kebab-case name. */
export type Schema =
{ name: string
, title: string
, description: string
, element?: string[]
, variants: string[]
, states: string[]
, parts?: string[]
, themeableProperties: string[]
, structuralProperties?: Record<string, Declarations>
, pseudoElements?: Record<string, Omit<Target, "pseudo">>
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
, disabled: ':disabled, [aria-disabled="true"], [data-disabled]'
, loading: '[aria-busy="true"]'
};

/** Rule order. Channels are disjoint, so order only matters for structural literals. */
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
  [ { pseudo: "", themeableProperties: meta.themeableProperties, structuralProperties: meta.structuralProperties ?? {} }
  , ...R.toPairs(meta.pseudoElements ?? {}).map(([pseudo, t]) =>
      ({ pseudo, themeableProperties: t.themeableProperties ?? [], structuralProperties: t.structuralProperties ?? {} }))
  ];

const keyOf = (target: Target, property: string) =>
  // Purpose: the property slot of a token name: "background", or "after-transform" for ::after
  target.pseudo ? `${target.pseudo.replace(/^:+/, "")}-${property}` : property;

const channelOf = (channels: Declarations, state: string): string[] =>
  // Purpose: the properties a state changes, read from the channel token names
  R.uniq(
    Object.keys(channels)
      .filter((n) => n.startsWith(`--${state}-`))
      .map((n) => n.slice(state.length + 3).replace(/-(toward|amount)$/, "")),
  );

export const generateTokenHierarchy = (meta: Schema, channels: Declarations) =>
  // Purpose: build the L3 → L4 name tree: component-variant → property → the states that change it
  R.fromPairs(
    meta.variants.map((v) => [
      `${meta.name}-${v}`,
      R.fromPairs(
        R.chain(
          (t) => t.themeableProperties.map((p) => [
            keyOf(t, p),
            meta.states.filter((s) => s !== "static" && channelOf(channels, s).includes(p)),
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

const variantValue = (c: string, v: string, key: string, property: string) => {
  // Purpose: the L3 recipe: the default variant takes L2, other variants take a tone or the default variant
  if (v === DEFAULT_VARIANT) return `var(--${property})`;
  const type = TYPES[property];
  if (type === "fill" || type === "edge") return `var(--tone-${v})`;
  if (type === "ink") return `var(--tone-${v}-ink)`;
  return `var(--${c}-${DEFAULT_VARIANT}-${key})`;
};

const stateValue = (l3: string, state: string, property: string, channels: Declarations) => {
  // Purpose: the L4 recipe: apply the state's channel token to the L3 value
  const c = `--${state}-${property}`;
  if (channels[`${c}-toward`]) return `color-mix(in oklab, var(${l3}), var(${c}-toward) var(${c}-amount))`;
  if (property === "transform" || property === "filter") return `var(${l3}) var(${c})`;
  if (property === "opacity") return `calc(var(${l3}) * var(${c}))`;
  return `var(${c})`;
};

// ---------------------------------------------------------------------------
// Checks: only what keeps the hierarchy sound
// ---------------------------------------------------------------------------

const check = (meta: Schema, l2: Declarations, channels: Declarations) => {
  // Purpose: fail on a missing L2 default, an unknown or empty state, or overlapping channels
  const fail = (msg: string) => {
    // Purpose: stop the build with a message naming the component
    throw new Error(`${meta.title}: ${msg}`);
  };
  if (!meta.variants.includes(DEFAULT_VARIANT)) fail(`variants must include ${DEFAULT_VARIANT}`);
  if (!meta.states.includes("static")) fail("states must include static");
  const targets = targetsOf(meta);
  for (const t of targets)
    for (const p of t.themeableProperties)
      if (!l2[`--${p}`]) fail(`no L2 default --${p}`);
  const used = meta.states.filter((s) => s !== "static").map((s) => {
    if (!STATE_SELECTORS[s]) fail(`unknown state ${s}`);
    const props = R.chain((t) => R.intersection(channelOf(channels, s), t.themeableProperties).map((p) => keyOf(t, p)), targets);
    if (!props.length) fail(`state ${s} changes nothing: list one of ${channelOf(channels, s).join(", ")}`);
    return props;
  });
  const flat = R.flatten(used);
  if (R.uniq(flat).length !== flat.length) fail(`states share a channel property: ${flat.join(", ")}`);
};

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

const rule = (selector: string, decls: Declarations) =>
  // Purpose: render one CSS rule, or nothing when it has no declarations
  R.isEmpty(decls) ? "" : `${selector} {\n${R.toPairs(decls).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n`;

export const generateComponent = (meta: Schema, l2: Declarations, channels: Declarations) => {
  // Purpose: produce one component's L3 and L4 tokens and the CSS that consumes them
  check(meta, l2, channels);
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
      for (const p of t.themeableProperties) add(3, l3(p), variantValue(c, v, keyOf(t, p), p));
      css += rule(`${sel}${t.pseudo}`, { ...structural("static"), ...R.fromPairs(t.themeableProperties.map((p) => [p, `var(${l3(p)})`])) });
      for (const s of STATE_ORDER.filter((s) => s !== "static" && meta.states.includes(s))) {
        const changed = R.intersection(channelOf(channels, s), t.themeableProperties);
        for (const p of changed) add(4, `${l3(p)}-${s}`, stateValue(l3(p), s, p, channels));
        css += rule(`${sel}:where(${STATE_SELECTORS[s]})${t.pseudo}`,
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
