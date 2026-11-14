import type { WacssPersistProps } from "../persist.svelte";

export type SelectOption = {
  value: string;
  label: string;
  disabled?: boolean;
};

export type SelectProps = WacssPersistProps & {
  options?: SelectOption[];
  type?: "single" | "multiple";
  value?: string | string[];
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  id?: string;
  class?: string;
  contentClass?: string;
  /** Extra attributes for the trigger button (id, aria-*, data-*). */
  triggerProps?: Record<string, string | number | boolean | undefined>;
  [key: string]: unknown;
};
