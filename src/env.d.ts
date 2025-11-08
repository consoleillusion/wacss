/// <reference types="astro/client" />

// Vite asset URL imports (e.g. `import workerUrl from "pkg/worker.js?url"`).
declare module "*?url" {
  const url: string;
  export default url;
}
