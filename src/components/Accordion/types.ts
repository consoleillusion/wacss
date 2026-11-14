import type { Snippet } from "svelte";
import type { WacssPersistProps } from "../persist.svelte";

export type AccordionItem = {
  value: string;
  title: string;
  content?: string;
  disabled?: boolean;
};

export type AccordionProps = WacssPersistProps & {
  items?: AccordionItem[];
  type?: "single" | "multiple";
  value?: string | string[];
  disabled?: boolean;
  loop?: boolean;
  orientation?: "horizontal" | "vertical";
  class?: string;
  children?: Snippet<[{ item: AccordionItem; index: number }]>;
  [key: string]: unknown;
};
