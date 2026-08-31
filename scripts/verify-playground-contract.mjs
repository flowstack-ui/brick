import { spawnSync } from "node:child_process";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const read = (relative) => readFile(path.join(root, relative), "utf8");
const exists = async (relative) => {
  try {
    await access(path.join(root, relative));
    return true;
  } catch {
    return false;
  }
};

const contract = JSON.parse(
  await read("playground/component-evidence-contract.json"),
);
const registry = await read("playground/src/app/component-registry.ts");
const application = await read("playground/src/app/PlaygroundApp.tsx");
const failures = [];

if (contract.schema !== "flowstack.brick-playground-evidence.v1") {
  failures.push(`unsupported contract schema ${String(contract.schema)}`);
}

const contractEntries = Object.entries(contract.categories).flatMap(
  ([category, ids]) => ids.map((id) => ({ category, id })),
);
const contractIds = contractEntries.map(({ id }) => id);
if (contractIds.length !== contract.componentCount) {
  failures.push(
    `contract declares ${contract.componentCount} components but classifies ${contractIds.length}`,
  );
}
if (new Set(contractIds).size !== contractIds.length) {
  failures.push("contract component IDs are not unique");
}
for (const [feature, ids] of Object.entries(contract.featureOwners)) {
  for (const id of ids) {
    if (!contractIds.includes(id))
      failures.push(`${feature} feature owner ${id} is not classified`);
  }
}
for (const [standard, ids] of Object.entries(contract.reviewStandards ?? {})) {
  for (const id of ids) {
    if (!contractIds.includes(id))
      failures.push(`${standard} review owner ${id} is not classified`);
  }
}

const registryEntries = [
  ...registry.matchAll(
    /category:\s*"([^"]+)"[\s\S]*?id:\s*"([^"]+)"[\s\S]*?route:\s*"([^"]+)"[\s\S]*?title:\s*"([^"]+)"/g,
  ),
].map((match) => ({
  category: match[1],
  id: match[2],
  route: match[3],
  title: match[4],
}));

if (registryEntries.length !== contract.componentCount) {
  failures.push(
    `registry contains ${registryEntries.length} entries; expected ${contract.componentCount}`,
  );
}

for (const { category, id } of contractEntries) {
  const registered = registryEntries.filter((entry) => entry.id === id);
  if (registered.length !== 1) {
    failures.push(`${id} has ${registered.length} registry entries`);
    continue;
  }
  if (registered[0].category !== category) {
    failures.push(
      `${id} is registered in ${registered[0].category}; contract requires ${category}`,
    );
  }
  if (registered[0].route !== `/${id}`)
    failures.push(`${id} route must be /${id}`);
  const moduleKey = id.includes("-") ? `"${id}"` : id;
  const modulePattern = new RegExp(`${moduleKey}\\s*:\\s*\\{\\s*Page:`);
  if (!modulePattern.test(application))
    failures.push(`${id} is missing its typed page module`);
}

const allTsx = async (directory) => {
  const result = [];
  for (const entry of await readdir(path.join(root, directory), {
    withFileTypes: true,
  })) {
    const relative = path.join(directory, entry.name);
    if (entry.isDirectory()) result.push(...(await allTsx(relative)));
    else if (entry.name.endsWith(".tsx")) result.push(relative);
  }
  return result;
};
const componentTsxPaths = await allTsx("playground/src/components");
const componentTsx = await Promise.all(
  componentTsxPaths.map(async (relative) => ({
    relative,
    source: await read(relative),
  })),
);
const workbookEvidence = workbookEvidenceFromArchive();
const workbookSheetNames = workbookEvidence.sheetNames;

