<script lang="ts">
  // A level heading above its columns in the token graph.
  let { data }: { data: { label: string } } = $props();
</script>

<strong class="demo-level">{data.label}</strong>
