import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";

export default defineConfig({
  outDir: "./demo-dist",
  integrations: [
    svelte({
      // Allow vite-plugin-svelte to process .svelte files from bits-ui, @svar-ui and
      // @xyflow packages in node_modules, but skip Astro's virtual astro-entry modules
      // (they are JS re-exports, not Svelte source)
      exclude: [/astro-entry:/, /\?astro/, /node_modules\/(?!(bits-ui|@svar-ui|@xyflow))/],
    }),
  ],
  vite: {
    // Don't let esbuild pre-bundle the Svelte packages we import as sources;
    // vite-plugin-svelte must compile them instead (bits-ui, @svar-ui).
    optimizeDeps: {
      exclude: ["bits-ui", "@svar-ui/svelte-grid", "@xyflow/svelte"],
    },
  },
});
