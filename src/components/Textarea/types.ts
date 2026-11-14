import type { WacssPersistProps } from "../persist.svelte";

export type TextareaProps = WacssPersistProps & {
  value?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  rows?: number;
  id?: string;
  name?: string;
  class?: string;
  inputClass?: string;
  [key: string]: unknown;
};
