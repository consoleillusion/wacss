export type RawSchema = Record<string, any>;

export type Schema = {
  title: string;
  element?: string;
  name: string;
  variants: string[];
  states: string[];
  themeableProperties: string[];
  structuralProperties: Record<string, Record<string, string>>;
  channels?: Record<string, string[]>;
};

export type PropertyType = "fill" | "ink" | "edge" | "other";
export type Overrides = Record<string, string>;

export const FILL = new Set(["background", "background-color", "accent-color", "fill"]);
export const INK = new Set(["color", "caret-color", "stroke"]);
export const EDGE = new Set([
  "border-color",
  "outline-color",
  "text-decoration-color",
  "column-rule-color",
]);

export const STATE_ORDER = [
  "static", "disabled", "loading", "invalid", "checked", "selected", "current",
  "pressed", "open", "focus", "active", "hover", "highlighted",
];

export const EMIT_ORDER = [
  "static", "highlighted", "hover", "active", "focus", "open", "pressed",
  "current", "selected", "checked", "invalid", "loading", "disabled",
];

export const CHANNEL_PREFS: Record<string, { props: string[]; claimAll: boolean }> = {
  disabled: { props: ["opacity"], claimAll: false },
  loading: { props: ["filter"], claimAll: false },
  invalid: { props: ["border-color", "outline-color", "box-shadow"], claimAll: false },
  checked: { props: ["background", "color", "border-color"], claimAll: true },
  selected: { props: ["background", "color", "border-color"], claimAll: true },
  current: { props: ["background", "color", "border-color"], claimAll: true },
  pressed: { props: ["background", "color", "border-color"], claimAll: true },
  open: { props: ["border-color", "box-shadow"], claimAll: false },
  focus: { props: ["outline-color"], claimAll: false },
  active: { props: ["transform"], claimAll: false },
  hover: { props: ["background", "box-shadow", "filter"], claimAll: false },
  highlighted: { props: ["background", "box-shadow"], claimAll: false },
};

const CO_OCCUR_EXCLUSIVE = new Set(["checked", "unchecked"]);

export function normalizeSchema(raw: RawSchema): Schema {
  const src = raw.themeableProperties || raw.cssProperties || raw.variants ? raw : raw.properties ?? raw;
  const title = raw.title ?? src.title ?? "Component";
  return {
    title,
    element: raw.element ?? src.element,
    name: (raw.name ?? src.name ?? title).toLowerCase(),
    variants: src.variants ?? [],
    states: src.states ?? [],
    themeableProperties: src.themeableProperties ?? src.cssProperties ?? [],
    structuralProperties: src.structuralProperties ?? src.structure ?? {},
    channels: src.channels,
  };
}

export function propertyType(property: string): PropertyType {
  if (FILL.has(property)) return "fill";
  if (INK.has(property)) return "ink";
  if (EDGE.has(property)) return "edge";
  return "other";
}

export function canCoOccur(a: string, b: string): boolean {
  if (a === b) return false;
  if (CO_OCCUR_EXCLUSIVE.has(a) && CO_OCCUR_EXCLUSIVE.has(b)) return true;
  return true;
}

export function computeChannels(schema: Schema): Record<string, string[]> {
  if (schema.channels) return schema.channels;
  const available = new Set(schema.themeableProperties);
  const takenBy: Record<string, string> = {};
  const channels: Record<string, string[]> = {};
  for (const state of STATE_ORDER) {
    if (!schema.states.includes(state)) continue;
    if (state === "static" || state === "unchecked") { channels[state] = []; continue; }
    const pref = CHANNEL_PREFS[state];
    if (!pref) { channels[state] = []; continue; }
    const claimed: string[] = [];
    for (const prop of pref.props) {
      if (!available.has(prop)) continue;
      const owner = takenBy[prop];
      if (owner && canCoOccur(owner, state)) continue;
      claimed.push(prop);
      if (!pref.claimAll) break;
    }
    for (const prop of claimed) takenBy[prop] = state;
    channels[state] = claimed;
  }
  return channels;
}

export function bridge(component: string, name: string, variant: string): string {
  return `var(--${component}-${name}-${variant})`;
}

export function variantRecipe(component: string, property: string, variant: string): string {
  const l3 = `var(--${component}-${property})`;
  if (variant === "secondary") return l3;
  const type = propertyType(property);
  if (type === "other") return l3;
  if (variant === "tertiary") {
    if (type === "fill" || type === "edge") return `var(--${component}-tone-tertiary)`;
    if (type === "ink") return `var(--${component}-tone-tertiary-ink)`;
  }
  const tone = `var(--${component}-tone-${variant})`;
  const toneInk = `var(--${component}-tone-${variant}-ink)`;
  if (type === "fill" || type === "edge") return tone;
  if (type === "ink") return toneInk;
  return l3;
}

