/**
 * Token generation: L3, L4 and L5 are computed from component metadata.
 *
 *   L1  --<name>                               primitives.ts   (hand-authored literals)
 *   L2  --<property>                           semantic.ts     (hand-authored, from L1)
 *   L3  --<component>-<property>               generated: var(--<property>) unless overridden
 *   L4  --<component>-<property>-<role>        generated from L3 by a role recipe
 *   L5  --<component>-<property>-<role>-<state> generated from L4 by a state recipe
 *
 * Every level references only the level immediately before it. Roles and states
 * need inputs from L2 (a role's tone, a state's mix amount, the theme's lightness
 * pole). Those inputs are carried down as ordinary L3/L4 tokens of the component:
 *
 *   L3  --button-tone-primary: var(--tone-primary)       role tone (consumed by L4)
 *   L3  --button-state-hover: var(--state-hover)         state parameter
 *   L4  --button-state-hover-primary: var(--button-state-hover)   (consumed by L5)
 *
 * so a single component, role or state can be retuned without touching L2.
 *
 * Overrides (a component's `tokens` export) replace a generated value at any
 * level. They must still reference only the level before their own.
 */
import * as R from "ramda";
import { primitives } from "./primitives";
import { semantic, light } from "./semantic";

export const ROLES =
  ["standard", "primary", "secondary", "tertiary", "positive", "warn", "danger", "informational"] as const;
export const STATES =
  [ "static", "focus", "hover", "active", "checked", "unchecked", "disabled"
  , "selected", "invalid", "open", "highlighted", "pressed", "current", "loading"
  ] as const;

export type Role = (typeof ROLES)[number];
export type State = (typeof STATES)[number];

export interface Meta
{ name: string
; cssProperties: readonly string[]
; roles: readonly Role[]
; states: readonly State[]
}

/** Per-component overrides, keyed relative to the component: "background", "background-primary", "background-primary-hover". */
export type Overrides = Record<string, string>;

export interface Spec { meta: Meta; tokens?: Overrides; source: string; }

export type Hierarchy = Record<string, Record<string, readonly string[]>>;

// --- Names ------------------------------------------------------------------

/** L3 → L4 → L5 name tree, exactly as the spec describes. */
export const generateTokenHierarchy = (meta: Meta): Hierarchy =>
  R.fromPairs(
    meta.cssProperties.map((p) => [
      `${meta.name}-${p}`,
      R.fromPairs(meta.roles.map((r) => [r, meta.states] as [string, readonly string[]])),
    ] as [string, Record<string, readonly string[]>]),
  );

/** Flatten a hierarchy into the L5 custom property names. */
export const toCSSVariables = (tokens: Hierarchy): string[] =>
  R.chain(
    ([property, roles]) =>
      R.chain(
        ([role, states]) => states.map((state) => `--${property}-${role}-${state}`),
        R.toPairs(roles),
      ),
    R.toPairs(tokens),
  );

// --- Property types -----------------------------------------------------------

/** How a property responds to roles and states. Decided by its name. */
export type PropertyType = "fill" | "ink" | "edge" | "opacity" | "other";

export const propertyType = (property: string): PropertyType => {
  if (/(^|-)(border-color|outline-color|ring|stroke|text-decoration-color|caret-color)$/.test(property)) return "edge";
  if (/(^|-)(background|background-color|track|range|indicator|thumb|dot|fill|overlay|accent-color)$/.test(property)) return "fill";
  if (/(^|-)(color|icon|ink)$/.test(property)) return "ink";
  if (/(^|-)opacity$/.test(property)) return "opacity";
  return "other";
};

/**
 * The L2 property default an un-overridden L3 token inherits. The longest
 * trailing segment run that names an L2 property wins: `trigger-padding-block`
 * → `--padding-block`, `item-background` → `--background`.
 */
const DEFAULT_ALIASES: Record<string, string> =
{ track: "background", range: "background", indicator: "background", thumb: "background"
, dot: "background", fill: "background", icon: "color", ring: "outline-color"
};
export const defaultFor = (property: string): string | undefined => {
  const parts = property.split("-");
  for (let i = 0; i < parts.length; i++) {
    const tail = parts.slice(i).join("-");
    const name = DEFAULT_ALIASES[tail] ?? tail;
    if (name in semantic) return name;
  }
  return undefined;
};

// --- Recipes ------------------------------------------------------------------

const MIXING: readonly State[] = ["hover", "highlighted", "open", "active", "pressed"];
const SELECTION: readonly State[] = ["checked", "selected", "current"];
const EDGE_STATES: readonly State[] = ["focus", "invalid"];
const DIMMING: readonly State[] = ["disabled", "loading"];

const isPaint = (t: PropertyType) => t === "fill" || t === "ink" || t === "edge";

/** L3 inputs a component needs so its roles and states can be generated. */
export const parametersOf = (meta: Meta): { tones: string[]; states: string[] } => {
  const tones = R.chain(
    (r: Role) => r === "standard" ? [] : [`tone-${r}`, `tone-${r}-ink`, `tone-${r}-surface`, `tone-${r}-surface-ink`],
    [...meta.roles],
  );
  const states = R.uniq(R.chain((s: State): string[] => {
    if (MIXING.includes(s)) return ["lightness", `state-${s}`];
    if (SELECTION.includes(s)) return [`state-${s}`, `state-${s}-ink`];
    if (EDGE_STATES.includes(s) || DIMMING.includes(s)) return [`state-${s}`];
    return [];
  }, [...meta.states]));
  return { tones, states };
};

