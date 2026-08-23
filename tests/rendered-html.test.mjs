import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the GreenCom home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<html lang="uk">/i);
  assert.match(html, /<title>GreenCom — автоматизація бізнесу<\/title>/i);
  assert.match(html, /Індивідуальні/);
  assert.match(html, /АВТОМАТИЗАЦІЇ/);
  assert.match(html, /id="services"/);
  assert.match(html, /id="about-detail"/);
  assert.match(html, /id="partners"/);
  assert.match(html, /id="news"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /id="newsletter"/);
  assert.match(html, /class="footer/);
  assert.doesNotMatch(html, /sites-skeleton|Your site is taking shape/);
});

test("server-renders the responsive About page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Технології, які створюють/);
  assert.match(html, /id="partners"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /class="about-results/);
  assert.match(html, /class="about-team/);
  assert.match(html, /class="about-history/);
});

test("server-renders the Contact page and custom 404", async () => {
  const contactResponse = await render("/contact");
  assert.equal(contactResponse.status, 200);
  const contactHtml = await contactResponse.text();
  assert.match(contactHtml, /class="contact-page/);
  assert.match(contactHtml, /class="contact-office/);
  assert.match(contactHtml, /class="contact-faq/);
  assert.match(contactHtml, /id="contact-form"/);
  assert.match(contactHtml, /class="footer section-bg section-bg--circuits "/);
  assert.doesNotMatch(contactHtml, /contact-page__footer/);

  const notFoundResponse = await render("/missing-page");
  assert.equal(notFoundResponse.status, 404);
  const notFoundHtml = await notFoundResponse.text();
  assert.match(notFoundHtml, /not-found-page/);
  assert.match(notFoundHtml, /not-found-art\.png/);
});

test("server-renders the responsive Price page", async () => {
  const response = await render("/price");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /class="price-page/);
  assert.match(html, /class="price-list/);
  assert.match(html, /Торгове обладнання/);
  assert.match(html, /217 000 ₴/);
});

test("server-renders the complete storefront flow", async () => {
  const expectations = [
    ["/catalog", /class="shop-product-grid"/],
    ["/product", /class="product-detail"/],
    ["/login", /class="auth-section"/],
    ["/cart", /class="cart-layout"/],
    ["/personal", /class="personal-panels"/],
    ["/orders", /class="orders-content"/],
  ];

  for (const [pathname, pattern] of expectations) {
    const response = await render(pathname);
    assert.equal(response.status, 200, `${pathname} did not render`);
    assert.match(await response.text(), pattern);
  }
});

test("keeps CMS rendering, interactive controls and exact design assets in the source", async () => {
  const [page, cmsPage, shared, css, compose, entrypoint] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/cms-page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../compose.yaml", import.meta.url), "utf8"),
    readFile(new URL("../backend/docker/entrypoint.sh", import.meta.url), "utf8"),
  ]);

  assert.match(shared, /setMenuOpen/);
  assert.match(shared, /setOpenDropdown/);
  assert.match(page, /<CmsPage slug="home"/);
  assert.match(cmsPage, /useCmsPage/);
  assert.match(cmsPage, /from "swiper\/react"/);
  assert.match(cmsPage, /swiperRef\.current\?\.slidePrev/);
  assert.match(cmsPage, /swiperRef\.current\?\.slideNext/);
  assert.match(cmsPage, /navigation\.isBeginning/);
  assert.match(cmsPage, /navigation\.isEnd/);
  assert.match(shared, /submitContact/);
  assert.match(shared, /submitNewsletter/);
  assert.match(css, /white-space:\s*nowrap/);
  assert.match(css, /desktop-page-background\.png/);
  assert.match(css, /tablet-page-background\.png/);
  assert.match(css, /mobile-page-background\.png/);
  assert.match(css, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(css, /\.partner:hover::before/);
  assert.match(css, /\.partner:hover::before\s*\{[^}]*background:\s*rgba\(3,\s*192,\s*48,\s*0\.08\)/s);
  assert.match(css, /\.services__grid \.service-card:hover[\s\S]*?transform:\s*translateY\(-4px\)/);
  assert.match(css, /\.services__grid\.swiper\s*\{[^}]*padding-top:\s*6px/s);
  assert.match(css, /\.stat-card--solutions:hover\s*\{[^}]*transform:\s*translateY\(-3px\)/s);
  assert.doesNotMatch(css, /\.contact-page\s*\{[^}]*height:\s*(?:4553|4672|4699)px/s);
  assert.match(cmsPage, /className="benefits__cards"/);
  assert.match(cmsPage, /featuredItem \? card\(featuredItem/);
  assert.match(css, /CMS flow safety/);
  assert.match(css, /\.cms-page \.benefit-card:nth-child\(n \+ 6\)[\s\S]*?position:\s*relative/);
  assert.match(css, /\.partner:nth-child\(n \+ 8\)[\s\S]*?position:\s*relative/);
  assert.match(css, /\.cms-page \.contact-form[\s\S]*?height:\s*auto/);
  assert.match(css, /\.cms-page \.about-history__timeline\s*\{[^}]*height:\s*auto/s);
  assert.match(css, /\.cms-page \.price-card > strong\s*\{[^}]*position:\s*static/s);
  assert.match(compose, /cms_postgres_data:\/var\/lib\/postgresql/);
  assert.match(compose, /cms_uploads:\/var\/www\/html\/storage\/app\/public/);
  assert.match(entrypoint, /CMS_SEED_DEFAULT_CONTENT:-false/);
  assert.doesNotMatch(entrypoint, /^php artisan db:seed --force$/m);

  await Promise.all([
    access(new URL("../public/assets/desktop-page-background.png", import.meta.url)),
    access(new URL("../public/assets/tablet-page-background.png", import.meta.url)),
    access(new URL("../public/assets/mobile-page-background.png", import.meta.url)),
    access(new URL("../public/assets/hero-stat-arrow.svg", import.meta.url)),
  ]);
});
