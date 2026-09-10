import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

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
