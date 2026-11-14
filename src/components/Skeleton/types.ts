export type SkeletonProps = {
  /** Number of bar lines to render (ignored when `circle` is set). */
  lines?: number;
  /** Render an avatar-sized circle instead of bars. */
  circle?: boolean;
  class?: string;
  [key: string]: unknown;
};
