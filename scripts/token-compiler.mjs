import { readFile } from "node:fs/promises";

const aliasPattern = /^\{([^}]+)\}$/;

function collectTokens(node, path = [], inheritedType, tokens = new Map()) {
  if (!node || typeof node !== "object" || Array.isArray(node)) {
    throw new TypeError(`Invalid token group at ${path.join(".") || "root"}`);
  }

  const type = node.$type ?? inheritedType;
  if (Object.hasOwn(node, "$value")) {
    if (!type) throw new Error(`Token ${path.join(".")} has no $type`);
    tokens.set(path.join("."), {
      description: node.$description,
      type,
      value: node.$value,
    });
    return tokens;
  }

  for (const [key, value] of Object.entries(node)) {
    if (key.startsWith("$")) continue;
    collectTokens(value, [...path, key], type, tokens);
  }
  return tokens;
}

function resolveToken(path, tokens, resolving = new Set()) {
  const token = tokens.get(path);
  if (!token) throw new Error(`Unknown token alias: ${path}`);
  if (resolving.has(path)) {
    throw new Error(`Circular token alias: ${[...resolving, path].join(" -> ")}`);
  }

  if (typeof token.value !== "string") return token;
  const match = token.value.match(aliasPattern);
  if (!match) return token;

  resolving.add(path);
  const resolved = resolveToken(match[1], tokens, resolving);
  resolving.delete(path);
  if (resolved.type !== token.type) {
    throw new Error(
      `Token ${path} (${token.type}) aliases ${match[1]} (${resolved.type})`,
    );
  }
  return { ...token, value: resolved.value };
}

function serializeColor(value) {
  if (typeof value === "string") return value;
  if (value && typeof value.hex === "string") return value.hex;
  throw new TypeError("Color tokens require a DTCG color object with a hex fallback");
}

function serializeDimension(value) {
  if (!value || typeof value.value !== "number" || typeof value.unit !== "string") {
    throw new TypeError("Dimension tokens require numeric value and unit fields");
  }
  return `${value.value}${value.unit}`;
}

function serializeShadow(value) {
  const shadows = Array.isArray(value) ? value : [value];
  return shadows
    .map((shadow) =>
      [
        serializeDimension(shadow.offsetX),
        serializeDimension(shadow.offsetY),
        serializeDimension(shadow.blur),
        serializeDimension(shadow.spread),
        serializeColor(shadow.color),
      ].join(" "),
    )
    .join(", ");
}

function serializeValue(token) {
  switch (token.type) {
    case "color":
      return serializeColor(token.value);
    case "dimension":
      return serializeDimension(token.value);
    case "duration":
      return serializeDimension(token.value);
    case "cubicBezier":
      if (!Array.isArray(token.value) || token.value.length !== 4) {
        throw new TypeError("cubicBezier tokens require four numeric control points");
      }
      return `cubic-bezier(${token.value.join(", ")})`;
    case "fontFamily":
      return Array.isArray(token.value) ? token.value.join(", ") : token.value;
    case "fontWeight":
    case "number":
      return String(token.value);
    case "shadow":
      return serializeShadow(token.value);
    default:
      throw new Error(`Unsupported DTCG token type: ${token.type}`);
  }
}

function cssName(path, appearance) {
  const prefix = `semantic.${appearance}.`;
  if (!path.startsWith(prefix)) {
    throw new Error(`Expected semantic ${appearance} token, received ${path}`);
  }
  return `--brick-${path.slice(prefix.length).replaceAll(".", "-")}`;
}

function declarationEntries(appearance, tokens) {
  return [...tokens.keys()]
    .filter((path) => path.startsWith(`semantic.${appearance}.`))
    .sort()
    .map((path) => {
      const token = resolveToken(path, tokens);
      return [cssName(path, appearance), serializeValue(token)];
    });
}

function declarations(entries) {
  return entries.map(([name, value]) => `    ${name}: ${value};`).join("\n");
}

export async function compileTokens(sourceFile) {
  const source = JSON.parse(await readFile(sourceFile, "utf8"));
  const tokens = collectTokens(source);
  const lightEntries = declarationEntries("light", tokens);
  const lightValues = new Map(lightEntries);
  const darkEntries = declarationEntries("dark", tokens).filter(
    ([name, value]) => lightValues.get(name) !== value,
  );
  const light = declarations(lightEntries);
  const dark = declarations(darkEntries);

  if (!light || !dark) {
    throw new Error("Token source must define semantic.light and semantic.dark");
  }

  return `@layer brick.tokens {
  :root {
    color-scheme: light dark;
${light}
  }

  @media (prefers-color-scheme: dark) {
    :root:not([data-brick-appearance]) {
${dark}
    }
  }

  [data-brick-appearance="light"] {
    color-scheme: light;
${light}
  }

  [data-brick-appearance="dark"] {
    color-scheme: dark;
${dark}
  }
}
`;
}
