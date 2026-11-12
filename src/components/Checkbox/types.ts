import type { WacssPersistProps } from "../persist.svelte";

export type CheckboxProps = WacssPersistProps & {
  checked?: boolean;
  indeterminate?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  readonly?: boolean;
  name?: string;
  value?: string;
  id?: string;
  class?: string;
  [key: string]: unknown;
};
