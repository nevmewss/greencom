import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

const githubPagesBase = "/greencom/";
const githubPagesRoot = resolve(process.cwd(), "github-pages");

export default defineConfig({
  base: githubPagesBase,
  root: githubPagesRoot,
  publicDir: resolve(process.cwd(), "public"),
  plugins: [
    {
      name: "github-pages-public-paths",
      enforce: "pre",
      transform(code, id) {
        const normalizedId = id.replaceAll("\\", "/");

        if (!/\/app\/(?:about\/)?page\.tsx$/.test(normalizedId)) {
          return null;
        }

        return code.replace(
          /(["'`])\/(?=(?:assets|icons|fonts)\/|(?:developer-tech|retail-tech)\.jpg)/g,
          `$1${githubPagesBase}`,
        );
      },
    },
    react(),
  ],
  build: {
    outDir: resolve(process.cwd(), "dist-github"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(githubPagesRoot, "index.html"),
        about: resolve(githubPagesRoot, "about/index.html"),
      },
    },
  },
  preview: {
    host: "127.0.0.1",
    port: 4173,
  },
});
