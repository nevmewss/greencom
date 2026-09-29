import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { resolve } from "node:path";

const hostingRoot = resolve(process.cwd(), "github-pages");
const cmsUrl = process.env.NEXT_PUBLIC_CMS_URL ?? "https://cms.greencom.ua";

export default defineConfig({
  base: "/",
  root: hostingRoot,
  publicDir: resolve(process.cwd(), "public"),
  define: {
    "process.env.NEXT_PUBLIC_CMS_URL": JSON.stringify(cmsUrl),
  },
  plugins: [react()],
  build: {
    outDir: resolve(process.cwd(), "dist-hosting"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: resolve(hostingRoot, "index.html"),
        about: resolve(hostingRoot, "about/index.html"),
        contact: resolve(hostingRoot, "contact/index.html"),
        price: resolve(hostingRoot, "price/index.html"),
        catalog: resolve(hostingRoot, "catalog/index.html"),
        product: resolve(hostingRoot, "product/index.html"),
        login: resolve(hostingRoot, "login/index.html"),
        cart: resolve(hostingRoot, "cart/index.html"),
        personal: resolve(hostingRoot, "personal/index.html"),
        orders: resolve(hostingRoot, "orders/index.html"),
        wishlist: resolve(hostingRoot, "wishlist/index.html"),
        news: resolve(hostingRoot, "news/index.html"),
        article: resolve(hostingRoot, "article/index.html"),
        faq: resolve(hostingRoot, "faq/index.html"),
        partners: resolve(hostingRoot, "partners/index.html"),
        cases: resolve(hostingRoot, "cases/index.html"),
        caseStudy: resolve(hostingRoot, "case/index.html"),
        vacancies: resolve(hostingRoot, "vacancies/index.html"),
        vacancy: resolve(hostingRoot, "vacancy/index.html"),
        signup: resolve(hostingRoot, "signup/index.html"),
        notFound: resolve(hostingRoot, "404/index.html"),
        errorDocument: resolve(hostingRoot, "404.html"),
      },
    },
  },
});