export function stateRecipe(component: string, property: string, variant: string, state: string, l4: string): string {
  const type = propertyType(property);
  const b = (name: string) => bridge(component, name, variant);
  if (state === "hover" || state === "highlighted" || state === "open") {
    if (type === "fill" || type === "ink" || type === "edge") return `color-mix(in oklab, ${l4}, ${b("interaction")} ${b(`mix-${state}`)})`;
    if (property === "box-shadow") return `${l4}, 0 0 0 0.25em color-mix(in oklab, ${b("interaction")} ${b(`mix-${state}`)}, transparent)`;
    if (property === "filter" && state === "hover") return `${l4} brightness(calc(100% + ${b("mix-hover")}))`;
  }
  if (state === "focus" && property === "outline-color") return b("ring");
  if (state === "active" && property === "transform") return `${l4} scale(${b("scale-active")})`;
  if (["checked", "selected", "current", "pressed"].includes(state)) {
    if (type === "fill" || type === "edge") return b("selection");
    if (type === "ink") return b("selection-ink");
  }
  if (state === "open" && property === "border-color") return b("ring");
  if (state === "invalid" && (type === "edge" || property === "box-shadow")) return `color-mix(in oklab, ${l4}, ${b("invalid")} ${b("mix-invalid")})`;
  if (state === "loading" && property === "filter") return `${l4} saturate(50%)`;
  if (state === "disabled" && property === "opacity") return `calc(${l4} * ${b("opacity-disabled")})`;
  return l4;
}

export function inferBridges(schema: Schema, channels: Record<string, string[]>): string[] {
  const bridges = new Set<string>();
  for (const variant of schema.variants) {
    if (variant === "secondary") continue;
    for (const prop of schema.themeableProperties) {
      const type = propertyType(prop);
      if (type === "other") continue;
      if (type === "ink") bridges.add(`tone-${variant}-ink`); else bridges.add(`tone-${variant}`);
      if (variant === "tertiary") { bridges.add("tone-tertiary"); bridges.add("tone-tertiary-ink"); }
    }
  }
  for (const state of schema.states) {
    const channel = channels[state] ?? [];
    for (const prop of channel) {
      const type = propertyType(prop);
      if (["hover", "highlighted", "open"].includes(state)) {
        if (type === "fill" || type === "ink" || type === "edge" || prop === "box-shadow") { bridges.add("interaction"); bridges.add(`mix-${state}`); }
        if (prop === "filter" && state === "hover") bridges.add("mix-hover");
      }
      if (state === "focus" && prop === "outline-color") bridges.add("ring");
      if (state === "active" && prop === "transform") bridges.add("scale-active");
      if (["checked", "selected", "current", "pressed"].includes(state)) {
        if (type === "fill" || type === "edge") bridges.add("selection");
        if (type === "ink") bridges.add("selection-ink");
      }
      if (state === "open" && prop === "border-color") bridges.add("ring");
      if (state === "invalid") { bridges.add("invalid"); bridges.add("mix-invalid"); }
      if (state === "disabled" && prop === "opacity") bridges.add("opacity-disabled");
    }
  }
  return [...bridges].sort();
}

export function overrideKey(prop: string, variant?: string, state?: string): string {
  return [prop, variant, state].filter(Boolean).join(".");
}

export function getOverride(overrides: Overrides, prop: string, variant?: string, state?: string): string | undefined {
  return overrides[overrideKey(prop, variant, state)];
}

export function computeTokenValues(schema: Schema, overrides: Overrides = {}) {
  const component = schema.name;
  const channels = computeChannels(schema);
  const bridges = inferBridges(schema, channels);
  const l3: Record<string, string> = {};
  const l4: Record<string, string> = {};
  const l5: Record<string, string> = {};

  for (const b of bridges) l3[`--${component}-${b}`] = getOverride(overrides, b) ?? `var(--${b})`;
  for (const b of bridges) for (const v of schema.variants) l4[`--${component}-${b}-${v}`] = getOverride(overrides, b, v) ?? `var(--${component}-${b})`;

  for (const prop of schema.themeableProperties) {
    l3[`--${component}-${prop}`] = getOverride(overrides, prop) ?? `var(--${prop})`;
    for (const variant of schema.variants) {
      const l4Name = `--${component}-${prop}-${variant}`;
      const l4Value = getOverride(overrides, prop, variant) ?? variantRecipe(component, prop, variant);
      l4[l4Name] = l4Value;
      const l4Ref = `var(${l4Name})`;
      const channelStates = new Set(Object.entries(channels).filter(([, props]) => props.includes(prop)).map(([s]) => s));
      for (const state of schema.states) {
        const l5Name = `--${component}-${prop}-${variant}-${state}`;
        l5[l5Name] = getOverride(overrides, prop, variant, state) ?? (channelStates.has(state) ? stateRecipe(component, prop, variant, state, l4Ref) : l4Ref);
      }
    }
  }
  return { component, channels, bridges, l3, l4, l5 };
}
