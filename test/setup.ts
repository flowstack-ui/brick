import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

// JSDOM has no native top layer. NWSAPI 2.2.27 delegates these states back
// into Element.matches, recursively, until stack exhaustion. Floating UI
// queries :modal during positioning, turning a click into seconds of work.
// Model the absent capability here; real-browser suites cover top-layer state.
const matches = Element.prototype.matches;
Element.prototype.matches = function (selector: string) {
  if (selector === ":modal" || selector === ":fullscreen" || selector === ":popover-open") return false;
  return matches.call(this, selector);
};

Object.defineProperty(window, "scrollTo", {
  configurable: true,
  value: () => undefined,
  writable: true,
});

// JSDOM has no layout/scroll implementation. Unit tests can assert requests;
// the browser suites qualify actual scroll reveal and clipping geometry.
Object.defineProperty(HTMLElement.prototype, "scrollIntoView", {
  configurable: true,
  value: vi.fn(),
  writable: true,
});

afterEach(cleanup);
