import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  outDir: "./demo-dist",
      plugins: [tailwindcss()],

  integrations: [
    svelte({
      // Allow vite-plugin-svelte to process .svelte files from bits-ui in node_modules,
      // but skip Astro's virtual astro-entry modules (they are JS re-exports, not Svelte source)
      exclude: [/astro-entry:/, /\?astro/, /node_modules\/(?!bits-ui)/],
    }),
  ],
  vite: {
    // Don't let esbuild pre-bundle bits-ui (it hits .svelte imports esbuild can't load)
    optimizeDeps: {
      exclude: ["bits-ui"],
    },
  },
});
