import type { Snippet } from "svelte";

export type DialogProps = {
  open?: boolean;
  title?: string;
  description?: string;
  triggerLabel?: string;
  closeLabel?: string;
  class?: string;
  children?: Snippet;
  footer?: Snippet;
  trigger?: Snippet;
  [key: string]: unknown;
};
