export type AudioProps = {
  src?: string;
  sources?: { src: string; type?: string }[];
  caption?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  preload?: "none" | "metadata" | "auto";
  class?: string;
  [key: string]: unknown;
};
