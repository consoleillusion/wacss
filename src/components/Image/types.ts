export type ImageProps = {
  src: string;
  alt?: string;
  loading?: "eager" | "lazy";
  decoding?: "sync" | "async" | "auto";
  class?: string;
  [key: string]: unknown;
};
