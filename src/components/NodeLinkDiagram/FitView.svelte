<script lang="ts">
  import { useSvelteFlow } from "@xyflow/svelte";

  let { version, enabled = true }: { version: number; enabled?: boolean } = $props();

  const { fitView } = useSvelteFlow();

  // Wait two frames: the first lets Svelte Flow measure the newly laid-out
  // nodes, the second fits the viewport once their sizes are known.
  $effect(() => {
    version;
    if (!enabled) return;
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        fitView({ padding: 0.12, duration: 350 });
      });
    });
    return () => cancelAnimationFrame(frame);
  });
</script>
