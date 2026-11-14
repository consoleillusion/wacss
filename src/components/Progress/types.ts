export type ProgressProps = {
  value?: number | null;
  max?: number;
  label?: string;
  showValue?: boolean;
  class?: string;
  [key: string]: unknown;
};
