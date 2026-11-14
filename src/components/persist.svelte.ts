import { onMount } from "svelte";

/** Shared persistence contract for value-like component state. */
export type WacssPersistProps = {
  /**
   * localStorage key. Defaults to `wacss:<component>`.
   * Set this when you have more than one instance of the same component.
   */
  storageKey?: string;
  /** Persist value-like state to localStorage. Defaults to `true`. */
  persist?: boolean;
};

type PersistConfig<T> = {
  /** Read the current value. */
  get: () => T;
  /** Write a value back to the reactive source. */
  set: (value: T) => void;
  /** localStorage key. */
  key: () => string;
  /** Whether persistence is enabled. Defaults to true. */
  enabled?: () => boolean;
  /** Defaults to JSON.stringify. */
  serialize?: (value: T) => string;
  /** Defaults to JSON.parse. */
  deserialize?: (raw: string) => T;
};

/**
 * Keeps a value-like prop reactive while using localStorage as the source of
 * truth after hydration.
 *
 * The server renders the passed/default value. On mount, the stored value (if
 * any) replaces it. After hydration, every change is written back.
 */
export function persistState<T>(config: PersistConfig<T>) {
  let hydrated = $state(false);

  onMount(() => {
    if (config.enabled?.() ?? true) {
      try {
        const raw = localStorage.getItem(config.key());
        if (raw !== null) {
          // Accept both JSON-encoded and raw string values.
          let parsed: T;
          try {
            parsed = config.deserialize ? config.deserialize(raw) : (JSON.parse(raw) as T);
          } catch {
            parsed = raw as unknown as T;
          }
          config.set(parsed);
        }
      } catch {
        // Ignore malformed or unavailable storage.
      }
    }
    hydrated = true;
  });

  $effect(() => {
    const value = config.get();
    if (!hydrated || !(config.enabled?.() ?? true)) return;
    if (value === undefined) return;

    try {
      const serialized =
        config.serialize != null
          ? config.serialize(value)
          : typeof value === "string"
            ? (value as unknown as string)
            : JSON.stringify(value);
      localStorage.setItem(config.key(), serialized);
    } catch {
      // Storage can be unavailable in private mode or when quota is exceeded.
    }
  });
}
