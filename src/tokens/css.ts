/**
 * Component CSS emitter. The only values written here are L5 tokens of the
 * component being emitted and structural literals declared in its schema.
 * See wacss-docs/css-output.md.
 */
import { stateOrder, type ComponentTokens } from "./generate";
import type { State } from "./types";

const STATE_SELECTORS: Record<State, string | undefined> =
{ static: undefined
, hover: ":hover"
, highlighted: "[data-highlighted]"
, focus: ":focus-visible"
, active: ":active"
, checked: ':checked, [aria-checked="true"], [data-state="checked"]'
, unchecked: '[aria-checked="false"], [data-state="unchecked"]'
, selected: '[aria-selected="true"], [data-selected]'
, current: '[aria-current]:not([aria-current="false"])'
, pressed: '[aria-pressed="true"]'
, open: '[open], [aria-expanded="true"], [data-state="open"]'
, invalid: ':user-invalid, [aria-invalid="true"], [data-invalid]'
, loading: '[aria-busy="true"]'
, disabled: ':disabled, [aria-disabled="true"], [data-disabled]'
};

/** Third-party widget properties (--wx-*, --xy-*) are set as custom properties. */
const declarationName = (property: string) =>
  property.startsWith("--") ? property : /^(wx|xy)-/.test(property) ? `--${property}` : property;
const line = (property: string, value: string) => `  ${declarationName(property)}: ${value};`;

const baseSelector = (name: string, element?: string) => element ? `:where(${element})` : `.${name}`;
const variantSelector = (name: string, variant: string, element?: string) =>
  element ? `:where(${element}.${variant})` : `.${name}.${variant}`;
const stateSelector = (selector: string, state: State) => {
  const s = STATE_SELECTORS[state];
  return s ? `${selector}:where(${s})` : selector;
};

/** states.md §6.5: static, then the channel table reversed (interactions before conditions). */
const emitOrder = (states: readonly State[]): State[] =>
  ["static", ...stateOrder({ name: "", cssProperties: [], variants: ["secondary"], states } as never).slice(1).reverse()];

const assertLiterals = (literals: Record<string, string> | undefined, source: string) => {
  for (const [property, value] of Object.entries(literals ?? {}))
    if (value.includes("var(")) throw new Error(`${source}: structural property ${property} contains var()`);
};

const literalsBlock = (literals: Record<string, string> | undefined) =>
  Object.entries(literals ?? {}).map(([p, v]) => line(p, v));

/** Emit one selector block: structural literals + L5 token references only. */
const block = (selector: string, source: string, opts: {
  structure?: Record<string, string>;
  properties: readonly string[];
  propertyTokenNames: Readonly<Record<string, string>>;
  variant: string;
  state: State;
  channels?: readonly string[];
}) => {
  assertLiterals(opts.structure, source);
  const props = opts.channels ?? opts.properties;
  const decls = [
    ...literalsBlock(opts.structure),
    ...props.map((p) => line(p, `var(--${opts.propertyTokenNames[p]}-${opts.variant}-${opts.state})`)),
  ];
  if (!decls.length) return "";
  return [`${selector} {`, ...decls, "}", ""].join("\n");
};

export interface GeneratedCSS { elements: string; components: string; }

export const emitComponentCSS = (all: readonly ComponentTokens[]): GeneratedCSS => {
  const elements: string[] = [];
  const components: string[] = [];
  for (const c of all) {
    const { meta, channels, name } = c;
    const out = meta.element ? elements : components;
    const source = `src/components/${name}`;
    const slug = (property: string) => property.replace(/^--/, "");
    const tokenNames: Record<string, string> = {};
    for (const p of meta.cssProperties) tokenNames[p] = `${name}-${slug(p)}`;
    for (const [pseudo, props] of Object.entries(meta.pseudoElements ?? {}))
      for (const p of props) tokenNames[p] = `${name}-${pseudo.slice(2)}-${slug(p)}`;

    const emitSelector = (selector: string, structure: Record<string, string> | undefined,
                          pseudo?: string) => {
      const props = pseudo ? (meta.pseudoElements?.[pseudo] ?? []) : meta.cssProperties;
      const names = pseudo ? Object.fromEntries(props.map((p) => [p, tokenNames[p]!])) : tokenNames;
      const suffix = pseudo ?? "";
      const base = `${selector}${suffix}`;
      out.push(block(base, source, { structure, properties: props, propertyTokenNames: names, variant: "secondary", state: "static" }));
      for (const state of emitOrder(meta.states).slice(1)) {
        const s = stateSelector(base, state);
        out.push(block(s, source, {
          structure: pseudo ? meta.pseudoStructure?.[pseudo]?.[state] : meta.structure?.[state],
          properties: props, propertyTokenNames: names, variant: "secondary", state,
          channels: channels[state]?.filter((p) => props.includes(p)),
        }));
      }
      for (const variant of meta.variants.filter((v) => v !== "secondary")) {
        const vSelector = pseudo
          ? `${variantSelector(name, variant, meta.element)}${suffix}`
          : variantSelector(name, variant, meta.element);
        out.push(block(vSelector, source, {
          structure: pseudo ? meta.pseudoStructure?.[pseudo]?.static : structure,
          properties: props, propertyTokenNames: names, variant, state: "static",
        }));
        for (const state of emitOrder(meta.states).slice(1)) {
          const s = stateSelector(vSelector, state);
          out.push(block(s, source, {
            structure: pseudo ? meta.pseudoStructure?.[pseudo]?.[state] : meta.structure?.[state],
            properties: props, propertyTokenNames: names, variant, state,
            channels: channels[state]?.filter((p) => props.includes(p)),
          }));
        }
      }
    };

    out.push(`/* ${name} */`);
    emitSelector(baseSelector(name, meta.element), meta.structure?.static, undefined);
    for (const pseudo of Object.keys(meta.pseudoElements ?? {}))
      emitSelector(baseSelector(name, meta.element), meta.pseudoStructure?.[pseudo]?.static, pseudo);
  }
  const verify = (css: string, layer: string) => {
    for (const m of css.matchAll(/var\(\s*(--[\w-]+)/g)) {
      const ref = m[1]!.slice(2);
      if (!all.some((c) => ref.startsWith(`${c.name}-`)))
        throw new Error(`generated ${layer} CSS references a token outside its component: ${m[1]}`);
    }
  };
  verify(elements.join("\n"), "element");
  verify(components.join("\n"), "component");
  return { elements: elements.join("\n"), components: components.join("\n") };
};

export const stateSelectors = STATE_SELECTORS;
