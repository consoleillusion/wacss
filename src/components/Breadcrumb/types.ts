export type BreadcrumbItem = {
  /** The display text for this crumb. */
  label: string;
  /** Optional href. Items without one render as plain text. */
  href?: string;
};

export type BreadcrumbProps = {
  items?: BreadcrumbItem[];
  class?: string;
  [key: string]: unknown;
};
