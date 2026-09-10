import { describe,it,expect } from "vitest";
import { createOverlay } from "../../../src/overlay-manager.js";
import { createOverlay as atomCreateOverlay } from "@flowstack-ui/atom/overlay-manager";
describe("OverlayManager",()=>{
  it("reuses the exact Atom utility without a competing store",()=>{expect(createOverlay).toBe(atomCreateOverlay);});
});
