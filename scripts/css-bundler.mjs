import { canonicalCssSourceMap } from "./css-source-map.mjs";

// This module is used only by dedicated Node build/test processes. Lightning
// CSS 1.32 can associate mappings with the wrong source under parallel import
// loading (also reported upstream as parcel-bundler/lightningcss#1167).
// Configure its native pool before loading the binding. Do not remove this
// bound without passing the repeated original-location regression.
process.env.RAYON_NUM_THREADS = "1";
const lightning = await import("lightningcss");

export const browserslistToTargets = lightning.browserslistToTargets;

export async function bundleCss(options) {
  const result = await lightning.bundleAsync(options);
  if (!result.map) return result;
  return { ...result, map: Buffer.from(JSON.stringify(canonicalCssSourceMap(result.map.toString()))) };
}
