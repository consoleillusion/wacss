import type { Snippet } from "svelte";

export type AlertVariant = "info" | "positive" | "warning" | "destructive";

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  children?: Snippet;
  class?: string;
  [key: string]: unknown;
};
