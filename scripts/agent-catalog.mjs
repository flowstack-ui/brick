import { access, readdir, readFile, stat, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { basename, dirname, join, relative, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";
import { componentDocumentationContracts } from "./component-documentation-contracts.mjs";
import { componentIds } from "./component-test-manifest.mjs";

const packageRoot = fileURLToPath(new URL("..", import.meta.url));
const catalogPath = join(packageRoot, "agents", "catalog.json");
const coveragePath = join(packageRoot, "dist", "agents", "coverage.json");
const packageRequire = createRequire(import.meta.url);

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory, predicate = () => true) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(path, predicate));
    else if (predicate(path)) files.push(path);
  }
  return files.sort();
}

async function publicExports(path, seen = new Set()) {
  if (seen.has(path)) return [];
  seen.add(path);
  const source = await readFile(path, "utf8");
  const file = ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS);
  const exports = [];
  for (const statement of file.statements) {
    if (ts.isExportDeclaration(statement)) {
      const source = statement.moduleSpecifier && ts.isStringLiteral(statement.moduleSpecifier) ? statement.moduleSpecifier.text : null;
      if (statement.exportClause && ts.isNamedExports(statement.exportClause)) {
        for (const element of statement.exportClause.elements) {
          exports.push({ name: element.name.text, typeOnly: statement.isTypeOnly || element.isTypeOnly, source });
        }
      } else if (!statement.exportClause && source?.startsWith(".")) {
        const candidate = resolve(dirname(path), source.replace(/\.js$/u, ".ts"));
        const target = await exists(candidate) ? candidate : candidate.replace(/\.ts$/u, ".tsx");
        if (await exists(target)) exports.push(...await publicExports(target, seen));
      }
      continue;
    }
    const exported = statement.modifiers?.some(({ kind }) => kind === ts.SyntaxKind.ExportKeyword);
    if (!exported) continue;
    if (ts.isVariableStatement(statement)) {
      for (const declaration of statement.declarationList.declarations) {
        if (ts.isIdentifier(declaration.name)) exports.push({ name: declaration.name.text, typeOnly: false, source: null });
      }
    } else if ((ts.isFunctionDeclaration(statement) || ts.isClassDeclaration(statement) || ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement) || ts.isEnumDeclaration(statement)) && statement.name) {
      exports.push({
        name: statement.name.text,
        typeOnly: ts.isInterfaceDeclaration(statement) || ts.isTypeAliasDeclaration(statement),
        source: null,
      });
    }
  }
  return [...new Map(exports.map((entry) => [entry.name, entry])).values()].sort((a, b) => a.name.localeCompare(b.name));
}

function failure(code, message, evidence = []) {
  return { code, message, evidence };
}

