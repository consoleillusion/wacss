<script lang="ts">
  import { Button } from "bits-ui";

  let {
    variant = "secondary",
    type = "button",
    href,
    disabled = false,
    loading = false,
    label,
    class: className = "",
    children,
    ...restProps
  }: {
    variant?: "secondary" | "primary" | "tertiary" | "danger";
    type?: "button" | "submit" | "reset";
    href?: string;
    disabled?: boolean;
    loading?: boolean;
    label?: string;
    class?: string;
    children?: any;
    [k: string]: any;
  } = $props();

  const variantClass = $derived(variant === "secondary" ? "" : variant);
  const classNames = $derived([variantClass, className].filter(Boolean).join(" ") || undefined);
  const isDisabled = $derived(disabled || loading);
</script>

<Button.Root
  {...restProps}
  {href}
  type={href ? undefined : type}
  disabled={isDisabled}
  class={classNames}
  aria-busy={loading || undefined}
>
  {#if loading}<span aria-hidden="true" data-spinner></span>{/if}
  {#if children}{@render children()}{:else if label}{label}{/if}
</Button.Root>
