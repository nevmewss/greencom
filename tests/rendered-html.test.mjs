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

  const notFoundResponse = await render("/missing-page");
  assert.equal(notFoundResponse.status, 404);
  const notFoundHtml = await notFoundResponse.text();
  assert.match(notFoundHtml, /not-found-page/);
  assert.match(notFoundHtml, /not-found-art\.png/);
});

test("keeps interactive controls and exact design assets in the source", async () => {
  const [page, shared, css] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/components/site.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(shared, /setMenuOpen/);
  assert.match(shared, /setOpenDropdown/);
  assert.match(page, /setHeroSlide/);
  assert.match(page, /from "swiper\/react"/);
  assert.match(page, /serviceSwiper\.current\?\.slidePrev/);
  assert.match(page, /serviceSwiper\.current\?\.slideNext/);
  assert.match(page, /serviceNavigation\.isBeginning/);
  assert.match(page, /serviceNavigation\.isEnd/);
  assert.match(shared, /submitContact/);
  assert.match(shared, /submitNewsletter/);
  assert.match(css, /white-space:\s*nowrap/);
  assert.match(css, /desktop-page-background\.png/);
  assert.match(css, /tablet-page-background\.png/);
  assert.match(css, /mobile-page-background\.png/);

  await Promise.all([
    access(new URL("../public/assets/desktop-page-background.png", import.meta.url)),
    access(new URL("../public/assets/tablet-page-background.png", import.meta.url)),
    access(new URL("../public/assets/mobile-page-background.png", import.meta.url)),
    access(new URL("../public/assets/hero-stat-arrow.svg", import.meta.url)),
  ]);
});
