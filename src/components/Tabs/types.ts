import type { Snippet } from "svelte";
import type { WacssPersistProps } from "../persist.svelte";

export type TabsItem = {
  value: string;
  label: string;
  content?: string;
  disabled?: boolean;
};

export type TabsProps = WacssPersistProps & {
  tabs?: TabsItem[];
  value?: string;
  orientation?: "horizontal" | "vertical";
  activationMode?: "manual" | "automatic";
  loop?: boolean;
  disabled?: boolean;
  class?: string;
  listClass?: string;
  contentClass?: string;
  children?: Snippet<[{ tab: TabsItem; index: number }]>;
  [key: string]: unknown;
};
