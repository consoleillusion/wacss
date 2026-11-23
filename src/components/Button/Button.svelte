<script lang="ts">
  // Button: the bits-ui Button, driven by data. Styled by the generated `button` element rules.
  import { Button } from "bits-ui";
  import type { Snippet } from "svelte";

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
    children?: Snippet;
    [key: string]: unknown;
  } = $props();

  // The default variant has no class.
  const classNames = $derived([variant === "secondary" ? "" : variant, className].filter(Boolean).join(" ") || undefined);
</script>

<Button.Root
  {...restProps}
  {href}
  type={href ? undefined : type}
  disabled={disabled || loading}
  class={classNames}
  aria-busy={loading || undefined}
>
  {#if children}{@render children()}{:else}{label}{/if}
</Button.Root>
