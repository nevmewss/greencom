import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

test("builds a GitHub Pages artifact under the repository base path", async () => {
  const html = await readFile("dist-github/index.html", "utf8");
  const aboutHtml = await readFile("dist-github/about/index.html", "utf8");
  const contactHtml = await readFile("dist-github/contact/index.html", "utf8");
  const catalogHtml = await readFile("dist-github/catalog/index.html", "utf8");
  const productHtml = await readFile("dist-github/product/index.html", "utf8");
  const cartHtml = await readFile("dist-github/cart/index.html", "utf8");
  const wishlistHtml = await readFile("dist-github/wishlist/index.html", "utf8");
  const notFoundHtml = await readFile("dist-github/404.html", "utf8");
  const assetFiles = await readdir("dist-github/assets");
  const javascriptFiles = assetFiles.filter((file) => /\.js$/.test(file));
  const stylesheetFiles = assetFiles.filter((file) => /\.css$/.test(file));

  assert.ok(javascriptFiles.length > 0, "GitHub Pages JavaScript bundle is missing");
  assert.ok(stylesheetFiles.length > 0, "GitHub Pages stylesheet is missing");

  const javascript = (
    await Promise.all(javascriptFiles.map((file) => readFile(`dist-github/assets/${file}`, "utf8")))
  ).join("\n");
  const stylesheet = (
    await Promise.all(stylesheetFiles.map((file) => readFile(`dist-github/assets/${file}`, "utf8")))
  ).join("\n");

  assert.match(html, /\/greencom\/assets\/.*\.js/);
  assert.match(html, /\/greencom\/assets\/.*\.css/);
  assert.match(aboutHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(aboutHtml, /\/greencom\/assets\/.*\.css/);
  assert.match(contactHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(contactHtml, /\/greencom\/assets\/.*\.css/);
  assert.match(catalogHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(productHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(cartHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(wishlistHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(notFoundHtml, /\/greencom\/assets\/.*\.js/);
  assert.match(notFoundHtml, /\/greencom\/assets\/.*\.css/);
  assert.doesNotMatch(javascript, /[`"']\/(?:assets|icons|site-icons)\//);
  assert.match(javascript, /\/greencom\/assets\//);
  assert.match(javascript, /\/greencom\/site-icons\//);
  assert.match(stylesheet, /url\(\/greencom\/assets\//);
  assert.match(stylesheet, /url\(\/greencom\/fonts\//);
});
