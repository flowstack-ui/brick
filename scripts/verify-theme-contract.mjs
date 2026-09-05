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
if (contract.contractVersion !== 5) throw new Error("Selection pair and component policy recipes require theme contract revision 5");
if (!contract.componentThemeInputs.length) throw new Error("No component theme inputs were published");
if (contract.tokens.some((token) => !token.classification)) {
  throw new Error("Every contract token must have a classification");
}
if (contract.contrast?.algorithm !== "wcag2-relative-luminance" || contract.contrast?.colorSpace !== "srgb") {
  throw new Error("The Brick contrast contract must use the version-one sRGB WCAG 2 algorithm");
}
if (!contract.contrast.pairs.length) throw new Error("No semantic contrast pairs were published");
for (const pair of contract.contrast.pairs) {
  const foreground = contract.tokens.find(({ name }) => name === pair.foreground);
  const background = contract.tokens.find(({ name }) => name === pair.background);
  if (foreground?.classification !== "required" || foreground.type !== "color") {
    throw new Error(`${pair.id} foreground is not a required color token`);
  }
  if (background?.classification !== "required" || background.type !== "color") {
    throw new Error(`${pair.id} background is not a required color token`);
  }
}

for (const [componentId, component] of Object.entries(componentDocumentationContracts)) {
  const themeInputs = component.themeInputs ?? {};
  const css = inspection.cssSources.get(component.css) ?? "";
  const recipeOutputNames = new Set(Object.values(themeInputs).flatMap((input) =>
    Object.values(input.valueAssignments ?? {}).flatMap((assignments) =>
      assignments.map(({ name }) => name))));
  for (const name of component.publicTokens ?? []) {
    if (!Object.hasOwn(themeInputs, name)) {
      if (!inspection.declaredBy.has(name) && !recipeOutputNames.has(name)) {
        throw new Error(`${componentId} public instance token is not declared: ${name}`);
      }
      continue;
    }

    const { allowedValues, fallback } = themeInputs[name];
    if (inspection.declaredBy.has(name)) {
      throw new Error(`${componentId} theme input must inherit rather than declare ${name}`);
    }
    const categorical = Array.isArray(allowedValues);
    if (categorical && (allowedValues.length === 0 || !allowedValues.includes(fallback))) {
      throw new Error(`${componentId} categorical theme input must include its fallback in allowedValues`);
    }
    const assignments = themeInputs[name].valueAssignments;
    if (assignments) {
      for (const { name: outputName, value } of assignments[fallback]) {
        const escapedOutput = outputName.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
        const escapedValue = String(value).replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
        const pattern = new RegExp(`var\\(\\s*${escapedOutput}\\s*,\\s*${escapedValue}\\s*\\)`, "u");
        if (!pattern.test(css)) {
          throw new Error(`${componentId} does not consume recipe output ${outputName} with fallback ${value}`);
        }
      }
      continue;
    }
    if (!categorical && !inspection.semanticNames.has(fallback) && !inspection.declaredBy.has(fallback)) {
      throw new Error(`${componentId} theme input has undefined fallback ${fallback}`);
    }
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const escapedFallback = fallback.replace(/[.*+?^${}()|[\]\\]/gu, "\\$&");
    const fallbackValue = categorical
      ? escapedFallback
      : `var\\(\\s*${escapedFallback}\\s*\\)`;
    const fallbackPattern = new RegExp(`var\\(\\s*${escapedName}\\s*,\\s*${fallbackValue}\\s*\\)`, "u");
    if (!fallbackPattern.test(css)) {
      throw new Error(`${componentId} does not consume ${name} with fallback ${fallback}`);
    }
  }
}
console.log(`Verified ${contract.tokens.length} classified tokens and ${inspection.referencedBy.size} source references.`);
