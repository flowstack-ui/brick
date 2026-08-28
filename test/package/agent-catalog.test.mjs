import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  assertCompleteAgentCoverage,
  createAgentCoverage,
  validateAgentSourceOwnership,
} from "../../scripts/agent-catalog.mjs";

test("Agent Knowledge catalog reconciles every public Brick surface", async () => {
  const report = await createAgentCoverage();

  assert.equal(report.schema, "flowstack.agent-coverage.v1");
  assert.equal(report.package, "@flowstack-ui/brick");
  assert.equal(report.layer, "brick");
  assert.equal(report.summary.componentOwners, 87);
  assert.equal(report.summary.packageGuides, 2);
  assert.equal(report.summary.unclassified, 0);
  assert.equal(report.summary.invalidExclusions, 0);
  assert.equal(report.summary.unresolvedSelections, 0);
  assert.equal(
    report.summary.classifiedPublicSurfaces,
    report.summary.publicSurfaces,
  );

  const notificationBadge = report.components.find(
    ({ id }) => id === "notification-badge",
  );
  assert.deepEqual(notificationBadge.publicSubpaths, ["./badge"]);
  assert.ok(notificationBadge.publicSymbols.includes("NotificationBadge"));
  assert.ok(notificationBadge.publicValueSymbols.includes("NotificationBadge"));
  assert.deepEqual(notificationBadge.manifestPaths, {
    json: "./notification-badge.json",
    markdown: "./notification-badge.md",
  });
  assert.deepEqual(notificationBadge.agentSources, {
    json: "src/components/badge/notification-badge/agent.json",
    markdown: "src/components/badge/notification-badge/agent.md",
  });

  assert.equal(report.exclusions.length, 5);
  assert.equal(report.nativeApplicationDestinations.length, 1);
  assert.equal(
    report.surfaces.find(({ surface }) => surface === ".").classification,
    "aggregate",
  );
  assert.ok(
    report.surfaces
      .filter(({ surface }) => surface.startsWith(".#"))
      .every(({ classification }) =>
        classification === "alias" || classification === "utility"),
  );
  assert.ok(
    report.surfaces.some(
      ({ surface, classification, status }) =>
        surface === ".#SpacingValue" &&
        classification === "utility" &&
        status === "covered",
    ),
  );

  const popoverSelection = report.selectionDestinations.find(
    ({ guideId, destinations }) =>
      guideId === "layer-selection"
      && destinations.some(({ kind, id }) => kind === "component" && id === "popover"),
  );
  assert.equal(popoverSelection.status, "covered");
  assert.ok(
    popoverSelection.destinations.some(
      ({ kind, id }) => kind === "component" && id === "hover-card",
    ),
  );

  assert.deepEqual(report.failures, []);
  assert.doesNotThrow(() => assertCompleteAgentCoverage(report));
});

test("orphan Agent Knowledge sources block coverage", () => {
  const failures = validateAgentSourceOwnership({
    componentSources: [
      { id: "button", path: "src/components/button/agent.json" },
      { id: "orphan", path: "src/components/orphan/agent.json" },
    ],
    guideSources: [
      { id: "layer-selection", path: "agents/guides/layer-selection/agent.json" },
      { id: "unexpected-guide", path: "agents/guides/unexpected-guide/agent.json" },
    ],
    componentOwnerIds: ["button"],
    expectedComponentPaths: {
      button: "src/components/button/agent.json",
    },
    packageGuideIds: ["layer-selection"],
  });

  assert.deepEqual(
    failures.map(({ code }) => code).sort(),
    ["non-public-agent-owner", "stale-agent-source"],
  );
  const report = { failures };
  assert.throws(() => assertCompleteAgentCoverage(report), /non-public-agent-owner/u);
});

test("Agent Knowledge verification has no partial-coverage escape hatch", async () => {
  const packageJson = JSON.parse(await readFile(new URL("../../package.json", import.meta.url), "utf8"));
  const verificationSources = await Promise.all([
    "../../scripts/agent-catalog.mjs",
    "../../scripts/build-agent-knowledge.mjs",
    "../../scripts/verify-package.mjs",
    "../../scripts/verify-consumers.mjs",
  ].map((file) => readFile(new URL(file, import.meta.url), "utf8")));

  assert.deepEqual(
    Object.keys(packageJson.scripts).filter((name) => name.includes("partial")),
    [],
  );
  for (const source of verificationSources) {
    assert.doesNotMatch(source, /--partial|allowUncovered|partialStagingFailures/u);
  }
});