async function validateInstalledExternalAgent(destination, packageJson, manifestCache) {
  let installed;
  if (manifestCache.has(destination.package)) {
    installed = manifestCache.get(destination.package);
  } else {
    const installedVersion = packageJson.dependencies?.[destination.package];
    let manifestPath;
    try {
      manifestPath = packageRequire.resolve(`${destination.package}/agents/manifest.json`);
    } catch {
      manifestPath = null;
    }
    if (manifestPath) {
      try {
        const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
        installed = { installedVersion, manifest, manifestPath, manifestParseFailed: false };
      } catch {
        installed = { installedVersion, manifest: null, manifestPath, manifestParseFailed: true };
      }
    } else {
      installed = { installedVersion, manifest: null, manifestPath: null, manifestParseFailed: false };
    }
    manifestCache.set(destination.package, installed);
  }

  const { installedVersion, manifest, manifestPath, manifestParseFailed } = installed;
  if (manifestParseFailed) {
    return failure(
      "invalid-installed-external-agent-manifest",
      `${destination.package}/agents/manifest.json is not readable valid JSON.`,
      [manifestPath],
    );
  }
  if (!manifest || !manifestPath) {
    return failure(
      "missing-installed-external-agent-artifact",
      `${destination.package}@${installedVersion} does not expose agents/manifest.json required by ${destination.id}.`,
      ["package.json", `${destination.package}/agents/manifest.json`],
    );
  }
  if (
    manifest.schema !== "flowstack.agent-manifest.v1"
    || manifest.package !== destination.package
    || manifest.packageVersion !== installedVersion
  ) {
    return failure(
      "invalid-installed-external-agent-manifest",
      `${destination.package}/agents/manifest.json does not match the exact installed package identity.`,
      [manifestPath],
    );
  }

  const entries = [...(manifest.components ?? []), ...(manifest.guides ?? [])]
    .filter(({ id }) => id === destination.id);
  if (entries.length === 0) {
    return failure(
      "missing-installed-external-agent-artifact",
      `${destination.package}@${installedVersion} does not publish Agent Knowledge artifact ${destination.id}.`,
      [manifestPath, `${destination.package}/agents/${destination.id}.json`],
    );
  }
  if (entries.length !== 1 || typeof entries[0].json !== "string") {
    return failure(
      "invalid-installed-external-agent-manifest",
      `${destination.package}/agents/manifest.json has an ambiguous or invalid ${destination.id} entry.`,
      [manifestPath],
    );
  }

  let artifactPath;
  let artifact;
  try {
    const artifactSubpath = entries[0].json.replace(/^\.\//u, "");
    artifactPath = packageRequire.resolve(`${destination.package}/agents/${artifactSubpath}`);
  } catch {
    return failure(
      "missing-installed-external-agent-artifact",
      `${destination.package}@${installedVersion} manifest entry ${destination.id} does not resolve to its JSON artifact.`,
      [manifestPath, `${destination.package}/agents/${entries[0].json}`],
    );
  }
  try {
    artifact = JSON.parse(await readFile(artifactPath, "utf8"));
  } catch {
    return failure(
      "invalid-installed-external-agent-artifact",
      `${destination.package}/agents/${entries[0].json} is not readable valid JSON.`,
      [artifactPath],
    );
  }
  const expectedLayer = destination.package.split("/").at(-1);
  if (artifact.id !== destination.id || artifact.package !== destination.package || artifact.layer !== expectedLayer) {
    return failure(
      "invalid-installed-external-agent-artifact",
      `${destination.package}/agents/${entries[0].json} must identify ${destination.id} in package ${destination.package} and layer ${expectedLayer}.`,
      [artifactPath],
    );
  }
  return null;
}

export function validateAgentSourceOwnership({
  componentSources,
  guideSources,
  componentOwnerIds,
  expectedComponentPaths,
  packageGuideIds,
}) {
  const failures = [];
  const componentOwners = new Set(componentOwnerIds);
  const expectedGuides = new Set(packageGuideIds);
  const discoveredGuides = new Set();
  for (const source of componentSources) {
    if (!componentOwners.has(source.id)) {
      failures.push(failure("non-public-agent-owner", `${source.path} declares ${source.id}, which is not a documented public component owner.`, [source.path]));
      continue;
    }
    const expectedPath = expectedComponentPaths[source.id];
    if (expectedPath && source.path !== expectedPath) {
      failures.push(failure("stale-agent-source", `${source.path} is not the canonical Agent Knowledge source for ${source.id}; expected ${expectedPath}.`, [source.path, expectedPath]));
    }
  }
  for (const source of guideSources) {
    discoveredGuides.add(source.id);
    const expectedPath = `agents/guides/${source.id}/agent.json`;
    if (!expectedGuides.has(source.id) || source.path !== expectedPath) {
      failures.push(failure("stale-agent-source", `${source.path} is not a canonical expected package-guide source.`, [source.path]));
    }
  }
  for (const id of expectedGuides) {
    if (!discoveredGuides.has(id)) failures.push(failure("missing-package-guide-source", `Canonical package guide ${id} has no Agent Knowledge source.`, [`agents/guides/${id}/agent.json`]));
  }
  return failures;
}

function sortBy(key) {
  return (a, b) => String(a[key]).localeCompare(String(b[key]));
}

export async function createAgentCoverage() {
  const [packageJsonRaw, catalogRaw, rootSource] = await Promise.all([
    readFile(join(packageRoot, "package.json"), "utf8"),
    readFile(catalogPath, "utf8"),
    readFile(join(packageRoot, "src", "index.ts"), "utf8"),
  ]);
  const packageJson = JSON.parse(packageJsonRaw);
  const catalog = JSON.parse(catalogRaw);
  const failures = [];

  if (catalog.schema !== "flowstack.agent-catalog.v1") failures.push(failure("catalog-schema", "agents/catalog.json must use flowstack.agent-catalog.v1."));
  if (catalog.package !== packageJson.name) failures.push(failure("catalog-package", `Catalog package must be ${packageJson.name}.`));
  if (catalog.layer !== "brick") failures.push(failure("catalog-layer", "Catalog layer must be brick."));

  const explicit = new Map();
  for (const record of catalog.classifications ?? []) {
    if (!record.surface || !record.classification || !record.reason) {
      failures.push(failure("invalid-classification", "Every catalog classification needs surface, classification, and reason."));
      continue;
    }
    if (explicit.has(record.surface)) failures.push(failure("duplicate-classification", `${record.surface} has more than one explicit classification.`));
    explicit.set(record.surface, record);
  }

  const publicExportEntries = Object.entries(packageJson.exports);
  const componentSubpaths = publicExportEntries
    .filter(([subpath, target]) => subpath !== "." && typeof target === "object" && typeof target.default === "string" && target.default.endsWith(".js"))
    .map(([subpath]) => subpath)
    .sort();
  const metadataSubpaths = publicExportEntries
    .map(([subpath]) => subpath)
    .filter((subpath) => subpath === "." || !componentSubpaths.includes(subpath))
    .sort();

  for (const subpath of metadataSubpaths) {
    const record = explicit.get(subpath);
    const expectedClassification = subpath === "." ? "aggregate" : "metadata";
    if (!record || record.classification !== expectedClassification || !record.documentation) {
      failures.push(failure("unclassified-metadata", `${subpath} needs an explicit ${expectedClassification} classification and documentation owner.`, ["package.json", "agents/catalog.json"]));
    }
  }

  const documentedOwners = [...componentIds].sort();
  const documentationContractIds = Object.keys(componentDocumentationContracts).sort();
  for (const id of documentedOwners.filter((id) => !documentationContractIds.includes(id))) {
    failures.push(failure("missing-documentation-contract", `${id} is a documented component owner without a documentation contract.`));
  }
  for (const id of documentationContractIds.filter((id) => !documentedOwners.includes(id))) {
    failures.push(failure("stale-documentation-contract", `${id} has a documentation contract but is absent from the canonical component manifest.`));
  }

  const subpathExports = new Map();
  for (const subpath of componentSubpaths) {
    const id = subpath.slice(2);
    const sourcePath = join(packageRoot, "src", "components", id, "index.ts");
    if (!(await exists(sourcePath))) {
      failures.push(failure("missing-subpath-source", `${subpath} has no source component barrel.`, [relative(packageRoot, sourcePath)]));
      subpathExports.set(subpath, []);
      continue;
    }
    subpathExports.set(subpath, await publicExports(sourcePath));
  }

  const rootExports = await publicExports(join(packageRoot, "src", "index.ts"));
  const rootNames = new Set(rootExports.map(({ name }) => name));
  const subpathSymbolOwners = new Map();
  for (const [subpath, symbols] of subpathExports) {
    for (const { name } of symbols) {
      const owners = subpathSymbolOwners.get(name) ?? [];
      owners.push(subpath);
      subpathSymbolOwners.set(name, owners);
    }
  }
  const specialOwnerRecords = [...explicit.values()].filter((record) => record.classification === "component" && record.ownerId);
  const ownerSource = new Map(documentedOwners.map((id) => [id, id]));
  for (const record of specialOwnerRecords) ownerSource.set(record.ownerId, record.sourceOwner ?? record.ownerId);

  const ownerSubpaths = new Map();
  const ownerSymbols = new Map();
  for (const id of documentedOwners) {
    const sourceOwner = ownerSource.get(id);
    const standardSubpath = `./${sourceOwner}`;
    const special = specialOwnerRecords.find((record) => record.ownerId === id);
    if (!componentSubpaths.includes(standardSubpath)) {
      failures.push(failure("unpublished-owner", `${id} has no public component subpath.`, ["package.json", "scripts/component-test-manifest.mjs"]));
      ownerSubpaths.set(id, []);
      ownerSymbols.set(id, []);
      continue;
    }
    ownerSubpaths.set(id, [standardSubpath]);
    if (special) {
      ownerSymbols.set(id, [...explicit.values()].filter((record) => record.ownerId === id && record.surface.startsWith(`${standardSubpath}#`)).map((record) => record.surface.split("#")[1]).sort());
    } else {
      ownerSymbols.set(id, (subpathExports.get(standardSubpath) ?? [])
        .map(({ name }) => name)
        .filter((name) => ![...explicit.values()].some((record) => record.surface === `${standardSubpath}#${name}` && record.ownerId !== id))
        .sort());
    }
  }

  for (const subpath of componentSubpaths) {
    const id = subpath.slice(2);
    if (!documentedOwners.includes(id)) failures.push(failure("unclassified-component-subpath", `${subpath} does not resolve to a documented component owner.`));
  }

  const knowledgeFiles = await walk(join(packageRoot, "src", "components"), (path) => basename(path) === "agent.json");
  const guideFiles = await walk(join(packageRoot, "agents", "guides"), (path) => basename(path) === "agent.json");
  const knowledgeById = new Map();
  const componentSourceRecords = [];
  const guideSourceRecords = [];
  for (const file of knowledgeFiles) {
    const data = JSON.parse(await readFile(file, "utf8"));
    if (knowledgeById.has(data.id)) failures.push(failure("duplicate-agent-id", `${data.id} has more than one canonical Agent Knowledge source.`));
    knowledgeById.set(data.id, { data, file });
    componentSourceRecords.push({ id: data.id, path: relative(packageRoot, file) });
  }
  for (const file of guideFiles) {
    const data = JSON.parse(await readFile(file, "utf8"));
    if (knowledgeById.has(data.id)) failures.push(failure("duplicate-agent-id", `${data.id} has more than one canonical Agent Knowledge source.`));
    knowledgeById.set(data.id, { data, file });
    guideSourceRecords.push({ id: data.id, path: relative(packageRoot, file) });
  }
  const packageGuideIds = [...(catalog.packageGuideIds ?? [])].sort();
  const expectedComponentPaths = Object.fromEntries(documentedOwners.map((id) => {
    const sourceOwner = ownerSource.get(id);
    return [id, sourceOwner === id ? `src/components/${id}/agent.json` : `src/components/${sourceOwner}/${id}/agent.json`];
  }));
  failures.push(...validateAgentSourceOwnership({
    componentSources: componentSourceRecords,
    guideSources: guideSourceRecords,
    componentOwnerIds: documentedOwners,
    expectedComponentPaths,
    packageGuideIds,
  }));
  const knownIds = new Set([...documentedOwners, ...packageGuideIds]);

  const components = [];
  for (const id of documentedOwners) {
    const knowledge = knowledgeById.get(id);
    const sourceOwner = ownerSource.get(id);
    const expectedAgentRoot = sourceOwner === id
      ? join(packageRoot, "src", "components", id)
      : join(packageRoot, "src", "components", sourceOwner, id);
    const expectedJsonSource = knowledge?.file ?? join(expectedAgentRoot, "agent.json");
    const markdownSource = knowledge ? join(dirname(knowledge.file), "agent.md") : join(expectedAgentRoot, "agent.md");
    const documentation = `docs/components/${id}/README.md`;
    const evidence = [
      `src/components/${sourceOwner}`,
      documentation,
      ...(knowledge ? [relative(packageRoot, knowledge.file), relative(packageRoot, markdownSource)] : []),
    ];
    let status = "covered";
    if (!knowledge || !(await exists(markdownSource))) {
      status = "uncovered";
      failures.push(failure("missing-component-guide", `${id} lacks a canonical Agent Knowledge JSON/Markdown pair.`, evidence));
    } else if (knowledge.data.schema !== "flowstack.agent-component.v1" || knowledge.data.package !== packageJson.name || knowledge.data.layer !== "brick" || knowledge.data.kind !== "component") {
      status = "invalid";
      failures.push(failure("invalid-component-guide", `${id} has invalid Agent Knowledge identity fields.`, evidence));
    }
    if (!(await exists(join(packageRoot, documentation)))) {
      status = "invalid";
      failures.push(failure("missing-component-documentation", `${id} lacks its public documentation owner.`, evidence));
    }
    components.push({
      id,
      name: knowledge?.data.name ?? id,
      publicSubpaths: ownerSubpaths.get(id) ?? [],
      publicSymbols: ownerSymbols.get(id) ?? [],
      sourceOwner: `src/components/${sourceOwner}`,
      documentationOwner: documentation,
      agentSources: { json: relative(packageRoot, expectedJsonSource), markdown: relative(packageRoot, markdownSource) },
      manifestPaths: { json: `./${id}.json`, markdown: `./${id}.md` },
      publicValueSymbols: (ownerSymbols.get(id) ?? []).filter((name) => (subpathExports.get((ownerSubpaths.get(id) ?? [])[0]) ?? []).some((symbol) => symbol.name === name && !symbol.typeOnly)),
      status,
    });
  }

  const surfaces = [];
  for (const subpath of metadataSubpaths) {
    const record = explicit.get(subpath);
    surfaces.push({ surface: subpath, classification: record?.classification ?? null, documentation: record?.documentation ?? null, status: record ? "covered" : "unclassified" });
  }
  for (const subpath of componentSubpaths) {
    const ownerId = subpath.slice(2);
    surfaces.push({ surface: subpath, classification: "component", ownerId, status: documentedOwners.includes(ownerId) ? "covered" : "unclassified" });
    for (const symbol of subpathExports.get(subpath) ?? []) {
      const surface = `${subpath}#${symbol.name}`;
      const record = explicit.get(surface);
      const terminalOwner = record?.ownerId ?? ownerId;
      surfaces.push({
        surface,
        classification: record?.classification ?? "compound-part",
        ownerId: terminalOwner,
        value: !symbol.typeOnly,
        status: knownIds.has(terminalOwner) ? "covered" : "unclassified",
      });
    }
  }
  for (const symbol of rootExports) {
    const subpaths = subpathSymbolOwners.get(symbol.name) ?? [];
    const matchingRecord = [...explicit.values()].find((record) => subpaths.some((subpath) => record.surface === `${subpath}#${symbol.name}`));
    const explicitOwner = matchingRecord?.ownerId;
    const sourceOwner = symbol.source?.match(/^\.\/components\/([^/]+)\//u)?.[1];
    const rootRecord = explicit.get(`.#${symbol.name}`);
    const candidateOwners = [...new Set(subpaths.map((subpath) => explicit.get(`${subpath}#${symbol.name}`)?.ownerId ?? subpath.slice(2)).filter((id) => knownIds.has(id)))];
    const canonicalOwner = explicitOwner ?? (sourceOwner && documentedOwners.includes(sourceOwner) ? sourceOwner : undefined);
    const ownerId = rootRecord?.ownerId ?? canonicalOwner ?? (candidateOwners.length === 1 ? candidateOwners[0] : undefined);
    const classification = rootRecord?.classification ?? (ownerId ? "alias" : "unclassified");
    const status = rootRecord || ownerId ? "covered" : "unclassified";
    if (!rootRecord && !canonicalOwner && candidateOwners.length > 1) failures.push(failure("ambiguous-root-symbol", `Root symbol ${symbol.name} maps to multiple owners: ${candidateOwners.join(", ")}.`));
    if (status !== "covered") failures.push(failure("unclassified-root-symbol", `Root symbol ${symbol.name} has no terminal component owner.`));
    surfaces.push({ surface: `.#${symbol.name}`, classification, ownerId: ownerId ?? null, documentation: rootRecord?.documentation ?? null, value: !symbol.typeOnly, status });
  }

  const exclusionReports = [];
  const sourceEntries = await readdir(join(packageRoot, "src", "components"), { withFileTypes: true });
  const privateDiscoveries = sourceEntries.filter((entry) => entry.isDirectory() && entry.name.startsWith("_")).map((entry) => `src/components/${entry.name}`).sort();
  for (const exclusion of catalog.exclusions ?? []) {
    const prefix = exclusion.pattern.endsWith("/**") ? exclusion.pattern.slice(0, -3) : exclusion.pattern;
    const absolute = join(packageRoot, ...prefix.split("/"));
    const matched = await exists(absolute) && (await stat(absolute)).isDirectory();
    const publicLeak = rootSource.includes(`./components/${basename(prefix)}/`) || componentSubpaths.includes(`./${basename(prefix)}`);
    const status = matched && !publicLeak && exclusion.visibility === "source-only" && Boolean(exclusion.reason) ? "covered" : "invalid";
    if (status === "invalid") failures.push(failure("invalid-exclusion", `${exclusion.pattern} is stale, public, or incomplete.`));
    exclusionReports.push({ ...exclusion, discoveries: matched ? [prefix] : [], status });
  }
  const exclusionPrefixes = new Set(exclusionReports.map((entry) => entry.pattern.replace(/\/\*\*$/u, "")));
  const classifiedPrivateOwners = new Set([...explicit.values()].map((record) => record.sourceOwner).filter((sourceOwner) => typeof sourceOwner === "string" && sourceOwner.startsWith("src/components/_")));
  for (const discovery of privateDiscoveries) {
    if (!exclusionPrefixes.has(discovery) && !classifiedPrivateOwners.has(discovery)) failures.push(failure("unclassified-private-discovery", `${discovery} needs an exact source-only exclusion or public utility classification.`));
  }

  const selectionDestinations = [];
  const externalManifestCache = new Map();
  const allowedDestinationKeys = {
    component: ["id", "kind"],
    guide: ["id", "kind"],
    "native-application": ["id", "kind"],
    package: ["id", "kind", "package", "versionPolicy"],
  };
  function destinationIsValid(destination, { selection = false } = {}) {
    const keys = allowedDestinationKeys[destination?.kind];
    if (!keys || Object.keys(destination).sort().join(",") !== [...keys].sort().join(",")) return false;
    if (!destination.id || typeof destination.id !== "string") return false;
    if (destination.kind === "component") return documentedOwners.includes(destination.id);
    if (destination.kind === "guide") return packageGuideIds.includes(destination.id);
    if (destination.kind === "native-application") return (catalog.nativeApplicationDestinations ?? []).some(({ id }) => id === destination.id);
    if (destination.kind === "package") {
      const installedVersion = packageJson.dependencies?.[destination.package];
      return Boolean(destination.package)
        && destination.package !== packageJson.name
        && destination.versionPolicy === "installed-exact"
        && typeof installedVersion === "string"
        && /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$/u.test(installedVersion)
        && !(selection && destination.package === "@flowstack-ui/atom");
    }
    return false;
  }
  for (const file of guideFiles) {
    const guide = JSON.parse(await readFile(file, "utf8"));
    for (const [index, selection] of guide.selection.entries()) {
      if (!Array.isArray(selection.destinations) || selection.destinations.length === 0) {
        failures.push(failure("missing-selection-destinations", `${guide.id} selection ${index + 1} has no structured destinations.`, [relative(packageRoot, file)]));
        selectionDestinations.push({ guideId: guide.id, selection: index + 1, status: "unresolved", destinations: [] });
        continue;
      }
      let status = "covered";
      for (const destination of selection.destinations) if (!destinationIsValid(destination, { selection: true })) status = "unresolved";
      for (const id of documentedOwners) {
        const publicValueSymbols = (ownerSymbols.get(id) ?? []).filter((name) => (subpathExports.get((ownerSubpaths.get(id) ?? [])[0]) ?? []).some((symbol) => symbol.name === name && !symbol.typeOnly));
        const displayLabel = id.split("-").map((part) => part === "otp" ? "OTP" : `${part[0].toUpperCase()}${part.slice(1)}`).join(" ");
        const names = [...publicValueSymbols, displayLabel];
        const selectionProse = `${selection.use} ${selection.note ?? ""}`;
        const namedInSelection = names.some((name) => new RegExp(`(?:^|[^A-Za-z0-9])${name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&")}(?!\\s+[A-Z])(?:$|[^A-Za-z0-9])`, "u").test(selectionProse));
        if (namedInSelection && !selection.destinations.some((destination) => destination.kind === "component" && destination.id === id)) status = "unresolved";
      }
      if (status === "unresolved") failures.push(failure("unresolved-selection", `${guide.id} selection ${index + 1} has an unresolved or forbidden destination.`, [relative(packageRoot, file)]));
      selectionDestinations.push({ guideId: guide.id, selection: index + 1, destinations: selection.destinations, status });
    }
  }

  for (const { data, file } of knowledgeById.values()) {
    for (const related of data.related ?? []) {
      if (typeof related === "string" && related.startsWith("@flowstack-ui/")) failures.push(failure("unstructured-external-related", `${data.id} uses unstructured external related ID ${related}.`, [relative(packageRoot, file)]));
      else if (typeof related === "string" && !knownIds.has(related)) failures.push(failure("unresolved-related", `${data.id} relates to unknown local ID ${related}.`, [relative(packageRoot, file)]));
      else if (related && typeof related === "object" && !destinationIsValid(related)) failures.push(failure("invalid-external-related", `${data.id} has an invalid structured external related destination.`, [relative(packageRoot, file)]));
      else if (related?.kind === "package") {
        const externalFailure = await validateInstalledExternalAgent(related, packageJson, externalManifestCache);
        if (externalFailure) failures.push(externalFailure);
      }
    }
  }

  const guides = packageGuideIds.map((id) => {
    const knowledge = knowledgeById.get(id);
    const data = knowledge?.data;
    const file = knowledge?.file ?? join(packageRoot, "agents", "guides", id, "agent.json");
    return {
      id,
      name: data?.name ?? id,
      agentSources: { json: relative(packageRoot, file), markdown: relative(packageRoot, join(dirname(file), "agent.md")) },
      manifestPaths: { json: `./${id}.json`, markdown: `./${id}.md` },
      status: knowledge ? "covered" : "uncovered",
    };
  });

  const uniqueFailures = [...new Map(failures.map((entry) => [`${entry.code}:${entry.message}`, entry])).values()].sort((a, b) => `${a.code}:${a.message}`.localeCompare(`${b.code}:${b.message}`));
  const uncoveredOwners = components.filter(({ status }) => status !== "covered").length;
  const unclassifiedSurfaces = surfaces.filter(({ status }) => status === "unclassified").length;
  const invalidExclusions = exclusionReports.filter(({ status }) => status !== "covered").length;
  const unresolvedSelections = selectionDestinations.filter(({ status }) => status !== "covered").length;

  return {
    schema: "flowstack.agent-coverage.v1",
    package: packageJson.name,
    packageVersion: packageJson.version,
    layer: "brick",
    generatedFrom: {
      exports: "package.json",
      publicSymbols: "src/index.ts",
      documentedOwners: "scripts/component-test-manifest.mjs",
      catalog: "agents/catalog.json",
      manifest: "dist/agents/manifest.json",
    },
    summary: {
      publicSurfaces: surfaces.length,
      classifiedPublicSurfaces: surfaces.length - unclassifiedSurfaces,
      componentOwners: components.length,
      guidedComponentOwners: components.length - uncoveredOwners,
      packageGuides: guides.length,
      unclassified: unclassifiedSurfaces,
      invalidExclusions,
      unresolvedSelections,
    },
    components: components.sort(sortBy("id")),
    surfaces: surfaces.sort(sortBy("surface")),
    guides: guides.sort(sortBy("id")),
    exclusions: exclusionReports.sort(sortBy("pattern")),
    selectionDestinations: selectionDestinations.sort((a, b) => `${a.guideId}:${a.selection}`.localeCompare(`${b.guideId}:${b.selection}`)),
    nativeApplicationDestinations: (catalog.nativeApplicationDestinations ?? []).map((item) => ({ ...item, status: "covered" })),
    failures: uniqueFailures,
  };
}

export async function writeAgentCoverage() {
  const report = await createAgentCoverage();
  await writeFile(coveragePath, `${JSON.stringify(report, null, 2)}\n`);
  return report;
}

export function assertCompleteAgentCoverage(report) {
  if (report.failures.length === 0) return;
  throw new Error(`Agent catalog coverage failed:\n- ${report.failures.map(({ code, message }) => `[${code}] ${message}`).join("\n- ")}`);
}

if (process.argv[1] && pathToFileURL(resolve(process.argv[1])).href === import.meta.url) {
  const check = process.argv.includes("--check");
  const report = check ? await createAgentCoverage() : await writeAgentCoverage();
  assertCompleteAgentCoverage(report);
  console.log(`${check ? "Verified" : "Built"} ${report.summary.guidedComponentOwners}/${report.summary.componentOwners} Brick component owners and ${report.summary.classifiedPublicSurfaces}/${report.summary.publicSurfaces} public surfaces.`);
}
