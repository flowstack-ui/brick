/** Read typography declarations regardless of CSS formatting, retaining offsets. */
export function typographyDeclarations(source) {
  // Preserve offsets/newlines so diagnostics still point at authored CSS.
  const uncommented = source.replace(/\/\*[\s\S]*?\*\//gu, (comment) =>
    comment.replace(/[^\r\n]/gu, " "),
  );
  return uncommented.matchAll(
    /(?<=^|[;{])\s*(?<property>[-\w]*(?:font-family|font-size|font-weight|line-height|letter-spacing))\s*:\s*(?<value>[^;{}]+)(?:;|(?=[}]))/gmu,
  );
}

/** Accept local aliases only when every authored assignment reaches a recipe. */
export function semanticTypographyAlias(value, source, visiting = new Set()) {
  const match = /^var\((--[\w-]+)\)$/u.exec(value.trim());
  if (!match) return false;
  const name = match[1];
  if (name.startsWith("--brick-typography-")) return true;
  if (visiting.has(name)) return false;
  const next = new Set([...visiting, name]);
  const uncommented = source.replace(/\/\*[\s\S]*?\*\//gu, "");
  const values = [...uncommented.matchAll(new RegExp(`(?<=^|[;{])\\s*${name}\\s*:\\s*([^;{}]+)(?:;|(?=[}]))`, "gmu"))];
  return values.length > 0 && values.every((assignment) =>
    semanticTypographyAlias(assignment[1], uncommented, next),
  );
}
