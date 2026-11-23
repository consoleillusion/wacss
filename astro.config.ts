import { defineConfig } from "astro/config"
import svelte from "@astrojs/svelte"

export default defineConfig({
  outDir: "./demo-dist",
  redirects: { "/": "/components" },
  integrations: [svelte()],
  vite: {
    // bits-ui and xyflow ship Svelte sources; let vite-plugin-svelte compile them.
    optimizeDeps: { exclude: ["bits-ui", "@xyflow/svelte"] },
  },
})
