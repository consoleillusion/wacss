import type { WacssPersistProps } from "../persist.svelte";

export type SwitchProps = WacssPersistProps & {
  checked?: boolean;
  label?: string;
  description?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
  value?: string;
  id?: string;
  class?: string;
  [key: string]: unknown;
};
