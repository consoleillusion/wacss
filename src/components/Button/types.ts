import type { Snippet } from "svelte";

export type ButtonVariant =
  | "default"
  | "primary"
  | "secondary"
  | "destructive"
  | "link";

export type ButtonSize = "sm" | "md" | "lg" | "icon";

export type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  loading?: boolean;
  disabled?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset";
  class?: string;
  children?: Snippet;
  [key: string]: unknown;
};
