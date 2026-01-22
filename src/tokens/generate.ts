/**
 * Token generation: L3, L4 and L5 are computed from component metadata.
 *
 *   L1  --<name>                                   primitives.ts   (hand-authored literals)
 *   L2  --<name>                                   semantic.ts     (hand-authored, from L1)
 *   L3  --<component>-<property>                   generated: var(--<property>) unless overridden
 *   L4  --<component>-<property>-<variant>         generated from L3 by a variant recipe
 *   L5  --<component>-<property>-<variant>-<state> generated from L4 by a state recipe
 *
 * L2 values needed by recipes (tones, the interaction colour, mix amounts, …)
 * are carried down as ordinary L3/L4 tokens called bridges, so no reference
 * ever skips a level. Bridges are inferred, never declared.
 */
import * as R from "ramda";
import { primitives } from "./primitives";
import { semantic, light } from "./semantic";
import {
  VARIANTS, STATES,
  type Variant, type State, type PropertyType, type Meta, type Overrides, type Spec,
} from "./types";

export { VARIANTS, STATES } from "./types";
export type { Variant, State, PropertyType, Meta, Overrides, Spec } from "./types";

export type Hierarchy = Record<string, Record<string, readonly string[]>>;

// --- Names ------------------------------------------------------------------

/** L3 → L4 → L5 name tree, exactly as the spec describes. */
export const generateTokenHierarchy = (meta: Meta): Hierarchy =>
  R.fromPairs(
    meta.cssProperties.map((p) => [
      `${meta.name}-${p}`,
      R.fromPairs(meta.variants.map((v) => [v, meta.states] as [string, readonly string[]])),
    ] as [string, Record<string, readonly string[]>]),
  );

/** Flatten a hierarchy into the L5 custom property names. */
export const toCSSVariables = (tokens: Hierarchy): string[] =>
  R.chain(
    ([property, variants]) =>
      R.chain(
        ([variant, states]) => states.map((state) => `--${property}-${variant}-${state}`),
        R.toPairs(variants),
      ),
    R.toPairs(tokens),
  );

// --- Property types -----------------------------------------------------------

const FILL = /^(background|background-color|accent-color|fill)$/;
const INK = /^(color|caret-color|stroke)$/;
const EDGE = /^(border-color|outline-color|text-decoration-color|column-rule-color)$/;

/** The trailing CSS property name wins for compound names: `trigger-background` → fill. */
const tail = (property: string) => property.replace(/^--/, "").split("-").at(-1) ?? property;

export const propertyType = (property: string, meta?: Meta): PropertyType => {
  const declared = meta?.types?.[property];
  if (declared) return declared;
  const t = tail(property);
  if (FILL.test(t)) return "fill";
  if (INK.test(t)) return "ink";
  if (EDGE.test(t)) return "edge";
  return "other";
};

const isPaint = (t: PropertyType) => t === "fill" || t === "ink" || t === "edge";

/**
 * The L2 property default an un-overridden L3 token inherits. The longest
 * trailing segment run that names an L2 token wins.
 */
const DEFAULT_ALIASES: Record<string, string> =
{ track: "background", range: "background", indicator: "background", thumb: "background"
, dot: "background", fill: "background", icon: "color", ring: "outline-color"
};
export const defaultFor = (property: string): string | undefined => {
  if (property.startsWith("--")) return undefined;
  const parts = property.split("-");
  for (let i = 0; i < parts.length; i++) {
    const part = parts.slice(i).join("-");
    const name = DEFAULT_ALIASES[part] ?? part;
    if (name in semantic) return name;
  }
  return undefined;
};

// --- Channels ----------------------------------------------------------------

interface ChannelPreference { state: State; preference: readonly string[]; all?: boolean; }

