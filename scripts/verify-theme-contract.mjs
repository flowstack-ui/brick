import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createThemeContract, inspectThemeSources, themeContractSchema } from "./theme-contract.mjs";
import { componentDocumentationContracts } from "./component-documentation-contracts.mjs";

const packageRoot = resolve(fileURLToPath(new URL("..", import.meta.url)));
const inspection = await inspectThemeSources(packageRoot);
const defined = new Set([
  ...inspection.semanticNames,
  ...inspection.declaredBy.keys(),
  ...inspection.runtimeBy.keys(),
]);
const unresolved = inspection.references.filter(({ name, hasFallback }) =>
  !defined.has(name) && !hasFallback);
if (unresolved.length) {
  const details = unresolved.map(({ name, path }) => `${name} (${path})`);
  throw new Error(`Undefined Brick token references:\n${details.join("\n")}`);
}

const contract = await createThemeContract(packageRoot);
if (contract.$schema !== themeContractSchema) throw new Error("Unexpected theme contract schema");
if (!contract.componentThemeInputs.length) throw new Error("No component theme inputs were published");
if (contract.tokens.some((token) => !token.classification)) {
  throw new Error("Every contract token must have a classification");
}

for (const [componentId, component] of Object.entries(componentDocumentationContracts)) {
  const themeInputs = component.themeInputs ?? {};
  const css = inspection.cssSources.get(component.css) ?? "";
  for (const name of component.publicTokens ?? []) {
    if (!Object.hasOwn(themeInputs, name)) {
      if (!inspection.declaredBy.has(name)) {
        throw new Error(`${componentId} public instance token is not declared: ${name}`);
      }
      continue;
    }

    const { fallback } = themeInputs[name];
    if (inspection.declaredBy.has(name)) {
      throw new Error(`${componentId} theme input must inherit rather than declare ${name}`);
    }
    if (!inspection.semanticNames.has(fallback) && !inspection.declaredBy.has(fallback)) {
      throw new Error(`${componentId} theme input has undefined fallback ${fallback}`);
    }
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const escapedFallback = fallback.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const fallbackPattern = new RegExp(
      `var\\(\\s*${escapedName}\\s*,\\s*var\\(\\s*${escapedFallback}\\s*\\)\\s*\\)`,
      "u",
    );
    if (!fallbackPattern.test(css)) {
      throw new Error(`${componentId} does not consume ${name} with fallback ${fallback}`);
    }
  }
}
console.log(`Verified ${contract.tokens.length} classified tokens and ${inspection.referencedBy.size} source references.`);
