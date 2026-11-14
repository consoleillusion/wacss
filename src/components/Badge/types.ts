import type { Snippet } from "svelte";

export type BadgeVariant =
  | "default"
  | "secondary"
  | "destructive"
  | "outline"
  | "positive"
  | "neutral"
  | "negative";

export type BadgeProps = {
  variant?: BadgeVariant;
  as?: "span" | "div" | "a";
  href?: string;
  class?: string;
  children?: Snippet;
  [key: string]: unknown;
};
