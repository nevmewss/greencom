import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { test } from "node:test";

test("builds a GitHub Pages artifact under the repository base path", async () => {
  const html = await readFile("dist-github/index.html", "utf8");
  const assetFiles = await readdir("dist-github/assets");
  const javascriptFile = assetFiles.find((file) => /^index-.*\.js$/.test(file));
  const stylesheetFile = assetFiles.find((file) => /^index-.*\.css$/.test(file));

  assert.ok(javascriptFile, "GitHub Pages JavaScript bundle is missing");
  assert.ok(stylesheetFile, "GitHub Pages stylesheet is missing");

  const javascript = await readFile(`dist-github/assets/${javascriptFile}`, "utf8");
  const stylesheet = await readFile(`dist-github/assets/${stylesheetFile}`, "utf8");

  assert.match(html, /\/greencom\/assets\/index-.*\.js/);
  assert.match(html, /\/greencom\/assets\/index-.*\.css/);
  assert.doesNotMatch(javascript, /[`"']\/(?:assets|icons)\//);
  assert.match(javascript, /\/greencom\/assets\//);
  assert.match(javascript, /\/greencom\/icons\//);
  assert.match(stylesheet, /url\(\/greencom\/assets\//);
  assert.match(stylesheet, /url\(\/greencom\/fonts\//);
});
