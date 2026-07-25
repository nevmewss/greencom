import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const githubPagesBase = "/greencom/";

export default defineConfig({
  base: githubPagesBase,
  root: "github-pages",
  publicDir: "../public",
  plugins: [
    {
      name: "github-pages-public-paths",
      enforce: "pre",
      transform(code, id) {
        const normalizedId = id.replaceAll("\\", "/");

        if (!normalizedId.endsWith("/app/page.tsx")) {
          return null;
        }

        return code.replace(
          /(["'`])\/(?=(?:assets|icons)\/|(?:developer-tech|retail-tech)\.jpg)/g,
          `$1${githubPagesBase}`,
        );
      },
    },
    react(),
  ],
  build: {
    outDir: "../dist-github",
    emptyOutDir: true,
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
