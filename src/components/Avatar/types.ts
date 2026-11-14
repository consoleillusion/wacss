export type AvatarProps = {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: "sm" | "md" | "lg";
  class?: string;
  [key: string]: unknown;
};