/** L4: a property's value for a role, from its L3 token and the role's tone. */
export const roleRecipe = (component: string, property: string, role: Role): string => {
  const base = `var(--${component}-${property})`;
  if (role === "standard") return base;
  const tone = (suffix = "") => `var(--${component}-tone-${role}${suffix})`;
  switch (propertyType(property)) {
    case "fill": return tone();
    case "ink": return tone("-ink");
    case "edge": return role === "secondary" ? base : tone();
    default: return base;
  }
};

/** L5: a property's value in a state, from its L4 token and the state parameters. */
export const stateRecipe = (component: string, property: string, role: Role, state: State): string => {
  const self = `var(--${component}-${property}-${role})`;
  const param = (name: string) => `var(--${component}-${name}-${role})`;
  const type = propertyType(property);
  if (state === "static" || state === "unchecked") return self;
  if (MIXING.includes(state) && isPaint(type))
    return `color-mix(in oklab, ${self}, ${param("lightness")} ${param(`state-${state}`)})`;
  if (SELECTION.includes(state)) {
    if (type === "fill" || type === "edge") return param(`state-${state}`);
    if (type === "ink") return param(`state-${state}-ink`);
  }
  if (EDGE_STATES.includes(state) && type === "edge") return param(`state-${state}`);
  if (DIMMING.includes(state)) {
    if (isPaint(type)) return `color-mix(in oklab, ${self} calc(${param(`state-${state}`)} * 100%), transparent)`;
    if (type === "opacity") return `calc(${self} * ${param(`state-${state}`)})`;
  }
  return self;
};

// --- Generation ----------------------------------------------------------------

export interface Token { name: string; value: string; overridden: boolean; }
export interface ComponentTokens { name: string; l3: Token[]; l4: Token[]; l5: Token[]; }

const refsOf = (value: string) => [...value.matchAll(/var\(\s*--([\w-]+)/g)].map((m) => m[1]!);

export const validateMeta = (spec: Spec) => {
  const { meta, source } = spec;
  const fail = (msg: string) => { throw new Error(`${source}: ${msg}`); };
  if (!/^[a-z][a-z0-9-]*$/.test(meta.name)) fail(`bad name "${meta.name}"`);
  if (!meta.roles.length) fail("meta.roles must not be empty");
  if (!meta.states.includes("static")) fail(`meta.states must include "static"`);
  for (const r of meta.roles) if (!ROLES.includes(r)) fail(`unknown role "${r}"`);
  for (const s of meta.states) if (!STATES.includes(s)) fail(`unknown state "${s}"`);
  for (const list of [meta.cssProperties, meta.roles, meta.states] as readonly (readonly string[])[])
    if (R.uniq([...list]).length !== list.length) fail(`duplicate entry in ${JSON.stringify(list)}`);
};

export const generateComponent = (spec: Spec): ComponentTokens => {
  validateMeta(spec);
  const { meta, source } = spec;
  const c = meta.name;
  const overrides = { ...(spec.tokens ?? {}) };
  const take = (key: string): string | undefined => {
    const v = overrides[key];
    delete overrides[key];
    return v;
  };
  const params = parametersOf(meta);
  const paramNames = [...params.tones, ...params.states];

  const l3: Token[] = [];
  for (const p of meta.cssProperties) {
    const o = take(p);
    const d = defaultFor(p);
    if (o === undefined && d === undefined)
      throw new Error(`${source}: "${p}" has no L2 default; add an override for it in tokens`);
    l3.push({ name: `--${c}-${p}`, value: o ?? `var(--${d})`, overridden: o !== undefined });
  }
  for (const q of paramNames) {
    const o = take(q);
    l3.push({ name: `--${c}-${q}`, value: o ?? `var(--${q})`, overridden: o !== undefined });
  }

  const l4: Token[] = [];
  for (const p of meta.cssProperties) {
    for (const r of meta.roles) {
      const o = take(`${p}-${r}`);
      l4.push({ name: `--${c}-${p}-${r}`, value: o ?? roleRecipe(c, p, r), overridden: o !== undefined });
    }
  }
  for (const q of params.states) {
    for (const r of meta.roles) {
      const o = take(`${q}-${r}`);
      l4.push({ name: `--${c}-${q}-${r}`, value: o ?? `var(--${c}-${q})`, overridden: o !== undefined });
    }
  }

  const l5: Token[] = [];
  const names = toCSSVariables(generateTokenHierarchy(meta));
  for (const p of meta.cssProperties)
    for (const r of meta.roles)
      for (const s of meta.states) {
        const name = `--${c}-${p}-${r}-${s}`;
        if (!names.includes(name)) throw new Error(`internal: ${name} missing from hierarchy`);
        const o = take(`${p}-${r}-${s}`);
        l5.push({ name, value: o ?? stateRecipe(c, p, r, s), overridden: o !== undefined });
      }

  const leftover = Object.keys(overrides);
  if (leftover.length)
    throw new Error(`${source}: overrides match no generated token: ${leftover.join(", ")}`);

  // Strict adjacency: each level references only the level before it.
  const l2 = new Set(Object.keys(semantic));
  const l3n = new Set(l3.map((t) => t.name.slice(2)));
  const l4n = new Set(l4.map((t) => t.name.slice(2)));
  const check = (tokens: Token[], allowed: Set<string>, level: string, parent: string) => {
    for (const t of tokens)
      for (const ref of refsOf(t.value))
        if (!allowed.has(ref))
          throw new Error(`${source}: ${level} ${t.name} references --${ref}, which is not ${parent}`);
  };
  check(l3, l2, "L3", "an L2 token");
  check(l4, l3n, "L4", `an L3 token of ${c}`);
  check(l5, l4n, "L5", `an L4 token of ${c}`);
  return { name: c, l3, l4, l5 };
};

/** L1 and L2 adjacency checks (L2 may also reference other L2 tokens). */
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
