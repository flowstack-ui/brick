import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const [card, consumer, iconButton, audit] = await Promise.all([
  readFile("playground/src/components/card/CardPage.tsx", "utf8"),
  readFile("apps/consumer/src/App.tsx", "utf8"),
  readFile("playground/src/components/icon-button/IconButtonPage.tsx", "utf8"),
  readFile("playground/docs/image-adoption-audit.md", "utf8"),
]);

assert.match(card, /<Image\.Root className="card-media-example"/);
assert.doesNotMatch(card, /className="card-media-example">\s*<img/);
assert.match(consumer, /@flowstack-ui\/brick\/image/);
assert.match(consumer, /<Image\.Content alt="Mobile checkout workspace preview"/);
assert.match(iconButton, /<img alt="" src=\{imageIconSource\}/);
assert.match(audit, /Avatar sources remain Avatar-owned/);
console.log("Verified scoped Image adoption and retained media ownership.");
