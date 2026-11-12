import type { Snippet } from "svelte";

export type LabelProps = {
  for?: string;
  text?: string;
  required?: boolean;
  class?: string;
  children?: Snippet;
  [key: string]: unknown;
};
