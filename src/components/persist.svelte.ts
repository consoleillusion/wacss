import { onMount } from "svelte";

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
          config.set(
            config.deserialize ? config.deserialize(raw) : (JSON.parse(raw) as T),
          );
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
      localStorage.setItem(
        config.key(),
        config.serialize ? config.serialize(value) : JSON.stringify(value),
      );
    } catch {
      // Storage can be unavailable in private mode or when quota is exceeded.
    }
  });
}
