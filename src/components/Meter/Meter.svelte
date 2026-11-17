<script>
  let {
    children
    , value
    , min = 0
    , max = 100
    , low
    , high
    , optimum
    , class: className = ""
    , ...rest
  } = $props();
</script>

<meter class={className || undefined} {value} {min} {max} {low} {high} {optimum} {...rest}>
  {#if children}
    {@render children()}
  {/if}
</meter>
