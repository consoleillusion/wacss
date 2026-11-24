import * as R from "ramda";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Declarations = Record<string, string>;

/** The styling part of one target: the component itself, one of its pseudo-elements, or one of
 * its parts, the descendant elements it styles. */
type Target =
{ pseudo: string                                  // "" or e.g. "::after"
, on: string                                      // "" or a selector the element must match to draw the pseudo-element
, part: string                                    // "" or the part's name, e.g. "cell"
, selector: string                                // "" or the part's elements within the component, e.g. "th, td"
, role: string                                    // "" or the role the part's colors come from, whatever the variant
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
, roles: Record<string, string>                   // each variant's color role: accent, surface, pop, …
, states: string[]
, themeableProperties: string[]
, structuralProperties?: Record<string, Declarations>
, pseudoElements?: Record<string, { on?: string; themeableProperties?: string[]; structuralProperties?: Record<string, Declarations> }>
, values?: Record<string, string>                 // the default variant's value of a non-color property, by key, in L1 and L2 tokens
, parts?: Record<string, { selector: string; role?: string; themeableProperties?: string[]; structuralProperties?: Record<string, Declarations> }>
, arguments: Record<string, unknown>
};

/** A color role, from vocabulary.dhall: its look, the value each color property takes, the
 * background its text is made from when not its own (text-on), and its values in a state. */
export type Role = { look: string; "text-on"?: string } & Record<string, any>;
/** A state, from vocabulary.dhall: its selector, whether it is a pointer state, and its meaning. */
export type State = { name: string; selector: string; pointer: boolean; meaning: string };
/** The shared vocabulary the generator works from (vocabulary.dhall): variants in order, the
 * default first; states in rule order; the interactive elements; the color properties; what a
 * component derives from its background; and the color roles. */
export type Vocabulary =
{ variants: { name: string; meaning: string }[]
, states: State[]
, interactive: string
, colorProperties: string[]
, derived: Record<string, string>
, roles: Record<string, Role>
};

export type Token =
{ name: string
, level: 1 | 2 | 3 | 4
, value: string
, group: string                                   // file (L1/L2) or component name (L3/L4)
, refs: string[]
};

// ---------------------------------------------------------------------------
// The vocabulary's rules
// ---------------------------------------------------------------------------

const defaultVariant = (vocabulary: Vocabulary) =>
  // Purpose: the default variant: the vocabulary's first
  vocabulary.variants[0]!.name;

export const stateSelector = (vocabulary: Vocabulary, state: string) => {
  // Purpose: a state's selector; a pointer state applies only to the interactive elements, so
  // nothing that cannot be used ever looks as if it could
  const s = vocabulary.states.find((x) => x.name === state)!;
  return s.pointer ? `:is(${vocabulary.interactive})${s.selector}` : s.selector;
};

const isColor = (vocabulary: Vocabulary, property: string) =>
  // Purpose: whether a property takes its value from the variant's color role
  vocabulary.colorProperties.includes(property);

// ---------------------------------------------------------------------------
// Names: the hierarchy (the stub, with variant joined to the component)
// ---------------------------------------------------------------------------

const targetsOf = (meta: Schema): Target[] =>
  // Purpose: list the component, each of its pseudo-elements and each of its parts as styling targets
  [ { pseudo: "", on: "", part: "", selector: "", role: "", themeableProperties: meta.themeableProperties, structuralProperties: meta.structuralProperties ?? {} }
  , ...R.toPairs(meta.pseudoElements ?? {}).map(([pseudo, t]) =>
      ({ pseudo, on: t.on ?? "", part: "", selector: "", role: "", themeableProperties: t.themeableProperties ?? [], structuralProperties: t.structuralProperties ?? {} }))
  , ...R.toPairs(meta.parts ?? {}).map(([part, t]) =>
      ({ pseudo: "", on: "", part, selector: t.selector, role: t.role ?? "", themeableProperties: t.themeableProperties ?? [], structuralProperties: t.structuralProperties ?? {} }))
  ];

const keyOf = (target: Target, property: string) =>
  // Purpose: the property slot of a token name: "background", "after-transform" for ::after, or
  // "cell-padding-block" for a part named cell
  target.pseudo ? `${target.pseudo.replace(/^:+/, "")}-${property}`
  : target.part ? `${target.part}-${property}`
  : property;

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

const roleValue = (vocabulary: Vocabulary, role: string, property: string, ownBackground?: string): string | undefined => {
  // Purpose: the value a color property takes in a role: the role's own value; without one, the
  // property's derived template over the role's text-on, else the component's own background
  // token, else the role's background
  const r = vocabulary.roles[role]!;
  if (r[property] !== undefined) return r[property];
  const template = vocabulary.derived[property];
  const background = r["text-on"] ?? ownBackground ?? r.background;
  return template && background ? template.replace("{background}", background) : undefined;
};