/** states.md §6.3. Selection states claim every available property in their list. */
const CHANNEL_PREFERENCES: readonly ChannelPreference[] = [
  { state: "disabled", preference: ["opacity"] },
  { state: "loading", preference: ["filter"] },
  { state: "invalid", preference: ["border-color", "outline-color", "box-shadow"] },
  { state: "checked", preference: ["background", "color", "border-color"], all: true },
  { state: "selected", preference: ["background", "color", "border-color"], all: true },
  { state: "current", preference: ["background", "color", "border-color"], all: true },
  { state: "pressed", preference: ["background", "color", "border-color"], all: true },
  { state: "open", preference: ["border-color", "box-shadow"] },
  { state: "focus", preference: ["outline-color"] },
  { state: "active", preference: ["transform"] },
  { state: "hover", preference: ["background", "box-shadow", "filter"] },
  { state: "highlighted", preference: ["background", "box-shadow"] },
];

export const assignChannels = (meta: Meta): Partial<Record<State, readonly string[]>> => {
  if (meta.channels) return meta.channels;
  const taken = new Set<string>();
  const channels: Partial<Record<State, readonly string[]>> = {};
  for (const { state, preference, all } of CHANNEL_PREFERENCES) {
    if (!meta.states.includes(state)) continue;
    const available = preference.filter((p) => meta.cssProperties.includes(p) && !taken.has(p));
    if (!available.length) continue;
    const chosen = all ? available : [available[0]!];
    chosen.forEach((p) => taken.add(p));
    channels[state] = chosen;
  }
  return channels;
};

/** Emit order from states.md §6.5: static, then interactions before conditions. */
export const stateOrder = (meta: Meta): readonly State[] => {
  const rest = CHANNEL_PREFERENCES.map((p) => p.state).filter((s) => meta.states.includes(s));
  return ["static", ...rest, ...meta.states.filter((s) => s !== "static" && !rest.includes(s))];
};

// --- Recipes ------------------------------------------------------------------

const MIXING: readonly State[] = ["hover", "highlighted", "open"];
const SELECTION: readonly State[] = ["checked", "selected", "current", "pressed"];
const STATUS_VARIANTS: readonly Variant[] = ["primary", "positive", "warning", "danger", "informational"];

/** L4: a property's value for a variant, from its L3 token and the variant's tone. */
export const variantRecipe =
  (component: string, property: string, variant: Variant, meta: Meta, tokenName = property): string => {
  const base = `var(--${component}-${tokenName})`;
  if (variant === "secondary") return base;
  const tone = (suffix = "") => `var(--${component}-tone-${variant}${suffix})`;
  switch (propertyType(property, meta)) {
    case "fill": return tone();
    case "ink": return tone("-ink");
    case "edge": return tone();
    default: return base;
  }
};

/** L5: a property's value in a state, from its L4 token and the component's bridges. */
export const stateRecipe =
  (component: string, property: string, variant: Variant, state: State, meta: Meta, tokenName = property): string => {
    const self = `var(--${component}-${tokenName}-${variant})`;
    const bridge = (name: string) => `var(--${component}-${name}-${variant})`;
    const type = propertyType(property, meta);
    if (state === "static" || state === "unchecked") return self;
    if (state === "open" && property === "border-color") return bridge("ring");
    if (MIXING.includes(state)) {
      if (property === "box-shadow")
        return `${self}, 0 0 0 0.25em color-mix(in oklab, ${bridge("interaction")} ${bridge(`mix-${state}`)}, transparent)`;
      if (isPaint(type))
        return `color-mix(in oklab, ${self}, ${bridge("interaction")} ${bridge(`mix-${state}`)})`;
      if (state === "hover" && property === "filter")
        return `${self} brightness(calc(100% + ${bridge("mix-hover")}))`;
    }
    if (SELECTION.includes(state)) {
      if (type === "fill" || type === "edge") return bridge("selection");
      if (type === "ink") return bridge("selection-ink");
    }
    if (state === "focus" && property === "outline-color") return bridge("ring");
    if (state === "active" && property === "transform") return `${self} scale(${bridge("scale-active")})`;
    if (state === "invalid" && (type === "edge" || property === "box-shadow"))
      return `color-mix(in oklab, ${self}, ${bridge("invalid")} ${bridge("mix-invalid")})`;
    if (state === "loading" && property === "filter") return `${self} saturate(50%)`;
    if (state === "disabled" && property === "opacity") return `calc(${self} * ${bridge("opacity-disabled")})`;
    return self;
  };

