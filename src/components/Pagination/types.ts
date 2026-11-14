export type PaginationProps = {
  /** Total number of items to paginate. */
  total: number;
  /** Items per page. */
  perPage?: number;
  /** Current page, 1-based. */
  page?: number;
  /** Pages shown before and after the current page. */
  siblingCount?: number;
  /** Loop from last page back to first and vice versa. */
  loop?: boolean;
  class?: string;
  [key: string]: unknown;
};
