import { readFile, readdir } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { componentDocumentationContracts } from "./component-documentation-contracts.mjs";
import {
  cssName,
  declarationEntries,
  readTokenSource,
  resolveToken,
  serializeValue,
} from "./token-compiler.mjs";

export const themeContractSchema = "flowstack.brick-theme-contract.v1";

async function filesBelow(root, extensions) {
  const found = [];
  async function visit(directory) {
    for (const entry of await readdir(directory, { withFileTypes: true })) {
      const path = resolve(directory, entry.name);
      if (entry.isDirectory()) await visit(path);
      else if (extensions.some((extension) => entry.name.endsWith(extension))) found.push(path);
    }
  }
  await visit(root);
  return found.sort();
}

function sourcePath(packageRoot, path) {
  return relative(packageRoot, path).replaceAll("\\", "/");
}

function tokenDescription(path, type) {
  return `Brick semantic ${type} value for ${path.replaceAll("-", " ").replaceAll(".", " / ")}.`;
}

function parseLayerOrder(source) {
  const match = source.match(/@layer\s+([^;]+);/u);
  if (!match) throw new Error("src/styles/layers.css must declare the cascade order");
  return match[1].split(",").map((layer) => layer.trim());
}

function tokenNames(source, pattern) {
  return [...source.matchAll(pattern)].map((match) => match[1]);
}

function createContrastContract(source, records) {
  if (source?.$schema !== "flowstack.brick-contrast-pairs.v1") {
    throw new Error("src/styles/contrast-pairs.json has an unsupported schema");
  }
  if (source.algorithm !== "wcag2-relative-luminance" || source.colorSpace !== "srgb") {
    throw new Error("src/styles/contrast-pairs.json must use the version-one sRGB WCAG 2 algorithm");
  }
  if (!Array.isArray(source.groups) || source.groups.length === 0) {
    throw new Error("src/styles/contrast-pairs.json must declare contrast groups");
  }

  const pairs = [];
  const ids = new Set();
  for (const [index, group] of source.groups.entries()) {
    if (
      !group || typeof group !== "object" ||
      typeof group.id !== "string" || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/u.test(group.id) ||
      (group.kind !== "text" && group.kind !== "non-text") ||
      typeof group.foreground !== "string" ||
      !Array.isArray(group.backgrounds) || group.backgrounds.length === 0 ||
      typeof group.minimumRatio !== "number" ||
      !Number.isFinite(group.minimumRatio) || group.minimumRatio < 1 || group.minimumRatio > 21
    ) {
      throw new Error(`Invalid contrast group at index ${index}`);
    }
    if (group.kind === "text" && group.minimumRatio < 4.5) {
      throw new Error(`${group.id} normal text must require at least 4.5:1`);
    }
    if (group.kind === "non-text" && group.minimumRatio < 3) {
      throw new Error(`${group.id} non-text contrast must require at least 3:1`);
    }

    const foreground = records.get(group.foreground);
    if (foreground?.classification !== "required" || foreground.type !== "color") {
      throw new Error(`${group.id} has an unknown required color foreground ${group.foreground}`);
    }
    for (const backgroundName of group.backgrounds) {
      const background = records.get(backgroundName);
      if (background?.classification !== "required" || background.type !== "color") {
        throw new Error(`${group.id} has an unknown required color background ${backgroundName}`);
      }
      const suffix = backgroundName.replace(/^--brick-color-/u, "");
      const id = `${group.id}/${suffix}`;
      if (ids.has(id)) throw new Error(`Duplicate contrast pair ${id}`);
      ids.add(id);
      pairs.push({
        id,
        kind: group.kind,
        foreground: group.foreground,
        background: backgroundName,
        minimumRatio: group.minimumRatio,
      });
    }
  }

  return {
    algorithm: source.algorithm,
    colorSpace: source.colorSpace,
    pairs: pairs.sort((left, right) => left.id.localeCompare(right.id)),
  };
}

