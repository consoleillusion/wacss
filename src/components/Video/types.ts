export type VideoProps = {
  src?: string;
  sources?: { src: string; type?: string }[];
  poster?: string;
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
  muted?: boolean;
  playsinline?: boolean;
  preload?: "none" | "metadata" | "auto";
  class?: string;
  [key: string]: unknown;
};