// --- Bridges -----------------------------------------------------------------

/** L2 names a component must carry down for its variants, states and overrides. */
export const bridgesOf = (meta: Meta, overrides: Overrides = {}): string[] => {
  const names = new Set<string>();
  const add = (n: string) => { if (n in semantic || n in light) names.add(n); };
  for (const v of meta.variants) if (v !== "secondary") {
    add(`tone-${v}`);
    add(`tone-${v}-ink`);
  }
  for (const s of meta.states) {
    if (MIXING.includes(s)) { add("interaction"); add(`mix-${s}`); }
    if (SELECTION.includes(s)) { add("selection"); add("selection-ink"); }
    if (s === "focus") add("ring");
    if (s === "invalid") { add("invalid"); add("mix-invalid"); }
    if (s === "disabled") add("opacity-disabled");
    if (s === "active") add("scale-active");
  }
  // An override can introduce a bridge by naming it, e.g. var(--card-tone-primary).
  const matrix = new Set(meta.cssProperties);
  for (const value of Object.values(overrides))
    for (const m of value.matchAll(/var\(\s*--[\w-]*?(tone-[\w-]+|interaction|mix-[\w-]+|ring|selection[\w-]*|invalid|opacity-disabled|scale-active|tint|lightness)(?:-[\w-]+)?\s*[,)]/g)) {
      const name = m[1]!;
      if (!matrix.has(name)) add(name);
    }
  return [...names].sort();
};

// --- Generation ---------------------------------------------------------------

export interface Token { name: string; value: string; overridden: boolean; }
export interface ComponentTokens
{ name: string; meta: Meta; channels: Partial<Record<State, readonly string[]>>
; l3: Token[]; l4: Token[]; l5: Token[]; all: Token[];
}

