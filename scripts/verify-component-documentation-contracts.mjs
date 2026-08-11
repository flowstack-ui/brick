import { readFile } from "node:fs/promises";
import { componentDocumentationContracts } from "./component-documentation-contracts.mjs";

const requested =
  process.argv.length > 2
    ? process.argv.slice(2)
    : Object.keys(componentDocumentationContracts);
const unknown = requested.filter(
  (componentId) => !(componentId in componentDocumentationContracts),
);

if (unknown.length > 0) {
  console.error(`No semantic documentation contract for: ${unknown.join(", ")}`);
  process.exit(1);
}

const failures = [];

function escaped(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function stringUnion(source, typeName) {
  const match = source.match(
    new RegExp(`export type ${escaped(typeName)}\\s*=([\\s\\S]*?);`),
  );
  return match ? [...match[1].matchAll(/"([^"]+)"/g)].map((item) => item[1]) : null;
}

function sameValues(actual, expected) {
  return (
    actual !== null &&
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  );
}

for (const componentId of requested) {
  const contract = componentDocumentationContracts[componentId];
  const [source, exportSource, css, documentation] = await Promise.all([
    readFile(contract.source, "utf8"),
    readFile(contract.exportSource, "utf8"),
    readFile(contract.css, "utf8"),
    readFile(`docs/components/${componentId}/README.md`, "utf8"),
  ]);

  for (const publicExport of contract.exports) {
    if (!new RegExp(`\\b${escaped(publicExport)}\\b`).test(exportSource)) {
      failures.push(`${componentId}: source no longer exports ${publicExport}`);
    }
    if (!new RegExp(`\\b${escaped(publicExport)}\\b`).test(documentation)) {
      failures.push(`${componentId}: README does not document ${publicExport}`);
    }
  }

  for (const [typeName, values] of Object.entries(contract.unions ?? {})) {
    const actual = stringUnion(source, typeName);
    if (!sameValues(actual, values)) {
      failures.push(
        `${componentId}: ${typeName} source values differ from its semantic contract`,
      );
    }
    for (const value of values) {
      if (!documentation.includes(`\`${value}\``)) {
        failures.push(`${componentId}: README omits ${typeName} value ${value}`);
      }
    }
  }

  for (const [typeName, target] of Object.entries(contract.aliases ?? {})) {
    const alias = new RegExp(
      `export type ${escaped(typeName)}\\s*=\\s*${escaped(target)}\\s*;`,
    );
    if (!alias.test(source)) {
      failures.push(`${componentId}: ${typeName} no longer aliases ${target}`);
    }
  }

  for (const [prop, values] of Object.entries(contract.documentedValues ?? {})) {
    for (const value of values) {
      if (!documentation.includes(`\`${value}\``)) {
        failures.push(`${componentId}: README omits ${prop} value ${value}`);
      }
    }
  }

  for (const [prop, value] of Object.entries(contract.defaults)) {
    const sourceDefault = `${prop} = ${JSON.stringify(value)}`;
    if (!source.includes(sourceDefault)) {
      failures.push(`${componentId}: source default changed for ${prop}`);
    }
    const documentedDefault = `| \`${prop}\``;
    const row = documentation
      .split("\n")
      .find((line) => line.startsWith(documentedDefault));
    const valueText = String(value);
    const hasDefault =
      row?.includes(`\`${valueText}\``) ||
      row?.includes(`\`"${valueText}"\``) ||
      row?.includes(`defaults to \`"${valueText}"\``) ||
      row?.includes(`defaults to \`${valueText}\``);
    if (!hasDefault) {
      failures.push(`${componentId}: README default is missing or stale for ${prop}`);
    }
  }

  for (const attribute of contract.dataAttributes) {
    if (
      !source.includes(`${attribute}=`) &&
      !source.includes(`"${attribute}":`) &&
      !source.includes(`responsiveDataAttributes("${attribute}"`)
    ) {
      failures.push(`${componentId}: source no longer emits ${attribute}`);
    }
    if (!documentation.includes(`\`${attribute}\``)) {
      failures.push(`${componentId}: README omits ${attribute}`);
    }
  }

  for (const token of contract.publicTokens) {
    if (!css.includes(`${token}:`) && !css.includes(`var(${token},`)) {
      failures.push(`${componentId}: CSS neither defines nor consumes public token ${token}`);
    }
    if (!documentation.includes(token)) {
      failures.push(`${componentId}: README omits public token ${token}`);
    }
  }

  for (const privateToken of contract.privateTokenPrefixes ?? []) {
    if (documentation.includes(privateToken)) {
      failures.push(`${componentId}: README exposes private token ${privateToken}`);
    }
  }

  for (const claim of contract.sourceClaims ?? []) {
    if (!source.includes(claim)) {
      failures.push(`${componentId}: source claim changed: ${claim}`);
    }
  }

  for (const claim of contract.documentationClaims ?? []) {
    if (!documentation.includes(claim)) {
      failures.push(`${componentId}: README claim is missing: ${claim}`);
    }
  }

  for (const dependency of contract.dependencyClaims ?? []) {
    const dependencySource = await readFile(dependency.path, "utf8");
    for (const claim of dependency.claims) {
      if (!dependencySource.includes(claim)) {
        failures.push(
          `${componentId}: dependency claim changed in ${dependency.path}: ${claim}`,
        );
      }
    }
  }
}

if (failures.length > 0) {
  console.error("Semantic component documentation verification failed:\n");
  console.error(failures.map((failure) => `- ${failure}`).join("\n"));
  process.exit(1);
}

console.log(
  `Verified source-backed exports, recipes, defaults, attributes, and tokens for ${requested.length} component${requested.length === 1 ? "" : "s"}.`,
);
