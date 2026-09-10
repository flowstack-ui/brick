import { describe, expect, it } from "vitest";
import { defaultSettings, previewWidth, resolveSettings, settingsUrl, shareSettingsUrl, validateSettings } from "../../playground/src/settings/settings-model.js";
import { parsePreviewMessage, previewProtocol } from "../../playground/src/preview/preview-protocol.js";

describe("playground settings", () => {
  it("validates closed options without accepting arbitrary payloads", () => {
    expect(validateSettings({ appearance: "dark", theme: "evil", css: "body{}" })).toEqual({ appearance: "dark" });
    expect(validateSettings(null)).toEqual({});
  });
  it("gives explicit URL values precedence over saved values", () => {
    expect(resolveSettings(new URL("https://example.test/button?appearance=light"), { appearance: "dark", exampleDirection: "rtl" }))
      .toEqual({ ...defaultSettings, appearance: "light", exampleDirection: "rtl", theme: "brick" });
  });
  it("ignores preferences in test mode and invalid explicit values", () => {
    expect(resolveSettings(new URL("https://example.test/?testMode=1"), { appearance: "dark" })).toEqual(defaultSettings);
    expect(resolveSettings(new URL("https://example.test/?appearance=invalid"), { appearance: "dark" }).appearance).toBe("system");
  });
  it("round trips complete configurations while retaining route context", () => {
    const url = settingsUrl(new URL("https://example.test/button?custom=keep#example"), defaultSettings);
    expect(resolveSettings(url, { appearance: "dark", theme: "qualification" })).toEqual(defaultSettings);
    expect(url.searchParams.get("custom")).toBe("keep");
    expect(url.hash).toBe("#example");
  });
  it("rejects unrecognized preview protocols, IDs and incomplete environments", () => {
    expect(parsePreviewMessage({ protocol: previewProtocol, id: "other", type: "ready" }, "target")).toBeNull();
    expect(parsePreviewMessage({ protocol: "old", id: "target", type: "ready" }, "target")).toBeNull();
    expect(parsePreviewMessage({ protocol: previewProtocol, id: "target", type: "settings", settings: { appearance: "dark" } }, "target")).toBeNull();
    expect(parsePreviewMessage({ protocol: previewProtocol, id: "target", type: "settings", settings: defaultSettings }, "target")?.type).toBe("settings");
  });
  it("shares allowlisted configuration without arbitrary query data", () => {
    const url = shareSettingsUrl(new URL("https://example.test/tabs?secret=private&isolated=1&previewExample=tabs.overview&previewWidth=768#scenario-tabs-overview"), defaultSettings);
    expect(url.searchParams.has("secret")).toBe(false);
    expect(url.searchParams.get("previewWidth")).toBe("768");
    expect(url.hash).toBe("#scenario-tabs-overview");
    expect(previewWidth("99999")).toBe("fit");
    expect(previewWidth("-10")).toBe("fit");
  });
});
