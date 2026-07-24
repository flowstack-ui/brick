import { access, readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { componentIds, componentTestPaths } from "./component-test-manifest.mjs";

const requested = process.argv.length > 2 ? process.argv.slice(2) : componentIds;

const unknown = requested.filter((componentId) => !componentIds.includes(componentId));
if (unknown.length > 0) {
  console.error(`Unknown component IDs: ${unknown.join(", ")}`);
  process.exit(1);
}

const requiredSections = [
  "When and where to use",
  "When not to use",
  "Installation and imports",
  "Quick start",
  "Anatomy and DOM ownership",
  "API",
  "Visual recipes and states",
  "Tokens and CSS hooks",
  "Customization",
  "Responsive behavior",
  "Accessibility",
  "Composition, native props, and refs",
  "Examples",
  "Evidence",
  "Changelog",
];

const failures = [];
const allowedChangelogCategories = new Set([
  "Added",
  "Changed",
  "Deprecated",
  "Removed",
  "Fixed",
  "Security",
]);
const changelogDiaryPatterns = [
  [/\b(?:playground|workbook)\b/i, "playground or workbook evidence"],
  [/\b(?:browser|component|package|type|visual) evidence\b/i, "test evidence"],
  [/\bmanual protocol\b/i, "manual-test evidence"],
  [/\bconsumer proof\b/i, "Consumer evidence"],
  [/\bowner verification\b/i, "internal review history"],
  [/\b(?:upgraded|adopted) (?:the exact )?Atom \d+\.\d+\.\d+\b/i, "dependency-upgrade history"],
];
const componentSubpaths = {
  "notification-badge": "badge",
};
const documentationIndex = await readFile("docs/README.md", "utf8");
const packageReadme = await readFile("README.md", "utf8");

for (const componentId of requested) {
  const { changelog, guide } = componentTestPaths(componentId);
  let documentation;

  try {
    documentation = await readFile(guide, "utf8");
    await access(changelog);
  } catch {
    failures.push(`${componentId}: missing guide or changelog owner`);
    continue;
  }

  const changelogText = await readFile(changelog, "utf8");
  const expectedTitle = documentation.match(/^# (.+)$/m)?.[1];
  if (!expectedTitle) {
    failures.push(`${componentId}: README is missing its component title`);
    continue;
  }
  if (!changelogText.startsWith(`# ${expectedTitle} changelog\n`)) {
    failures.push(
      `${componentId}: changelog must start with "# ${expectedTitle} changelog"`,
    );
  }
  const expectedVersionStatement = `${expectedTitle} follows the package version of \`@flowstack-ui/brick\`.`;
  if (!changelogText.includes(expectedVersionStatement)) {
    failures.push(
      `${componentId}: changelog must state "${expectedVersionStatement}"`,
    );
  }

  const secondLevelHeadings = [
    ...changelogText.matchAll(/^## (.+)$/gm),
  ].map((match) => match[1]);
  if (secondLevelHeadings[0] !== "Unreleased") {
    failures.push(
      `${componentId}: first changelog release heading must be exactly "## Unreleased"`,
    );
  }

  const categories = [...changelogText.matchAll(/^### (.+)$/gm)].map(
    (match) => match[1],
  );
  if (categories.length === 0) {
    failures.push(`${componentId}: Unreleased must contain a change category`);
  }
  for (const category of categories) {
    if (!allowedChangelogCategories.has(category)) {
      failures.push(
        `${componentId}: unsupported changelog category "${category}"`,
      );
    }
  }

  for (const [pattern, description] of changelogDiaryPatterns) {
    if (pattern.test(changelogText)) {
      failures.push(
        `${componentId}: changelog contains ${description} instead of consumer-visible behavior`,
      );
    }
  }

  const headings = [...documentation.matchAll(/^## (.+)$/gm)].map((match) => match[1]);
  if (JSON.stringify(headings) !== JSON.stringify(requiredSections)) {
    failures.push(
      `${componentId}: required README sections are missing, renamed, duplicated, or out of order`,
    );
  }

  const requiredEvidence = [
    `../../../playground/src/components/${componentId}/`,
    `../../../test/components/${componentId}/`,
    `../../../test/types/components/${componentId}.test.ts`,
    `../../../playground/tests/components/${componentId}/behavior.spec.ts`,
    `../../../playground/tests/components/${componentId}/visual.spec.ts`,
    `../../../playground/manual-tests/${componentId}.md`,
  ];

  for (const evidence of requiredEvidence) {
    if (!documentation.includes(evidence)) {
      failures.push(`${componentId}: missing component-owned evidence link ${evidence}`);
    }
  }

  for (const match of documentation.matchAll(/\]\((\.\.\/[^)#]+)(?:#[^)]+)?\)/g)) {
    const target = resolve(dirname(guide), match[1]);
    try {
      await access(target);
    } catch {
      failures.push(`${componentId}: broken local documentation link ${match[1]}`);
    }
  }

  const componentSubpath = componentSubpaths[componentId] ?? componentId;
  if (!documentation.includes(`@flowstack-ui/brick/${componentSubpath}`)) {
    failures.push(`${componentId}: missing stable component-subpath import`);
  }

  if (!documentation.includes('@flowstack-ui/brick/styles.css')) {
    failures.push(`${componentId}: missing compiled stylesheet import`);
  }
}

for (const componentId of componentIds) {
  const indexLink = `components/${componentId}/README.md`;
  const indexOccurrences = documentationIndex.split(indexLink).length - 1;
  if (indexOccurrences !== 1) {
    failures.push(
      `${componentId}: docs/README.md must contain exactly one guide link (${indexLink})`,
    );
  }

  const packageLink = `docs/components/${componentId}/README.md`;
  const packageOccurrences = packageReadme.split(packageLink).length - 1;
  if (packageOccurrences !== 1) {
    failures.push(
      `${componentId}: README.md must contain exactly one guide link (${packageLink})`,
    );
  }
}

if (failures.length > 0) {
  console.error("Component documentation verification failed:\n");
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Verified README structure, ownership, imports, evidence links, and public indexes for ${requested.length} component${requested.length === 1 ? "" : "s"}.`,
);