const refsOf = (value: string) => [...value.matchAll(/var\(\s*--([\w-]+)/g)].map((m) => m[1]!);

export const validateMeta = (spec: Spec) => {
  const { meta, source } = spec;
  const fail = (msg: string) => { throw new Error(`${source}: ${msg}`); };
  if (!/^[a-z][a-z0-9-]*$/.test(meta.name)) fail(`bad name "${meta.name}"`);
  if (meta.element !== undefined && !/^[a-z][a-z0-9-]*$/.test(meta.element)) fail(`bad element "${meta.element}"`);
  if (!meta.variants.length) fail("meta.variants must not be empty");
  if (!meta.variants.includes("secondary")) fail('meta.variants must include "secondary"');
  if (!meta.states.includes("static")) fail('meta.states must include "static"');
  if (new Set(meta.cssProperties).size !== meta.cssProperties.length) fail("duplicate cssProperties entry");
  for (const v of meta.variants) if (!VARIANTS.includes(v)) fail(`unknown variant "${v}"`);
  for (const s of meta.states) if (!STATES.includes(s)) fail(`unknown state "${s}"`);
  const channels = assignChannels(meta);
  for (const s of meta.states) {
    if (s === "static" || s === "unchecked") continue;
    if (!channels[s]?.length) fail(`state "${s}" has an empty channel; add a suitable cssProperty or set meta.channels`);
  }
  const claimed = new Map<string, State>();
  for (const [s, props] of Object.entries(channels))
    for (const p of props ?? []) {
      if (!meta.cssProperties.includes(p)) fail(`channel of "${s}" names unknown cssProperty "${p}"`);
      const prev = claimed.get(p);
      if (prev && prev !== "unchecked" && s !== "unchecked")
        fail(`states "${prev}" and "${s}" both claim channel "${p}"`);
      claimed.set(p, s as State);
    }
  const validProperty = (p: string) => /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(p) || /^--[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/.test(p);
  for (const p of meta.cssProperties) if (!validProperty(p)) fail(`unknown cssProperty "${p}"`);
  for (const [state, literals] of Object.entries(meta.structure ?? {})) {
    if (!meta.states.includes(state as State)) fail(`structure names unknown state "${state}"`);
    for (const p of Object.keys(literals ?? {})) {
      if (meta.cssProperties.includes(p)) fail(`property "${p}" is both structural and themable`);
      if (Object.values(literals ?? {}).some((v) => v.includes("var(")))
        fail(`structural property "${p}" contains var()`);
    }
  }
  for (const [pseudo, props] of Object.entries(meta.pseudoElements ?? {})) {
    if (!/^::[a-z-]+$/.test(pseudo)) fail(`bad pseudoElement "${pseudo}"`);
    for (const p of props) {
      if (!validProperty(p)) fail(`bad pseudoElement property "${p}" for ${pseudo}`);
      const literals = meta.pseudoStructure?.[pseudo] ?? {};
      for (const [state, values] of Object.entries(literals))
        if (Object.keys(values ?? {}).includes(p)) fail(`pseudo property "${p}" of ${pseudo} is both structural and themable`);
    }
  }
  if (VARIANTS.includes(meta.name as Variant)) fail(`name "${meta.name}" collides with a variant`);
};

/** Override keys use dots between slots; dashed keys are accepted for compatibility. */
const keyFor = (overrides: Overrides, slots: string[]): string | undefined => {
  const dotted = slots.join(".");
  const dashed = slots.join("-");
  if (dotted in overrides) return dotted;
  if (dashed in overrides) return dashed;
  return undefined;
};

export const generateComponent = (spec: Spec): ComponentTokens => {
  validateMeta(spec);
  const { meta, source, tokens = {} } = spec;
  const overrides: Record<string, string> = { ...tokens };
  const c = meta.name;
  const take = (slots: string[]): string | undefined => {
    const key = keyFor(overrides, slots);
    if (key === undefined) return undefined;
    const value = overrides[key]!;
    delete overrides[key];
    return value;
  };
  const bridges = bridgesOf(meta, tokens);
  const channels = assignChannels(meta);

  const slug = (property: string) => property.replace(/^--/, "");
  /** cssProperties and their pseudo-element counterparts share one matrix shape. */
  const matrix: Array<{ property: string; tokenName: string }> = [
    ...meta.cssProperties.map((p) => ({ property: p, tokenName: slug(p) })),
    ...Object.entries(meta.pseudoElements ?? {}).flatMap(([pseudo, props]) =>
      props.map((p) => ({ property: p, tokenName: `${pseudo.slice(2)}-${slug(p)}` }))),
  ];

  const l3: Token[] = [];
  for (const { property, tokenName } of matrix) {
    const o = take([tokenName]);
    const d = defaultFor(property);
    if (o === undefined && d === undefined)
      throw new Error(`${source}: "${property}" has no L2 default; add an override for it in tokens`);
    l3.push({ name: `--${c}-${tokenName}`, value: o ?? `var(--${d})`, overridden: o !== undefined });
  }
  for (const q of bridges) {
    const o = take([q]);
    l3.push({ name: `--${c}-${q}`, value: o ?? `var(--${q})`, overridden: o !== undefined });
  }

  const l4: Token[] = [];
  for (const { property, tokenName } of matrix)
    for (const v of meta.variants) {
      const o = take([tokenName, v]);
      l4.push({ name: `--${c}-${tokenName}-${v}`,
        value: o ?? variantRecipe(c, property, v, meta, tokenName), overridden: o !== undefined });
    }
  for (const q of bridges)
    for (const v of meta.variants) {
      const o = take([q, v]);
      l4.push({ name: `--${c}-${q}-${v}`, value: o ?? `var(--${c}-${q})`, overridden: o !== undefined });
    }

  const l5: Token[] = [];
  for (const { property, tokenName } of matrix)
    for (const v of meta.variants)
      for (const s of meta.states) {
        const n = `--${c}-${tokenName}-${v}-${s}`;
        const o = take([tokenName, v, s]);
        l5.push({ name: n,
          value: o ?? stateRecipe(c, property, v, s, meta, tokenName), overridden: o !== undefined });
      }

  const leftover = Object.keys(overrides);
  if (leftover.length)
    throw new Error(`${source}: overrides match no generated token: ${leftover.join(", ")}`);

  // Reference rules: each level may reference its own level and the one below.
  const l2n = new Set(Object.keys(semantic));
  const l3n = new Set(l3.map((t) => t.name.slice(2)));
  const l4n = new Set(l4.map((t) => t.name.slice(2)));
  const l5n = new Set(l5.map((t) => t.name.slice(2)));
  const check = (tokens: Token[], allowed: Set<string>, level: string, parent: string) => {
    for (const t of tokens)
      for (const ref of refsOf(t.value))
        if (!allowed.has(ref))
          throw new Error(`${source}: ${level} ${t.name} references --${ref}, which is not ${parent}`);
  };
  check(l3, new Set([...l2n, ...l3n]), "L3", "an L2 or L3 token of the same component");
  check(l4, new Set([...l3n, ...l4n]), "L4", "an L3 or L4 token of the same component");
  check(l5, new Set([...l4n, ...l5n]), "L5", "an L4 or L5 token of the same component");

  const all = [...l3, ...l4, ...l5];
  validateNames(all, c, source);
  validateCycles(all, source);
  return { name: c, meta, channels, l3, l4, l5, all };
};

const validateNames = (tokens: Token[], component: string, source: string) => {
  const prefix = `--${component}-`;
  const bad = /\b(variant|state|role)\b|-(value|source|role|standard|warn)$/;
  for (const t of tokens) {
    const local = t.name.startsWith(prefix) ? t.name.slice(prefix.length) : t.name.slice(2);
    if (bad.test(local)) throw new Error(`${source}: forbidden token name segment in ${t.name}`);
  }
};

const validateCycles = (tokens: Token[], source: string) => {
  const values = new Map(tokens.map((t) => [t.name.slice(2), t.value]));
  const visiting = new Set<string>();
  const done = new Set<string>();
  const walk = (name: string, path: string[]) => {
    if (visiting.has(name)) throw new Error(`${source}: token cycle: ${[...path, name].map((n) => `--${n}`).join(" → ")}`);
    if (done.has(name)) return;
    visiting.add(name);
    for (const ref of refsOf(values.get(name) ?? "")) if (values.has(ref)) walk(ref, [...path, name]);
    visiting.delete(name);
    done.add(name);
  };
  for (const name of values.keys()) walk(name, []);
};

/** L1/L2 adjacency checks. */
export const validateFoundations = () => {
  const l1 = new Set(Object.keys(primitives));
  for (const [k, v] of Object.entries(primitives))
    if (refsOf(v).length) throw new Error(`L1 --${k} must be a literal`);
  const l2 = new Set(Object.keys(semantic));
  for (const [k, v] of [...Object.entries(semantic), ...Object.entries(light)]) {
    if (l1.has(k)) throw new Error(`L2 --${k} shadows an L1 primitive`);
    for (const ref of refsOf(v))
      if (!l1.has(ref) && !l2.has(ref)) throw new Error(`L2 --${k} references unknown --${ref}`);
  }
  for (const k of Object.keys(light)) if (!l2.has(k)) throw new Error(`light theme sets unknown --${k}`);
};
