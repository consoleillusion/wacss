import type { WacssPersistProps } from "../persist.svelte";

export type InputProps = WacssPersistProps & {
  value?: string;
  type?: string;
  placeholder?: string;
  label?: string;
  description?: string;
  error?: string;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  id?: string;
  name?: string;
  class?: string;
  inputClass?: string;
  [key: string]: unknown;
};
