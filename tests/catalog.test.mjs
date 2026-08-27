import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import vm from "node:vm";
import ts from "typescript";

const source = await readFile(new URL("../app/components/shop.tsx", import.meta.url), "utf8");
const stylesheet = await readFile(new URL("../app/shop.css", import.meta.url), "utf8");
const ast = ts.createSourceFile("shop.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const flightFunction = ast.statements.find((node) => ts.isFunctionDeclaration(node) && node.name?.text === "animateProductToCart");
assert.ok(flightFunction, "Cart flight implementation is missing");
const flightScript = ts.transpileModule(flightFunction.getText(ast), {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;

// Exercise the animation lifecycle without a browser or a live cart.
function flightHarness({ width = 261, height = 229, reducedMotion = false, hasTarget = true } = {}) {
  const flights = [];
  const cartAnimations = [];
  const target = {
    getBoundingClientRect: () => ({ left: 1200, top: 50, width: 24, height: 24, bottom: 74 }),
    animate: (frames) => { cartAnimations.push(frames); },
  };
  const sourceImage = { getBoundingClientRect: () => ({ left: 400, top: 300, width, height }) };
  const trigger = { closest: () => ({ querySelector: () => sourceImage }) };
  const document = {
    querySelector: () => hasTarget ? target : null,
    body: { appendChild: (element) => flights.push(element) },
    createElement: () => ({
      style: {}, attributes: {}, listeners: {}, children: [], removed: false,
      setAttribute(key, value) { this.attributes[key] = value; },
      appendChild(element) { this.children.push(element); },
      remove() { this.removed = true; },
      animate(frames, options) {
        this.frames = frames;
        this.options = options;
        return { addEventListener: (name, handler) => { this.listeners[name] = handler; } };
      },
    }),
  };
  const animate = vm.runInNewContext(`${flightScript}; animateProductToCart;`, {
    document,
    window: { innerHeight: 900, innerWidth: 1440, matchMedia: () => ({ matches: reducedMotion }) },
  });
  animate(trigger, { image: "/retail-tech.jpg" });
  return { flights, cartAnimations };
}

test("cart flight starts at 90% of the source image and preserves its proportions", () => {
  for (const [width, height] of [[261, 229], [170, 229], [520, 424]]) {
    const { flights } = flightHarness({ width, height });
    assert.equal(flights.length, 1);
    const flight = flights[0];
    assert.equal(parseFloat(flight.style.width), width * .9);
    assert.equal(parseFloat(flight.style.height), height * .9);
    assert.equal(parseFloat(flight.style.left), 400 + width * .05);
    assert.equal(parseFloat(flight.style.top), 300 + height * .05);
    assert.equal(flight.attributes["aria-hidden"], "true");
    const scales = flight.frames.map((frame) => Number(frame.transform.match(/scale\(([\d.]+)\)/)[1]));
    assert.equal(scales[0], 1);
    assert.ok(scales[0] > scales[1] && scales[1] > scales[2]);
    assert.ok(Math.abs(Math.max(width, height) * .9 * scales[2] - 18) < .001);
  }
});

test("cart flight cleans up after completion or cancellation", () => {
  const completed = flightHarness();
  completed.flights[0].listeners.finish();
  assert.equal(completed.flights[0].removed, true);
  assert.equal(completed.cartAnimations.length, 1);
  const cancelled = flightHarness();
  cancelled.flights[0].listeners.cancel();
  assert.equal(cancelled.flights[0].removed, true);
  assert.equal(cancelled.cartAnimations.length, 0);
});

test("cart flight respects reduced motion and skips unavailable geometry", () => {
  assert.equal(flightHarness({ reducedMotion: true }).flights.length, 0);
  assert.equal(flightHarness({ hasTarget: false }).flights.length, 0);
  assert.equal(flightHarness({ width: 0 }).flights.length, 0);
});

test("catalog panels size to content, limit overflow and share translucent glass", () => {
  const panels = stylesheet.match(/\.shop-catalog__side > nav,\.shop-catalog__side > \.shop-filter\s*\{([^}]+)\}/)[1];
  assert.match(panels, /height:\s*auto/);
  assert.match(panels, /overflow-y:\s*auto/);
  assert.match(panels, /rgba\(59,70,83,\.4\)/);
  assert.match(panels, /backdrop-filter:\s*blur\(11px\)/);
  assert.match(stylesheet, /\.shop-catalog__side nav\s*\{[^}]*max-height:\s*min\(618px,75svh\)/);
  assert.match(stylesheet, /\.shop-filter\s*\{[^}]*max-height:\s*min\(526px,75svh\)/);
  assert.doesNotMatch(stylesheet, /\.shop-catalog__side nav\s*\{[^}]*min-height:\s*[1-9]/);
  assert.doesNotMatch(stylesheet, /\.shop-filter\s*\{[^}]*[;\s]height:\s*\d+px/);
  assert.doesNotMatch(stylesheet, /\.shop-filter details:nth-of-type\(2\)\[open\]/);
});

test("catalog reuses button hover and anchors the price row above bottom padding", () => {
  assert.match(source, /<Button outline className="button--small" href="#catalog-grid" onClick=/);
  assert.match(stylesheet, /\.shop-product-card\s*\{[^}]*height:\s*auto;[^}]*display:\s*flex;[^}]*flex-direction:\s*column/);
  assert.match(stylesheet, /\.shop-product-card__price\s*\{[^}]*margin-top:\s*auto/);
  assert.match(stylesheet, /\.shop-product-card__price button\s*\{[^}]*linear-gradient\(90deg,#03c030,#015a17\)/);
  assert.match(stylesheet, /\.shop-favorite__icon\s*\{[^}]*width:\s*18px;[^}]*shop-heart\.svg/);
});