for (const entry of registryEntries) {
  const { id, title } = entry;
  const ownedPageSource = componentTsx
    .filter(({ relative }) => relative.includes(`/components/${id}/`))
    .map(({ source }) => source)
    .join("\n");
  const sharedVisibilitySource = ["show", "hide"].includes(id)
    ? componentTsx
        .filter(({ relative }) => relative.includes("/components/_visibility/"))
        .map(({ source }) => source)
        .join("\n")
    : "";
  const reviewSource = `${ownedPageSource}\n${sharedVisibilitySource}`;
  const hasPageIdentity =
    ownedPageSource.includes(`data-component-page="${id}"`) ||
    ownedPageSource.includes(`id="${id}"`);
  if (!hasPageIdentity)
    failures.push(`${id} page does not declare its component identity`);
  if (!ownedPageSource.includes(`${id}.`) && !["show", "hide"].includes(id)) {
    failures.push(
      `${id} page does not declare component-prefixed scenario IDs`,
    );
  }
  if (
    contract.reviewStandards?.labeledSpecimenOwners?.includes(id) &&
    !/\bSpecimen(?:Label)?\b/.test(reviewSource)
  ) {
    failures.push(`${id} review page has no shared labeled specimen evidence`);
  }
  if (
    contract.reviewStandards?.customizationOwners?.includes(id) &&
    !/CustomizationEvidence|playground-customization-layout/.test(reviewSource)
  ) {
    failures.push(
      `${id} review page has no paired code-and-live customization evidence`,
    );
  }
  if (contract.reviewStandards?.pairedAppearanceOwners?.includes(id)) {
    if (!/data-brick-appearance="light"/.test(reviewSource))
      failures.push(`${id} review page has no explicit light specimen`);
    if (!/data-brick-appearance="dark"/.test(reviewSource))
      failures.push(`${id} review page has no explicit dark specimen`);
  }

  const owners = {
    behavior: `playground/tests/components/${id}/behavior.spec.ts`,
    changelog: `docs/components/${id}/CHANGELOG.md`,
    docs: `docs/components/${id}/README.md`,
    manual: `playground/manual-tests/${id}.md`,
    types: `test/types/components/${id}.test.ts`,
    unit: `test/components/${id}/${id}.test.tsx`,
    visual: `playground/tests/components/${id}/visual.spec.ts`,
  };
  for (const [kind, relative] of Object.entries(owners)) {
    if (!(await exists(relative)))
      failures.push(`${id} is missing ${kind} owner at ${relative}`);
  }
  if (!(await exists(owners.visual)) || !(await exists(owners.manual)))
    continue;

  const [behavior, visual, manual] = await Promise.all([
    read(owners.behavior),
    read(owners.visual),
    read(owners.manual),
  ]);
  if (!/AxeBuilder|checkA11y|axe/i.test(behavior)) {
    failures.push(
      `${id} behavior owner has no component-owned accessibility scan`,
    );
  }
  if (!/toHaveScreenshot\s*\(|expectEvidenceScreenshot\s*\(/.test(visual)) {
    failures.push(`${id} visual owner captures no screenshot`);
  }
  const snapshotDirectory = path.join(
    root,
    `playground/tests/components/${id}/visual.spec.ts-snapshots`,
  );
  let snapshotCount = 0;
  try {
    snapshotCount = (await readdir(snapshotDirectory)).filter((name) =>
      name.endsWith(".png"),
    ).length;
  } catch {}
  if (snapshotCount === 0) failures.push(`${id} owns no reviewed PNG baseline`);

  const scenarioOrderIndex = manual.search(/^Scenario order:/m);
  const scenarioOrderRemainder =
    scenarioOrderIndex >= 0
      ? manual.slice(scenarioOrderIndex + "Scenario order:".length)
      : "";
  const scenarioOrderBoundaries = ["\nUse `pass`", "\n## Protocol", "\n## Step"]
    .map((boundary) => scenarioOrderRemainder.indexOf(boundary))
    .filter((index) => index >= 0);
  const scenarioOrderBlock = scenarioOrderRemainder.slice(
    0,
    scenarioOrderBoundaries.length > 0
      ? Math.min(...scenarioOrderBoundaries)
      : undefined,
  );
  const manualScenarioNumbers = [
    ...scenarioOrderBlock.matchAll(/`(\d{2})\s+[^`]+`/g),
  ].map((match) => Number(match[1]));
  const listedScenarioNumbers = [
    ...scenarioOrderBlock.matchAll(/^\s*(\d+)\.\s+\S/gm),
  ].map((match) => Number(match[1]));
  const hasSequentialNumbers = (numbers) =>
    numbers.length > 0 &&
    numbers.every((number, index) => number === index + 1);
  const hasNamedSequence = /(?:→|;)/.test(scenarioOrderBlock);
  if (
    !hasSequentialNumbers(manualScenarioNumbers) &&
    !hasSequentialNumbers(listedScenarioNumbers) &&
    !hasNamedSequence
  ) {
    failures.push(`${id} manual protocol omits its scenario order`);
  }
  const overall =
    manual.match(/^Overall result:[ \t]*(.*)$/m)?.[1]?.trim() ?? "";
  const filledResults = [
    ...manual.matchAll(
      /^Result:[ \t]*(pass|fail|blocked|not applicable)[ \t]*$/gim,
    ),
  ];
  if (/^(pass|fail|blocked)$/i.test(overall) && filledResults.length === 0) {
    failures.push(`${id} manual completion has no recorded step results`);
  }
  if (!overall && filledResults.length > 0) {
    failures.push(`${id} manual steps are filled but Overall result is empty`);
  }
  const workbookRows = workbookEvidence.rowsBySheet.get(title) ?? [];
  if (
    !/^pass$/i.test(overall) &&
    workbookRows.some(
      (row) =>
        row.F?.toLowerCase() === "manual" &&
        row.H?.toLowerCase() === "verified" &&
        row.I?.toLowerCase() === "yes",
    )
  ) {
    failures.push(
      `${id} workbook claims verified human evidence while its manual protocol is pending`,
    );
  }

  let combinedEvidence = `${behavior}\n${visual}\n${manual}`.toLowerCase();
  if (/AxeBuilder|checkA11y|axe/i.test(behavior))
    combinedEvidence += " accessibility";
  if (/\b(?:light|dark|theme)\b/i.test(combinedEvidence))
    combinedEvidence += " appearance";
  if (
    /\b(?:mobile|narrow|physical device|320px|390px)\b/i.test(combinedEvidence)
  ) {
    combinedEvidence += " mobile";
  }
  for (const environment of contract.defaultEnvironments) {
    const pattern =
      environment === "forced-colors"
        ? /forced.?colors/
        : new RegExp(environment);
    if (!pattern.test(combinedEvidence)) {
      failures.push(`${id} evidence never addresses ${environment}`);
    }
  }
  for (const [feature, ids] of Object.entries(contract.featureOwners)) {
    if (!ids.includes(id)) continue;
    if (feature === "portal") continue;
    const pattern =
      feature === "motion" ? /reduced.?motion/ : new RegExp(feature);
    if (!pattern.test(combinedEvidence))
      failures.push(`${id} evidence never addresses ${feature}`);
  }

  if (!workbookSheetNames.has(title))
    failures.push(`${id} workbook sheet ${title} is missing`);
}

if (failures.length > 0) {
  console.error("Playground evidence contract verification failed:\n");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(
  `Verified ${contract.componentCount} classified playground owners, typed page modules, evidence files, screenshots, environments, and workbook sheets.`,
);

function workbookEvidenceFromArchive() {
  const workbookPath = path.join(root, "playground/component-coverage.xlsx");
  const workbookResult = spawnSync(
    "unzip",
    ["-p", workbookPath, "xl/workbook.xml"],
    { encoding: "utf8" },
  );
  const relationshipsResult = spawnSync(
    "unzip",
    ["-p", workbookPath, "xl/_rels/workbook.xml.rels"],
    { encoding: "utf8" },
  );
  const sharedStringsResult = spawnSync(
    "unzip",
    ["-p", workbookPath, "xl/sharedStrings.xml"],
    { encoding: "utf8" },
  );
  if (
    workbookResult.status !== 0 ||
    relationshipsResult.status !== 0 ||
    sharedStringsResult.status !== 0
  ) {
    failures.push(
      `cannot inspect coverage workbook: ${workbookResult.stderr || relationshipsResult.stderr || sharedStringsResult.stderr || "unzip failed"}`,
    );
    return { rowsBySheet: new Map(), sheetNames: new Set() };
  }

  const decodeXml = (value) =>
    value
      .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
      .replace(/&#x([\da-f]+);/gi, (_, code) =>
        String.fromCodePoint(Number.parseInt(code, 16)),
      )
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&apos;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">");
  const sharedStrings = [
    ...sharedStringsResult.stdout.matchAll(
      /<(?:[\w.-]+:)?si\b[^>]*>([\s\S]*?)<\/(?:[\w.-]+:)?si>/g,
    ),
  ].map((match) =>
    [
      ...match[1].matchAll(
        /<(?:[\w.-]+:)?t\b[^>]*>([\s\S]*?)<\/(?:[\w.-]+:)?t>/g,
      ),
    ]
      .map((textMatch) => decodeXml(textMatch[1]))
      .join(""),
  );
  const relationshipTargets = new Map(
    [
      ...relationshipsResult.stdout.matchAll(/<(?:[\w.-]+:)?Relationship\b[^>]*>/g),
    ].flatMap((match) => {
      const id = match[0].match(/\bId="([^"]+)"/)?.[1];
      const target = match[0].match(/\bTarget="([^"]+)"/)?.[1];
      return id && target ? [[id, target]] : [];
    }),
  );
  const sheets = [
    ...workbookResult.stdout.matchAll(/<(?:[\w.-]+:)?sheet\b[^>]*>/g),
  ].flatMap((match) => {
    const name = match[0].match(/\bname="([^"]+)"/)?.[1];
    const relationshipId = match[0].match(/\b(?:[\w.-]+:)?id="([^"]+)"/)?.[1];
    return name && relationshipId
      ? [{
          name: decodeXml(name),
          target: relationshipTargets.get(relationshipId),
        }]
      : [];
  });
  const rowsBySheet = new Map();
  for (const sheet of sheets) {
    if (!sheet.target) continue;
    const worksheetResult = spawnSync(
      "unzip",
      [
        "-p",
        workbookPath,
        sheet.target.startsWith("/")
          ? sheet.target.slice(1)
          : path.posix.join("xl", sheet.target),
      ],
      { encoding: "utf8" },
    );
    if (worksheetResult.status !== 0) continue;
    const rows = new Map();
    for (const cell of worksheetResult.stdout.matchAll(
      /<(?:[\w.-]+:)?c\b([^>]*)>([\s\S]*?)<\/(?:[\w.-]+:)?c>/g,
    )) {
      const address = cell[1].match(/\br="([A-Z]+)(\d+)"/) ?? [];
      if (!address[1] || !address[2]) continue;
      const type = cell[1].match(/\bt="([^"]+)"/)?.[1];
      const raw = cell[2].match(
        /<(?:[\w.-]+:)?v>([\s\S]*?)<\/(?:[\w.-]+:)?v>/,
      )?.[1];
      const inline = cell[2].match(
        /<(?:[\w.-]+:)?t\b[^>]*>([\s\S]*?)<\/(?:[\w.-]+:)?t>/,
      )?.[1];
      const value =
        type === "s" && raw !== undefined
          ? sharedStrings[Number(raw)]
          : inline !== undefined
            ? decodeXml(inline)
            : raw !== undefined
              ? decodeXml(raw)
              : undefined;
      if (value === undefined) continue;
      const rowNumber = Number(address[2]);
      const row = rows.get(rowNumber) ?? {};
      row[address[1]] = value;
      rows.set(rowNumber, row);
    }
    rowsBySheet.set(sheet.name, [...rows.values()]);
  }

  return {
    rowsBySheet,
    sheetNames: new Set(sheets.map(({ name }) => name)),
  };
}