const variantValue = (vocabulary: Vocabulary, c: string, v: string, key: string, property: string, color?: string, own?: string) => {
  // Purpose: the L3 recipe: a color takes its value from the variant's role; anything else takes,
  // on the default variant, the schema's own value for it, else the L2 default, and on the others
  // the default variant's value
  if (isColor(vocabulary, property)) return color!;
  if (v === defaultVariant(vocabulary)) return own ?? `var(--${property})`;
  return `var(--${c}-${defaultVariant(vocabulary)}-${key})`;
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

const check = (meta: Schema, l2: Declarations, vocabulary: Vocabulary) => {
  // Purpose: fail when a generated token or rule would have nothing to refer to
  const fail = (msg: string) => {
    // Purpose: stop the build with a message naming the component
    throw new Error(`${meta.title}: ${msg}`);
  };
  if (!meta.variants.includes(defaultVariant(vocabulary))) fail(`variants must include ${defaultVariant(vocabulary)}`);
  for (const t of targetsOf(meta))
    for (const p of t.themeableProperties)
      if (isColor(vocabulary, p)) {
        for (const v of meta.variants)
          if (!roleValue(vocabulary, t.role || meta.roles[v]!, p, t.themeableProperties.includes("background") ? "own" : undefined))
            fail(`role ${t.role || meta.roles[v]} gives no ${p} for variant ${v}`);
      } else if (!meta.values?.[keyOf(t, p)] && !l2[`--${p}`]) fail(`no L2 default --${p}`);
  for (const s of meta.states)
    if (!vocabulary.states.some((x) => x.name === s)) fail(`unknown state ${s}`);
};

// ---------------------------------------------------------------------------
// Generation
// ---------------------------------------------------------------------------

const rule = (selector: string, decls: Declarations) =>
  // Purpose: render one CSS rule, or nothing when it has no declarations
  R.isEmpty(decls) ? "" : `${selector} {\n${R.toPairs(decls).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}\n`;

export const generateComponent = (meta: Schema, l2: Declarations, channels: Declarations, vocabulary: Vocabulary) => {
  // Purpose: produce one component's L3 and L4 tokens and the CSS that consumes them
  check(meta, l2, vocabulary);
  const c = meta.name;
  const base = meta.element ? `:where(${meta.element.join(", ")})` : `.${c}`;
  const variantSelector = (v: string) =>
    // Purpose: the selector of one variant; the default variant has no class
    v === defaultVariant(vocabulary) ? base : meta.element ? `${base}:where(.${v})` : `${base}.${v}`;
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
        (v === defaultVariant(vocabulary) ? t.structuralProperties[s] ?? {} : {});
      const l3 = (p: string) =>
        // Purpose: the L3 name of a property for this variant and target
        `--${c}-${v}-${keyOf(t, p)}`;
      // A color's value comes from the variant's role; the text is made from the variant's own
      // background token when the target has one.
      const own = t.themeableProperties.includes("background") ? `var(${l3("background")})` : undefined;
      for (const p of t.themeableProperties)
        add(3, l3(p), variantValue(vocabulary, c, v, keyOf(t, p), p, isColor(vocabulary, p) ? roleValue(vocabulary, t.role || meta.roles[v]!, p, own) : undefined, meta.values?.[keyOf(t, p)]));
      // Static is a state like any other: every property has a static token, equal to its L3 value,
      // and the base rule reads it, so the CSS only ever reads state tokens.
      for (const p of t.themeableProperties) add(4, `${l3(p)}-static`, `var(${l3(p)})`);
      const on = t.on ? `:where(${t.on})` : "";
      // A part's rules select its elements within the component, after any state of the component.
      const within = t.selector ? ` :where(${t.selector})` : "";
      css += rule(`${sel}${on}${t.pseudo}${within}`, { ...structural("static"), ...R.fromPairs(t.themeableProperties.map((p) => [p, `var(${l3(p)}-static)`])) });
      for (const s of vocabulary.states.map((x) => x.name).filter((s) => s !== "static" && meta.states.includes(s))) {
        // Every property has a token in every state (the full matrix): a property the state's channel
        // changes takes the channel recipe; any other keeps its static value. The state's rule
        // declares only what the state changes, so states that are true together do not undo each other.
        // A color property also changes in a state when the variant's role gives its own value of
        // it for that state (vocabulary.dhall); that value is used as it is.
        const roleState = (p: string): string => (isColor(vocabulary, p) && vocabulary.roles[t.role || meta.roles[v]!]?.[s]?.[p]) || "";
        // The component's own value for a property in a state, from its schema's stateValues,
        // comes first: "unchanged" keeps the static value; anything else is used as it is.
        const own = (p: string): string | undefined => (meta as any).stateValues?.[s]?.[keyOf(t, p)];
        const changed = t.themeableProperties.filter((p) =>
          own(p) !== undefined ? own(p) !== "unchanged" : roleState(p) || channelOf(channels, s).includes(keyOf(t, p)));
        for (const p of t.themeableProperties)
          add(4, `${l3(p)}-${s}`,
            !changed.includes(p) ? `var(${l3(p)})`
            : own(p) !== undefined ? own(p)!
            : roleState(p) ? roleState(p)
            : stateValue(l3(p), s, keyOf(t, p), p, channels)!);
        css += rule(`${sel}:where(${stateSelector(vocabulary, s)})${on}${t.pseudo}${within}`,
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
