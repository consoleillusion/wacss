/**
 * Shared accent plumbing for the accent-aware components (ColorInput, Select).
 *
 * The source of truth for the active accent is the document root:
 *  - preset themes are applied as `data-palette="<name>"` attributes, or
 *  - custom accents are applied as inline `--color-theme` / `--color-accent`.
 *
 * Cross-component sync uses a window event so accent-aware islands can observe
 * changes made by other islands without sharing module state.
 */

export const ACCENT_STORAGE_KEY = "wacss:accent";
export const ACCENT_COLOR_STORAGE_KEY = "wacss:accent-color";
export const ACCENT_CHANGE_EVENT = "wacss:accent-change";
export const ACCENT_THEME_NAMES = ["sakura", "matcha", "sumi", "aizome", "kurenai"];

export type AccentSource =
  | { source: "preset"; theme: string }
  | { source: "custom"; color: string }
  | { source: "none" };

export function readAccentState(): AccentSource {
  const el = document.documentElement;
  const attr = el.getAttribute("data-palette");
  if (attr && ACCENT_THEME_NAMES.includes(attr)) return { source: "preset", theme: attr };
  const inline = (el.style.getPropertyValue("--color-accent") || el.style.getPropertyValue("--color-theme") || "").trim();
  if (inline) return { source: "custom", color: inline };
  try {
    const stored = localStorage.getItem(ACCENT_STORAGE_KEY);
    if (stored && ACCENT_THEME_NAMES.includes(stored)) return { source: "preset", theme: stored };
    const storedColor = localStorage.getItem(ACCENT_COLOR_STORAGE_KEY);
    if (stored === "custom" && storedColor) return { source: "custom", color: storedColor };
  } catch {
    /* storage unavailable */
  }
  return { source: "none" };
}

export function applyAccentToRoot(theme?: string, color?: string): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  if (theme && ACCENT_THEME_NAMES.includes(theme)) {
    root.setAttribute("data-palette", theme);
    return;
  }
  root.removeAttribute("data-palette");
  const value = color ?? "";
  root.style.setProperty("--color-theme", value);
  root.style.setProperty("--color-accent", value);
}

export function emitAccentChange(state: AccentSource): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ACCENT_CHANGE_EVENT, { detail: state }));
}

export function subscribeAccentChange(handler: (state: AccentSource) => void): () => void {
  const listener = (e: Event) => handler((e as CustomEvent<AccentSource>).detail);
  window.addEventListener(ACCENT_CHANGE_EVENT, listener);
  return () => window.removeEventListener(ACCENT_CHANGE_EVENT, listener);
}

/** Hue (0-360) -> accent oklch color. Light mode uses higher lightness, dark mode lower. */
export function hueToAccent(hue: number, isDark: boolean): string {
  return `oklch(${isDark ? 60 : 70}% 0.13 ${hue})`;
}

/** Hex (#rrggbb) -> hue degrees (0-359). Returns null for non-hex values. */
export function hexToHue(hex: string): number | null {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex.trim());
  if (!m) return null;
  const n = parseInt(m[1], 16);
  const r = ((n >> 16) & 255) / 255;
  const g = ((n >> 8) & 255) / 255;
  const b = (n & 255) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return 150;
  let h = 0;
  if (max === r) h = ((g - b) / d) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  h = Math.round(h * 60);
  return h < 0 ? h + 360 : h;
}

/** oklch(L% C H) -> "#rrggbb". Returns null for unparseable values. */
export function oklchToHex(color: string): string | null {
  const m = /^oklch\(\s*([\d.]+)%?\s+([\d.]+)\s+([\d.]+)/i.exec(color.trim());
  if (!m) return null;
  const L = parseFloat(m[1]) / 100;
  const C = parseFloat(m[2]);
  const H = (parseFloat(m[3]) * Math.PI) / 180;
  const a = C * Math.cos(H);
  const b = C * Math.sin(H);
  const l = L + 0.3963377774 * a + 0.2158037573 * b;
  const m1 = L - 0.1055613458 * a - 0.0638541728 * b;
  const s = L - 0.0894841775 * a - 1.291485548 * b;
  const l3 = Math.pow(l, 3);
  const m3 = Math.pow(m1, 3);
  const s3 = Math.pow(s, 3);
  const r = 4.0767416621 * l3 - 3.3077115913 * m3 + 0.2309699292 * s3;
  const g = -1.2684380046 * l3 + 2.6097574011 * m3 - 0.3413193965 * s3;
  const bb = -0.0041960863 * l3 - 0.7034186147 * m3 + 1.707614701 * s3;
  const toByte = (c: number) => {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
  };
  const hex = (v: number) => Math.round(toByte(v)).toString(16).padStart(2, "0");
  return `#${hex(r)}${hex(g)}${hex(bb)}`;
}