export async function inspectThemeSources(packageRoot) {
  const tokenSourcePath = resolve(packageRoot, "src/styles/tokens.tokens.json");
  const tokens = await readTokenSource(tokenSourcePath);
  const lightEntries = declarationEntries("light", tokens);
  const darkEntries = new Map(declarationEntries("dark", tokens));
  const semanticNames = new Set(lightEntries.map(([name]) => name));
  const cssFiles = await filesBelow(resolve(packageRoot, "src"), [".css"]);
  const codeFiles = await filesBelow(resolve(packageRoot, "src"), [".ts", ".tsx"]);
  const cssSources = new Map();
  const declaredBy = new Map();
  const referencedBy = new Map();
  const references = [];
  const fallbackReferences = new Set();

  for (const file of cssFiles) {
    const source = await readFile(file, "utf8");
    const path = sourcePath(packageRoot, file);
    cssSources.set(path, source);
    for (const name of tokenNames(source, /(--_?brick-[\w-]+)\s*:/gu)) {
      const sources = declaredBy.get(name) ?? new Set();
      sources.add(path);
      declaredBy.set(name, sources);
    }
    for (const match of source.matchAll(/var\(\s*(--_?brick-[\w-]+)\s*([,)])/gu)) {
      const [, name, delimiter] = match;
      const sources = referencedBy.get(name) ?? new Set();
      sources.add(path);
      referencedBy.set(name, sources);
      const hasFallback = delimiter === ",";
      references.push({ name, path, hasFallback });
      if (hasFallback) fallbackReferences.add(name);
    }
  }

  const runtimeBy = new Map();
  for (const file of codeFiles) {
    const source = await readFile(file, "utf8");
    const path = sourcePath(packageRoot, file);
    for (const name of tokenNames(source, /["'](--_?brick-[\w-]+)["']\s*:/gu)) {
      const sources = runtimeBy.get(name) ?? new Set();
      sources.add(path);
      runtimeBy.set(name, sources);
    }
  }

  return {
    cssSources,
    declaredBy,
    fallbackReferences,
    lightEntries,
    darkEntries,
    referencedBy,
    references,
    runtimeBy,
    semanticNames,
    tokens,
    tokenSourcePath,
  };
}

export async function createThemeContract(packageRoot) {
  const packageJson = JSON.parse(await readFile(resolve(packageRoot, "package.json"), "utf8"));
  const contrastSource = JSON.parse(await readFile(resolve(packageRoot, "src/styles/contrast-pairs.json"), "utf8"));
  const inspection = await inspectThemeSources(packageRoot);
  const layerSource = await readFile(resolve(packageRoot, "src/styles/layers.css"), "utf8");
  const layerOrder = parseLayerOrder(layerSource);
  const themeLayer = "flowstack.theme";
  if (!layerOrder.includes(themeLayer)) throw new Error(`${themeLayer} is missing from the cascade order`);

  const publicComponentTokens = new Map();
  const componentInputs = new Map();
  const components = Object.entries(componentDocumentationContracts)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([id, component]) => {
      for (const name of component.publicTokens ?? []) publicComponentTokens.set(name, id);
      for (const [name, input] of Object.entries(component.themeInputs ?? {})) {
        componentInputs.set(name, { ...input, component: id });
      }
      return {
        id,
        source: component.source,
        css: component.css,
        recipes: component.unions ?? {},
        defaults: component.defaults ?? {},
        states: component.dataAttributes ?? [],
      };
    });

  const records = new Map();
  for (const [name, lightDefault] of inspection.lightEntries) {
    const lightPath = [...inspection.tokens.keys()].find((path) =>
      path.startsWith("semantic.light.") && cssName(path, "light") === name);
    const darkPath = lightPath.replace("semantic.light.", "semantic.dark.");
    const sourceToken = inspection.tokens.get(lightPath);
    const appearanceDependent = name.startsWith("--brick-color-") || name.startsWith("--brick-shadow-");
    const darkDefault = inspection.darkEntries.get(name);
    if (darkDefault === undefined) throw new Error(`Missing dark semantic token for ${name}`);
    if (!appearanceDependent && lightDefault !== darkDefault) {
      throw new Error(`${name} differs by appearance but the CSS compiler emits it as invariant`);
    }
    records.set(name, {
      name,
      classification: appearanceDependent ? "required" : "derived",
      type: sourceToken.type,
      description: sourceToken.description ?? tokenDescription(lightPath.slice("semantic.light.".length), sourceToken.type),
      appearance: appearanceDependent ? "light-and-dark" : "invariant",
      defaults: {
        light: lightDefault,
        dark: darkDefault,
      },
      sources: ["src/styles/tokens.tokens.json"],
      tokenPaths: { light: lightPath, dark: darkPath },
    });
  }

  const allNames = new Set([
    ...inspection.declaredBy.keys(),
    ...inspection.referencedBy.keys(),
    ...inspection.runtimeBy.keys(),
    ...publicComponentTokens.keys(),
  ]);
  for (const name of [...allNames].sort()) {
    if (records.has(name)) continue;
    const input = componentInputs.get(name);
    const owner = publicComponentTokens.get(name);
    const sources = new Set([
      ...(inspection.declaredBy.get(name) ?? []),
      ...(inspection.referencedBy.get(name) ?? []),
      ...(inspection.runtimeBy.get(name) ?? []),
    ]);
    records.set(name, {
      name,
      classification: input ? "component-input" : owner ? "optional-extension" : "internal",
      scope: input ? "inherited-theme" : owner ? "component-instance" : "implementation",
      owner: input?.component ?? owner ?? null,
      type: input?.type ?? null,
      fallback: input?.fallback ?? null,
      supportedRange: input?.supportedRange ?? null,
      sources: [...sources].sort(),
      runtimeAssigned: inspection.runtimeBy.has(name),
    });
  }

  const semanticTokens = [...records.values()].filter((token) =>
    token.classification === "required" || token.classification === "derived");
  const families = new Map();
  for (const token of semanticTokens.filter((entry) => entry.name.startsWith("--brick-color-"))) {
    const family = token.name.slice("--brick-color-".length).split("-", 1)[0];
    const names = families.get(family) ?? [];
    names.push(token.name);
    families.set(family, names);
  }

  return {
    $schema: themeContractSchema,
    contractVersion: 2,
    package: { name: packageJson.name, version: packageJson.version },
    sources: {
      tokens: "src/styles/tokens.tokens.json",
      components: "scripts/component-documentation-contracts.mjs",
      contrast: "src/styles/contrast-pairs.json",
      cascade: "src/styles/layers.css",
    },
    css: {
      variablePrefix: "--brick-",
      layerOrder,
      themeLayer,
      themeLayerPosition: {
        after: layerOrder[layerOrder.indexOf(themeLayer) - 1],
        before: layerOrder[layerOrder.indexOf(themeLayer) + 1],
      },
      themeAttribute: "data-flowstack-theme",
      appearanceAttribute: "data-brick-appearance",
      appearanceValues: ["light", "dark"],
      selectorStrategy: "theme root plus nearest explicit appearance boundary",
    },
    atomicColorFamilies: [...families].sort(([left], [right]) => left.localeCompare(right)).map(([id, tokenNames]) => ({
      id,
      tokens: tokenNames.sort(),
    })),
    contrast: createContrastContract(contrastSource, records),
    componentThemeInputs: [...componentInputs].sort(([left], [right]) => left.localeCompare(right)).map(([name, input]) => ({
      name,
      ...input,
    })),
    components,
    tokens: [...records.values()].sort((left, right) => left.name.localeCompare(right.name)),
    deprecations: [],
  };
}

export function serializeThemeContract(contract) {
  return `${JSON.stringify(contract, null, 2)}\n`;
}

export function resolvedSemanticValue(path, tokens) {
  return serializeValue(resolveToken(path, tokens));
}
